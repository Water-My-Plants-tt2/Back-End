require('dotenv').config();
const pgConnection = `${process.env.PRODUCTION_DATABASE_URL}?sslmode=require`;

const sharedConfig = {
  client: 'pg',
  migrations: { directory: './data/migrations' },
  seeds: { directory: './data/seeds' },
};

module.exports = {
  development: {
    ...sharedConfig,
    connection: process.env.DEV_DATABASE_URL,
  },
  testing: {
    ...sharedConfig,
    connection: process.env.TESTING_DATABASE_URL,
  },
  production: {
    ...sharedConfig,
    connection: pgConnection,
    ssl: { rejectUnauthorized: false },
    pool: { min: 2, max: 10 },
  },
};
