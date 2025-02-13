import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string().transform(Number),
  DATABASE_URL: z.string().url(),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']),
});

const env = envSchema.parse(process.env);

export default env; 