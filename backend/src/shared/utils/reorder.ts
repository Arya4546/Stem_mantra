import { Prisma } from '@prisma/client';
import type { Tx } from '../../database/prisma';

const TABLES = {
  galleryCategory: 'gallery_categories',
  galleryImage: 'gallery_images',
  client: 'clients',
  testimonial: 'testimonials',
} as const;

/** Sets sort_order = position for the given ids in a single UPDATE (inside the caller's transaction). */
export async function applyOrder(tx: Tx, table: keyof typeof TABLES, ids: string[]): Promise<number> {
  if (ids.length === 0) return 0;
  const positions = ids.map((_, i) => i);
  return tx.$executeRaw`
    UPDATE ${Prisma.raw(`"${TABLES[table]}"`)} AS t
    SET sort_order = v.ord, updated_at = NOW()
    FROM unnest(${ids}::text[], ${positions}::int[]) AS v(id, ord)
    WHERE t.id = v.id`;
}
