import { createApp } from './app';
import { config } from './config';
import { connectDatabase, disconnectDatabase } from './config/database';

async function main() {
  try {
    try {
      await connectDatabase();
    } catch (dbError) {
      console.warn('[Database] Warning: Initial database connection failed. The server is still running. Inquiries will fail until a valid PostgreSQL DATABASE_URL is reachable.');
    }

    const app = createApp();

    const server = app.listen(config.port, () => {
      console.log(`[Server] Running on port ${config.port} in ${config.nodeEnv} mode`);
      console.log(`[Server] Health check: http://localhost:${config.port}/api/health`);
    });

    const shutdown = async () => {
      console.log('\n[Server] Shutting down gracefully...');
      server.close(async () => {
        await disconnectDatabase();
        process.exit(0);
      });

      setTimeout(() => {
        console.error('[Server] Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    console.error('[Server] Failed to start:', error);
    process.exit(1);
  }
}

main();
