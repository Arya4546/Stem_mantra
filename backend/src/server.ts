import createApp from './app';
import config from './config';
import { connectDatabase, disconnectDatabase } from './config/database';
import logger from './utils/logger';
import { adminSeeder } from './services/admin.seeder';
import { otpService } from './services/otp.service';

const startServer = async (): Promise<void> => {
  try {
    // Connect to database
    await connectDatabase();

    // Seed default admin if not exists
    await adminSeeder.seedAdmin();

    // Cleanup expired OTPs
    await otpService.cleanupExpiredOTPs();

    // Create Express app
    const app = createApp();

    // Start server
    const server = app.listen(config.port, () => {
      logger.info(`
+-----------------------------------------------------------+
|                                                           |
|   STEMmantra Backend Server                              |
|                                                           |
|   Environment: ${config.nodeEnv.padEnd(40)}|
|   Port: ${config.port.toString().padEnd(47)}|
|   API Version: ${config.apiVersion.padEnd(40)}|
|   API URL: http://localhost:${config.port}/api/${config.apiVersion}            |
|                                                           |
+-----------------------------------------------------------+
      `);
    });

    // Periodic cleanup of expired OTPs (every hour)
    setInterval(async () => {
      await otpService.cleanupExpiredOTPs();
    }, 60 * 60 * 1000);

    // Graceful shutdown handlers
    const gracefulShutdown = async (signal: string): Promise<void> => {
      logger.info(`\n${signal} received. Starting graceful shutdown...`);

      server.close(async () => {
        logger.info('HTTP server closed');

        // Disconnect from database
        await disconnectDatabase();

        logger.info('Graceful shutdown completed');
        process.exit(0);
      });

      // Force shutdown after 30 seconds
      setTimeout(() => {
        logger.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 30000);
    };

    // Listen for shutdown signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Handle uncaught exceptions
    process.on('uncaughtException', (error: Error) => {
      logger.error('Uncaught Exception:', error);
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason: unknown) => {
      logger.error('Unhandled Rejection:', reason);
      process.exit(1);
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();
