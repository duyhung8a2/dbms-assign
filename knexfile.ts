import type { Knex } from 'knex';

import 'dotenv/config';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'oracledb',
    connection: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT as string, 10),
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE
    },
    pool: { min: 0, max: 7 }
  },

  staging: {
    client: 'oracledb',
    connection: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT as string, 10),
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE
    },
    pool: { min: 0, max: 7 },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'oracledb',
    connection: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT as string, 10),
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE
    },
    pool: { min: 0, max: 7 },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};

module.exports = config;
