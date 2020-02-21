var canvas = <HTMLCanvasElement>document.getElementById("canvas-draw");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "blue";
ctx.fillRect(0, 0, 200, 200);

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