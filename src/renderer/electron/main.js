import { app, BrowserWindow } from 'electron';
import path from 'path';

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#00000000',
            symbolColor: '#ffffff',
            height: 48,
        },
        webPreferences: {
            preload: path.join('./preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
        frame: false,  // Disable the default frame
        resizable: false, // Disable window resizing
        maximizable: false, // Disable window maximizing
    });

    // Disable double-click maximize (as a precaution, though maximizable is false)
    mainWindow.on('will-resize', (event) => {
        event.preventDefault();
    });

    mainWindow.loadURL('http://localhost:5173'); // URL for Next.js development server
    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

    ipcMain.handle('open-folder-dialog', async () => {
        const { dialog } = require('electron');
        const result = await dialog.showOpenDialog({
            properties: ['openDirectory']
        });
        return result;
    });
});


// Quit when all windows are closed, except on macOS
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// app.whenReady().then(() => {
//     ipcRenderer.invoke('open-folder-dialog').then((result) => {
//         console.log(result);
//     }).catch((err) => {
//         console.error(err);
//     });
// });
