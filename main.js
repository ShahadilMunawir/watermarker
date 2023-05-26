const { app, BrowserWindow, ipcMain} = require("electron");
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
    win.webContents.openDevTools();
    const appPath = app.isPackaged ? path.join(path.dirname(app.getPath("Exe")), "renderer") : path.join(__dirname, "renderer");
    const pythonInterpreter = app.isPackaged ? '/usr/bin/python3' : 'python3';
    const pythonScriptPath = path.join(appPath, "watermarker.py");
    console.log(pythonScriptPath);

    exec(`cd ${appPath} && pwd`, (err, stdout, stderr) => {
        console.log(stdout);
    });

    ipcMain.on("imageFileName", (event, imageFileName) => {
        ipcMain.on("imagePath", (event, imagePath) => {
            win.webContents.send("imageSave", "Started");
            exec(`${pythonInterpreter} ${pythonScriptPath} ${imagePath} ${imageFileName}`, (err, stdout, stderr) => {
                if (err) {
                    console.log(err);
                } else if (stdout) {
                    console.log(stdout);
                } else {
                    console.log(stderr);
                }
                win.webContents.send("status", "File saved");
                console.log("image saved");
            });
        });
    })


    win.on("closed", () => {
        win = null;
    });
};

app.on("ready", createWindow);