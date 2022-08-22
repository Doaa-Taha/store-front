import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  TEST_DB,
  ENV,
} = process.env;
console.log(ENV);

const Client = new Pool({
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: ENV === 'dev' ? POSTGRES_DB : TEST_DB,
});

export default Client;
