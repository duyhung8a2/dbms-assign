import { Knex } from 'knex';
import { envConfig } from '../config/env.config';

export const knexConfig: Knex.Config = {
  client: 'oracledb',
  connection: {
    host: envConfig.DATABASE_HOST,
    port: envConfig.DATABASE_PORT,
    user: envConfig.DATABASE_USER,
    password: envConfig.DATABASE_PASSWORD,
    database: envConfig.DATABASE_DATABASE
  },
  pool: { min: 0, max: 7 }
};
