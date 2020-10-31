const path = require("path");
const url = require('url');
const {app, BrowserWindow} = require("electron");

let win = null;

app.on("ready", () => {
  win = new BrowserWindow({
    width: 1000,
    height: 850
  });

  win.loadURL(
    url.format({
      // pathname: path.join(__dirname, "dist/index.html"),
      pathname: path.join(__dirname, "docs/index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  win.show();

  win.on("closed", () => {
    win = null;
  });
});

app.on('window-all-closed', ()=>app.quit());
