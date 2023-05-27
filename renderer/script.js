const { ipcRenderer } = require("electron");

let btn = document.querySelector("button");
let message = document.querySelector("#message");

btn.addEventListener("click", () => {
    let originalImage = document.querySelector("#originalImage").files[0];
    let watermarkImage = document.querySelector("#watermarkImage").files[0];

    if (originalImage && watermarkImage) {
        let originalImagePath = originalImage.path;
        let watermarkImagePath = watermarkImage.path;
        
        ipcRenderer.send("imageData", originalImagePath, watermarkImagePath);
    } else {
        console.log("Image file not found");
    }
});