const { Client } = require("pg");
require("dotenv").config();

const db = new Client({
  host: "127.0.0.1",
  user: "postgres",
  password: process.env.DB_PASSWORD,
  database: "task_manager",
});

db.connect()
  .then(() => console.log("Connected to PostgreSQl"))
  .catch((err) => console.error("Connection error", err));

module.exports = db;