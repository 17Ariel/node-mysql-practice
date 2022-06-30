const mysql = require("mysql");

const dbconn = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});

dbconn.connect((err) => {
  if (err) throw err;
  return console.log("successfully connected!");
});

module.exports = dbconn;
