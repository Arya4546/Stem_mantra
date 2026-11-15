import type { Readable } from 'stream';
import {
  DeleteObjectsCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
  S3ServiceException,
} from '@aws-sdk/client-s3';
import { NodeHttpHandler } from '@smithy/node-http-handler';
import { env } from '../../config/env';
import { logger } from '../../config/logger';

const s3 = new S3Client({
  endpoint: env.BACKBLAZE_ENDPOINT.trim(),
  region: env.BACKBLAZE_REGION.trim(),
  credentials: {
    accessKeyId: env.BACKBLAZE_KEY_ID.trim(),
    secretAccessKey: env.BACKBLAZE_APP_KEY.trim(),
  },
  forcePathStyle: true,
  maxAttempts: 3,
  requestHandler: new NodeHttpHandler({ connectionTimeout: 5000, requestTimeout: 30000 }),
});

const PREFIX = `${env.B2_PREFIX}/`;
/** Only keys we generate: <prefix>/<purpose>/<yyyy>/<mm>/<uuid>[-thumb].webp */
const KEY_PATTERN = /^[a-z0-9-]+\/[a-z0-9-]+\/\d{4}\/\d{2}\/[a-f0-9-]{36}(-thumb)?\.webp$/;

/**
 * The bucket is shared with the LMS (private course content). Every read/write/delete is restricted
 * to the website prefix so the public /media route can never be used to reach other objects.
 */
export function isWebsiteKey(key: string): boolean {
  return key.startsWith(PREFIX) && KEY_PATTERN.test(key) && !key.includes('..');
}

function assertWebsiteKey(key: string): void {
  if (!isWebsiteKey(key)) throw new Error(`Refusing to touch object outside ${PREFIX}: ${key}`);
}

export function mediaUrlForKey(key: string): string {
  return `/media/${key}`;
}

export const b2 = {
  async put(key: string, body: Buffer, contentType: string): Promise<void> {
    assertWebsiteKey(key);
    await s3.send(
      new PutObjectCommand({
        Bucket: env.BACKBLAZE_BUCKET_NAME,
        Key: key,
        Body: body,
        ContentType: contentType,
        CacheControl: 'public, max-age=31536000, immutable',
      }),
    );
  },

  /** Returns null when the object does not exist; `notModified` when the client's ETag still matches. */
  async get(
    key: string,
    ifNoneMatch?: string,
  ): Promise<
    | null
    | { notModified: true }
    | { notModified: false; body: Readable; contentType?: string; contentLength?: number; etag?: string; lastModified?: Date }
  > {
    assertWebsiteKey(key);
    try {
      const out = await s3.send(
        new GetObjectCommand({ Bucket: env.BACKBLAZE_BUCKET_NAME, Key: key, IfNoneMatch: ifNoneMatch }),
      );
      return {
        notModified: false,
        body: out.Body as Readable,
        contentType: out.ContentType,
        contentLength: out.ContentLength,
        etag: out.ETag,
        lastModified: out.LastModified,
      };
    } catch (err) {
      const status = (err as S3ServiceException)?.$metadata?.httpStatusCode;
      if (status === 304) return { notModified: true };
      if (status === 404 || (err as Error)?.name === 'NoSuchKey') return null;
      throw err;
    }
  },

  /** Best-effort bulk delete; failures are logged, never thrown (DB is the source of truth). */
  async removeMany(keys: Array<string | null | undefined>): Promise<void> {
    const valid = keys.filter((k): k is string => typeof k === 'string' && isWebsiteKey(k));
    if (valid.length === 0) return;
    try {
      for (let i = 0; i < valid.length; i += 1000) {
        const chunk = valid.slice(i, i + 1000);
        await s3.send(
          new DeleteObjectsCommand({
            Bucket: env.BACKBLAZE_BUCKET_NAME,
            Delete: { Objects: chunk.map((Key) => ({ Key })), Quiet: true },
          }),
        );
      }
      logger.info(`B2: deleted ${valid.length} object(s)`);
    } catch (err) {
      logger.error('B2: failed to delete objects', { keys: valid, error: (err as Error).message });
    }
  },
};
