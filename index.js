require("dotenv").config();
const express = require("express");
const server = require("./api/server.js");
const path = require("path");

const PORT = process.env.PORT || 5678;

server.use(express.static(path.join(__dirname, "client/dist")));

server.listen(PORT, () => {
  console.log(`\n*** Server listening on ${PORT} ***\n`);
});
