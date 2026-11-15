/**
 * OpenTelemetry → SigNoz (traces, logs, metrics).
 *
 * This file is the FIRST import of server.ts so that http, express, winston, the AWS SDK and Prisma
 * are patched before anything requires them. Do not import app code (logger, env, prisma) here.
 *
 * Telemetry is enabled when OTEL_EXPORTER_OTLP_ENDPOINT is set:
 *   • self-hosted SigNoz: OTEL_EXPORTER_OTLP_ENDPOINT=http://<signoz-otel-collector>:4318
 *   • SigNoz Cloud:       OTEL_EXPORTER_OTLP_ENDPOINT=https://ingest.<region>.signoz.cloud:443
 *                         OTEL_EXPORTER_OTLP_HEADERS=signoz-ingestion-key=<your-key>
 * What you get in SigNoz: one trace per request (page render → internal API call → every Prisma
 * query with its SQL → Backblaze calls), logs correlated to traces, and HTTP/runtime metrics.
 */
import dotenv from 'dotenv';

dotenv.config();

import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { BatchLogRecordProcessor } from '@opentelemetry/sdk-logs';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { PrismaInstrumentation } from '@prisma/instrumentation';

const NOISY_PATHS = [
  '/_next/static/',
  '/_next/webpack-hmr',
  '/__nextjs',
  '/images/',
  '/videos/',
  '/favicon',
  '/icon',
  '/api/health',
];

let sdk: NodeSDK | null = null;

export const telemetryEnabled =
  Boolean(process.env.OTEL_EXPORTER_OTLP_ENDPOINT) && process.env.OTEL_SDK_DISABLED !== 'true';

if (telemetryEnabled) {
  const environment = process.env.NODE_ENV ?? 'development';

  sdk = new NodeSDK({
    serviceName: process.env.OTEL_SERVICE_NAME || 'stemmantra-website',
    resource: resourceFromAttributes({
      'service.version': process.env.APP_VERSION || 'dev',
      'deployment.environment': environment,
      'deployment.environment.name': environment,
    }),
    traceExporter: new OTLPTraceExporter(),
    metricReaders: [
      new PeriodicExportingMetricReader({ exporter: new OTLPMetricExporter(), exportIntervalMillis: 60_000 }),
    ],
    logRecordProcessors: [new BatchLogRecordProcessor({ exporter: new OTLPLogExporter() })],
    instrumentations: [
      getNodeAutoInstrumentations({
        '@opentelemetry/instrumentation-fs': { enabled: false },
        '@opentelemetry/instrumentation-dns': { enabled: false },
        '@opentelemetry/instrumentation-net': { enabled: false },
        '@opentelemetry/instrumentation-http': {
          ignoreIncomingRequestHook: (req) => NOISY_PATHS.some((p) => (req.url ?? '').startsWith(p)),
        },
        // Ship winston logs to SigNoz and stamp them with trace_id / span_id.
        '@opentelemetry/instrumentation-winston': { disableLogSending: false, disableLogCorrelation: false },
      }),
      // Spans for every Prisma operation and the SQL it ran (prisma:engine:db_query).
      new PrismaInstrumentation(),
    ],
  });

  sdk.start();
  // eslint-disable-next-line no-console
  console.log(`[telemetry] OpenTelemetry → ${process.env.OTEL_EXPORTER_OTLP_ENDPOINT} (${environment})`);
}

/** Flushes pending spans/logs/metrics. Called from the graceful shutdown in server.ts. */
export async function shutdownTelemetry(): Promise<void> {
  if (!sdk) return;
  try {
    await sdk.shutdown();
  } catch {
    /* never block shutdown on telemetry */
  }
}
