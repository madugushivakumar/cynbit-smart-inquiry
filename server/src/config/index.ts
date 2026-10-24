import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  databaseUrl: process.env.DATABASE_URL || '',
  isDev: (process.env.NODE_ENV || 'development') === 'development',
};

if (!config.databaseUrl) {
  console.warn('[Config] DATABASE_URL is not set. Database operations will fail.');
}
