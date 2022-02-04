import { Pool } from 'pg';

const connectionString = process.env.POSTGRESS_URL_CONNECTION;

export const db = new Pool({ connectionString });
