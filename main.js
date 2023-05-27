const { app, BrowserWindow, ipcMain } = require("electron");
const { exec } = require("child_process");
const path = require("path");

function createWindow() {
    let win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile("renderer/index.html");

    const appPath = app.getAppPath();
    const pythonInterpreter = app.isPackaged ? '/usr/bin/python3' : 'python3';
    let pythonScriptPath;

    if (app.isPackaged) {
        pythonScriptPath = path.join(process.resourcesPath, "accessories", "watermarker.py");
    } else {
        pythonScriptPath = path.join(appPath, "accessories", "watermarker.py");
    };

    ipcMain.on("imageData", (event, originalImagePath, watermarkImagePath) => {
        exec(`${pythonInterpreter} ${pythonScriptPath} ${originalImagePath} ${watermarkImagePath}`, (err, stdout, stderr) => {
            if (err) {
                console.log(`err: ${err}`);
            } else if (stdout) {
                console.log(`stdout: ${stdout}`);
            } else {
                console.log(`stderr: ${stderr}`);
            }
        });
    });

    win.on("closed", () => {
        win = null;
    });
};

app.on("ready", createWindow);