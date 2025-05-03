import { Pool } from 'pg';

const pool = new Pool({
  user: 'mohamed',
  host: 'localhost',
  database: 'talent_bridge_gaza',
  password: '123456',
  port: 5432,
});

export default pool; 