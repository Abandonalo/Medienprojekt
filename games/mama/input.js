let drawallowed;
var points;
var width;
var height;

function setup() {
  canvas = createCanvas(window.innerWidth - 60, window.innerHeight - 60);
  points = new Array(
    parseInt(((window.innerWidth - 60) * (window.innerHeight - 60)) / 50)
  );
  canvas.parent("game");

  background(255);
  strokeWeight(5);
  drawallowed = true;
  forusepoint();
}

function draw() {
  if (mouseIsPressed && drawallowed) {
    stroke(0, 146, 177);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function mouseReleased() {
  drawallowed = false;
  readout();
  storearray();
}

function readout() {
  loadPixels();

  var numx = width / 5;
  //print("num: " + num);
  var numy = height / 10;
  var numpoint = 0;

  for (var i = 0; i <= numx; i++) {
    for (var j = 0; j <= numy; j++) {
      let d = pixelDensity();
      var index = (i * 5 + j * 10 * width * d) * 4 * d;
      if (pixels[index] < 255) {
        //print("point[" + numpoint + "] used, x =" + i * 5 + ", y =" + j * 10);
        points[numpoint].x = i * 5;
        points[numpoint].y = j * 10;
        points[numpoint].usepoint = true;
        numpoint++;
      }
    }
  }
  print(points);
  //printpoint();
}

function forusepoint() {
  for (var i = 0; i < points.length; i++) {
    points[i] = new Mypoint(0, 0);
  }
}

function storearray() {
  storeItem("pointsarray", points);
}

class Mypoint {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.usepoint = false;
  }
}

function printpoint() {
  for (i = 0; i < points.length; i++) {
    if (points[i].usepoint) {
      point(points[i].x, points[i].y);
      stroke("#05596B");
      strokeWeight(8);
    }
  }
}

/*function inputreset(){
  background(255);
  setup();
}
 */
