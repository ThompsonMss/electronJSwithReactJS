const { Client } = require("pg");
const { Notification } = require("electron");

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
      const notification = {
        title: "Consulta finalizada.",
        body: "Electron é foda demais pô!",
      };

      new Notification(notification).show();

      callbackSuccess(res.rows);
    }

    client.end();
  });
}

module.exports = BD;
