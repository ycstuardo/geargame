const { Client } = require("pg");

const connectionData = {
  host: "localhost",
  user: "postgres",
  database: "geargames2",
  password: "mono1039",
  port: 5432,
};

const Pool = new Client(connectionData);

module.exports = Pool;
