// require electron
const electron = require('electron');
const url = require('url');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

// fetching two objects from main electron object
const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

// listen on event when electon app ready then trigger some more events
app.on('ready', () => {
  // get screen size
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;

  // creating new main window
mainWindow = new BrowserWindow({
      width,
      height,
      title: "Video Info Electron",
      webPreferences: {
          nodeIntegration: true
      }
  });

  mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, '/pages/index.html'),
      protocol: 'file',
      slashes: true
  }));

  //get value from web content
    ipcMain.on('video:submit', (event, path) => {
        ffmpeg.ffprobe(path, (error, metadata)=> {
            mainWindow.webContents.send('video:metadata', metadata);
        })
    });



});
