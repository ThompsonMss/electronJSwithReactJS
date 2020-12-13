const { app, BrowserWindow, ipcMain } = require("electron");
const W3CWebSocket = require("websocket").w3cwebsocket;
const path = require("path");
const isDev = require("electron-is-dev");

const DB = require("./bd");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: "#EEE",
    webPreferences: {
      nodeIntegration: true,
      devTools: isDev ? true : false,
    },
  });

  /* MAXIMIZE BROWSERWINDOW */
  win.maximize();

  /* REMOVE SUBMENU */
  if (!isDev) {
    win.removeMenu();
  }

  /* ENVIROMENT OF PRODUCTION, BLOCKING DEVELOPMENT TOOLS */
  /**
   * @author ThompsonM
   */

  if (!isDev) {
    win.webContents.on("devtools-opened", () => {
      win.webContents.closeDevTools();
    });
  }

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  ipcMain.on("execQuery", (event, arg) => {
    const { host, user, password, database, id_apt, id_cond } = arg;

    let query = `SELECT * FROM morador where id_cond = ${id_cond} AND id_apt = ${id_apt}`;

    const sucess = (rows) => {
      win.webContents.send("endQuery", rows);
    };

    const error = (rows) => {
      win.webContents.send("errorQuery", "");
    };

    DB(user, host, database, password, "5432", query, sucess, error);

    // win.webContents.send("teste1", "Fala rapaziada2");
  });

  execSocket(win.webContents);

  ipcMain("newConnection", (event, arg) => {
    execSocket(win.webContents);
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

function execSocket(emitter) {
  /* SOCKET */
  const client = new W3CWebSocket("ws://localhost:8080/", "echo-protocol");

  client.onerror = function () {
    emitter.send("errorSocket", "error");
    console.log("Connection Error");
  };

  client.onopen = function () {
    console.log("WebSocket Client Connected");

    ipcMain.on("ping", (event, arg) => {
      client.send(arg + "");
    });
  };

  client.onclose = function () {
    emitter.send("closeSocket", "close");
    console.log("echo-protocol Client Closed");
  };

  client.onmessage = function (e) {
    if (typeof e.data === "string") {
      emitter.send("messageSocket", JSON.parse(e.data));
    }
  };
}
