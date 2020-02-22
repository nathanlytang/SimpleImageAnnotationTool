// Custom Types
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
var toolSelected = null;
var pointCounter = 0;
var annotationCounter = 0;
var startPoint = null;
var clickOnCanvas = false;
var output = { imageName: img.src.replace(/^.*[\\\/]/, ''), annotations: [] };
canvas.addEventListener("mousedown", function (event) {
    // Check which tool is selected
    if (document.getElementById("button-interesting").checked) {
        ctx.strokeStyle = "blue";
        toolSelected = "Interesting";
    }
    else if (document.getElementById("button-uninteresting").checked) {
        ctx.strokeStyle = "red";
        toolSelected = "Uninteresting";
    }
    if (toolSelected != null) {
        clickOnCanvas = true;
        pointCounter += 1;
        var point = String(pointCounter);
        // Establish upper left point
        var upperLeftPoint = { pointID: point, x: 0, y: 0 };
        upperLeftPoint.x = event.x - canvas.offsetLeft;
        upperLeftPoint.y = event.y - canvas.offsetTop;
        startPoint = upperLeftPoint;
    }
});
canvas.addEventListener("mouseup", function (event) {
    if (toolSelected != null && clickOnCanvas) {
        // Increase point counter
        pointCounter += 1;
        var point = String(pointCounter);
        // Establish lower right point
        var lowerRightPoint = { pointID: point, x: 0, y: 0 };
        lowerRightPoint.x = event.x - canvas.offsetLeft;
        lowerRightPoint.y = event.y - canvas.offsetTop;
        ctx.strokeRect(startPoint.x, startPoint.y, lowerRightPoint.x - startPoint.x, lowerRightPoint.y - startPoint.y); // Draw rectangle
        annotationCounter += 1;
        var annotation = String(annotationCounter);
        // Create new box object
        var box = { annotationID: annotation, upperLeft: startPoint, lowerRight: lowerRightPoint, type: null };
        if (toolSelected == "Interesting") {
            box.type = "Interesting";
        }
        else if (toolSelected == "Uninteresting") {
            box.type = "Uninteresting";
        }
        // Push box object to annotations list
        output.annotations.push(box);
        console.log(output);
        clickOnCanvas = false;
    }
});
function outputJSON() {
    var outputInJSON = JSON.stringify(output);
    console.log(outputInJSON);
}
