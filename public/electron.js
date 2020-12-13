const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
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

  win.webContents.on("did-finish-load", () =>
    win.webContents.send("ping", "🤘")
  );

  ipcMain.on("teste", () => {
    console.log("Caracas");
    win.webContents.send("teste1", "Fala rapaziada2");
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
