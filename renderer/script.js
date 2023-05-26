const { ipcRenderer } = require("electron");

let btn = document.querySelector("button");
let message = document.querySelector("#message");

btn.addEventListener("click", () => {
    let imageFile = document.querySelector("#file").files[0];

    if (imageFile) {
        let path = imageFile.path;
        let fileName = path.split("/").slice(-1)[0];

        ipcRenderer.send("imageFileName", fileName);
        ipcRenderer.send("imagePath", path);
    } else {
        console.log("image file not found");
    }
});

ipcRenderer.on("imageSave", (event, message) => {
    console.log("Started");
});

ipcRenderer.on("status", (event, message) => {
    console.log("Image saved");
})