require("dotenv").config();
const pg = require("pg");
const pgConnection = `${process.env.DATABASE_URL}?sslmode=require`;

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false };
}
const sharedConfig = {
  client: "pg",
  migrations: { directory: "./data/migrations" },
  seeds: { directory: "./data/seeds" },
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
