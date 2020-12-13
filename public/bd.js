const { Client } = require("pg");

function BD(
  user = "",
  host = "",
  database = "",
  password = "",
  port = "5432",
  query = "",
  callbackSuccess,
  callBackError
) {
  const client = new Client({
    user: user,
    host: host,
    database: database,
    password: password,
    port: port,
  });

  client.connect();

  client.query(query, (err, res) => {
    if (err) {
      callBackError();
    } else {
      callbackSuccess(res.rows);
    }

    client.end();
  });
}

module.exports = BD;
