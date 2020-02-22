// Custom Types

type Point = {
    pointID: string,
    x: number,
    y: number,
};

type Annotation = {
    annotationID: string,
    upperLeft: Point,
    lowerRight: Point,
    type: string // Changed type from "Interesting"|"Unintersting" to string for reusability
};

type DesiredOutputFormat = {
    imageName: string
    annotations: Annotation[]
};

// Initialize canvas

var canvas = <HTMLCanvasElement>document.getElementById("canvas-draw");
var ctx = canvas.getContext("2d");

var img = new Image();
img.src = '/images/image1.jpg';
img.onload = function() {
    var aspectRatio:number = img.width / img.height

    // Changes the size of the canvas based on the size of the image
    if (aspectRatio > 1) {
        canvas.width = canvas.height * aspectRatio
        img.width = canvas.width
        img.height = canvas.height
        console.log(img.width, img.height)
        ctx.drawImage(img, 0, 0, img.width, img.height)

    } else if (aspectRatio < 1) {
        canvas.height = canvas.width / aspectRatio
        img.width = canvas.width
        img.height = canvas.height
        ctx.drawImage(img, 0, 0, img.width, img.height)

    } else {
        ctx.drawImage(img, 0, 0)
    }

}

// Bounding Boxes

var toolSelected:string = null;
var pointCounter:number = 0
var annotationCounter:number = 0
var startPoint = null

var output:DesiredOutputFormat = { imageName: img.src, annotations: [], }

canvas.addEventListener("mousedown", function(event){
    // Check which tool is selected
    if ((document.getElementById("button-interesting") as any).checked) {
        ctx.strokeStyle = "blue"
        toolSelected = "Interesting"
    }
    else if ((document.getElementById("button-uninteresting") as any).checked) {
        ctx.strokeStyle = "red"
        toolSelected = "Uninteresting"
    }
    if (toolSelected != null) {
        pointCounter+=1;
        var upperLeftPoint:Point = { pointID: null, x: 0, y: 0, }
        
        upperLeftPoint.x = event.x - canvas.offsetLeft;
        upperLeftPoint.y = event.y - canvas.offsetTop;
        startPoint = upperLeftPoint

    }
})

canvas.addEventListener("mouseup", function(event) {
    if (toolSelected != null) {
        
        var lowerRightPoint:Point = { pointID: null, x: 0, y: 0, }

        lowerRightPoint.x = event.x - canvas.offsetLeft;
        lowerRightPoint.y = event.y - canvas.offsetTop;
        
        ctx.strokeRect(startPoint.x, startPoint.y, lowerRightPoint.x - startPoint.x, lowerRightPoint.y - startPoint.y); // Draw rectangle

        var box:Annotation = {
            annotationID: null,
            upperLeft: startPoint,
            lowerRight: lowerRightPoint,
            type: toolSelected,
        }

        output.annotations.push(box)
        console.log(output)
    }
})