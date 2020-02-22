// Initialize canvas
var canvas = document.getElementById("canvas-draw");
var ctx = canvas.getContext("2d");
var img = new Image();
img.src = '/images/image1.jpg';
img.onload = function () {
    var aspectRatio = img.width / img.height;
    // Changes the size of the canvas based on the size of the image
    if (aspectRatio > 1) {
        canvas.width = canvas.height * aspectRatio;
        img.width = canvas.width;
        img.height = canvas.height;
        console.log(img.width, img.height);
        ctx.drawImage(img, 0, 0, img.width, img.height);
    }
    else if (aspectRatio < 1) {
        canvas.height = canvas.width / aspectRatio;
        img.width = canvas.width;
        img.height = canvas.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
    }
    else {
        ctx.drawImage(img, 0, 0);
    }
};
// Bounding Boxes
var listOfBoxes = [];
var startMouseX = 0;
var startMouseY = 0;
var endMouseX = 0;
var endMouseY = 0;
var toolSelected = null;
canvas.addEventListener("mousedown", function (event) {
    if (document.getElementById("button-interesting").checked) {
        ctx.strokeStyle = "blue";
        toolSelected = "Interesting";
    }
    else if (document.getElementById("button-uninteresting").checked) {
        ctx.strokeStyle = "red";
        toolSelected = "Uninteresting";
    }
    if (toolSelected != null) {
        startMouseX = event.x;
        startMouseY = event.y;
        startMouseX -= canvas.offsetLeft;
        startMouseY -= canvas.offsetTop;
    }
});
canvas.addEventListener("mouseup", function (event) {
    if (toolSelected != null) {
        endMouseX = event.x;
        endMouseY = event.y;
        endMouseX -= canvas.offsetLeft;
        endMouseY -= canvas.offsetTop;
        ctx.strokeRect(startMouseX, startMouseY, endMouseX - startMouseX, endMouseY - startMouseY); // Draw rectangle
        console.log(startMouseX, startMouseY, endMouseX, endMouseY);
        var box = {
            startCoors: [startMouseX, startMouseY],
            endCoors: [endMouseX, endMouseY],
            toolSelected: toolSelected
        };
        listOfBoxes.push(box); // Push box to array listOfBoxes
        console.log(listOfBoxes);
    }
});
