const server = require("./api/server.js");

const PORT = process.env.NODE_ENV || 5555;

server.listen(PORT, () => {
  console.log(`\n*** Server listening on ${PORT} ***\n`);
});

// prior working URL for postgres
/*
DEV_DATABASE_URL=postgresql://postgres:natepostgres@localhost/greenhouse
*/
