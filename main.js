// Copyright (c) The LHTML team
// See LICENSE for details.

const {app, BrowserWindow, Menu, protocol, ipcMain} = require('electron');
const platform = require('os').platform();
const isMac = platform === 'Darwin';
const log = require('electron-log');
const {autoUpdater} = require("electron-updater");
//-------------------------------------------------------------------
// Logging
//
// THIS SECTION IS NOT REQUIRED
//
// This logging setup is not required for auto-updates to work,
// but it sure makes debugging easier :)
//-------------------------------------------------------------------
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

//-------------------------------------------------------------------
// Define the menu
//
// THIS SECTION IS NOT REQUIRED
//-------------------------------------------------------------------
let template = [];
console.log(platform);
if (process.platform === 'darwin') {
  // OS X
  const name = app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        label: 'About ' + name,
        role: 'about'
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() { app.quit(); }
      },
    ]
  })
}

if(process.platform === 'win'){
  const name = app.getName();
  template.push({
    label: name,
    submenu: [
      {
        label: 'About ' + name,
        role: 'about'
      },
      {
        label: 'Check for updates',
        click(){
          console.log(process.platform);
          debugger;
          autoUpdater.checkForUpdates()
        }
      },
      {
        label: 'Quit',
        accelerator: 'Control+W',
        click() {
          app.quit();
        }
      },
    ]
  })
}


//-------------------------------------------------------------------
// Open a window that displays the version
//
// THIS SECTION IS NOT REQUIRED
//
// This isn't required for auto-updates to work, but it's easier
// for the app to show a window than to have to click "About" to see
// that updates are working.
//-------------------------------------------------------------------
let win;

function sendStatusToWindow(text) {
  log.info(text);
  win.webContents.send('message', text);
}
function createDefaultWindow() {
  win = new BrowserWindow({
    name: "ea-todo",
    width: 1200,
    height: 800,
    skipTaskbar: true,
    toolbar: false,
    // frame: false,
  });
  win.setMenu(null);
  debugger;
  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
  win.loadURL(`file://${__dirname}/version.html#v${app.getVersion()}`);
  return win;
}
autoUpdater.on('checking-for-update', () => {
  debugger;
  sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (ev, info) => {
  debugger;
  sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (ev, info) => {
  debugger;
  sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (ev, err) => {
  debugger;
  sendStatusToWindow('Error in auto-updater.');
})
autoUpdater.on('download-progress', (ev, progressObj) => {
  debugger;
  sendStatusToWindow('Download progress...');
})
autoUpdater.on('update-downloaded', (ev, info) => {
  debugger;
  sendStatusToWindow('Update downloaded; will install in 5 seconds');
});
app.on('ready', function() {
  const win = createDefaultWindow();
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  autoUpdater.checkForUpdates();
});
app.on('window-all-closed', () => {
  debugger;
  app.quit();
});

//-------------------------------------------------------------------
// Auto updates
//
// For details about these events, see the Wiki:
// https://github.com/electron-userland/electron-builder/wiki/Auto-Update#events
//
// The app doesn't need to listen to any events except `update-downloaded`
//
// Uncomment any of the below events to listen for them.  Also,
// look in the previous section to see them being used.
//-------------------------------------------------------------------
// autoUpdater.on('checking-for-update', () => {
// })
// autoUpdater.on('update-available', (ev, info) => {
// })
// autoUpdater.on('update-not-available', (ev, info) => {
// })
// autoUpdater.on('error', (ev, err) => {
// })
// autoUpdater.on('download-progress', (ev, progressObj) => {
// })
autoUpdater.on('update-downloaded', (ev, info) => {
  debugger;
  // Wait 5 seconds, then quit and install
  // In your application, you don't need to wait 5 seconds.
  // You could call autoUpdater.quitAndInstall(); immediately
  setTimeout(function() {
    debugger;
    autoUpdater.quitAndInstall();
  }, 15000)
});

//
// app.on('ready', function()  {
//   debugger;
// //  autoUpdater.checkForUpdates();
// });
