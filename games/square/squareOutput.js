var numx = 4;
var numy = 7;
var gridSpacex;
var gridSpacey;
var buffer;
var canvas;
var form;
var layer;
var farb;
var off = 0;

var clientWidth;
var clientHeight;

var h;
var s = 64;
var b;

function setup() {
  clientWidth = window.innerWidth - 60;
  clientHeight = window.innerHeight - 60;
  gameCanvasWidth = clientWidth;
  canvas = createCanvas(clientWidth, clientHeight);
  setAttributes("willReadFrequently", true);
  canvas.parent("game");
  buffer = createGraphics(width, height);
  form = getItem("form");
  layer = getItem("shape");
  farb = getItem("color");

  noFill();
  noLoop();
  colorMode(HSB);
  blendMode(DARKEST);

  gridSpacex = width / numx - 2;
  gridSpacey = height / numy - 5;

  h = random(0, 360);
  b = random(64, 128);
}

function draw() {
  background(255);

  if (form == "stark") {
    console.log("drawing stark1");
    drawGrid(off, h, s, b);
    off = 20;
  } else {
    console.log("drawing wenig1");
    drawGrid(off, h, s, b);
    off = 10;
  }
}

function plusLayer() {
  buffer.copy(canvas, 0, 0, width, height, 0, 0, buffer.width, buffer.height);
  console.log("copied");
  copy(buffer, 0, 0, buffer.width, buffer.height, 0, 0, width, height);

  h += 10;
  b += 10;

  if (form == "stark") {
    console.log("drawing stark2");
    drawGrid(off, h, s, b);
  } else {
    console.log("drawing wenig2");
    drawGrid(off, h, s, b);
  }
}

function drawGrid(off, h, s, b) {
  for (y = 0; y < numy; y++) {
    for (x = 0; x < numx; x++) {
      var xpos = x * gridSpacex + 10;
      var ypos = y * gridSpacey + 15;
      console.log("(" + xpos + ", " + ypos + ")");
      h += x * y;
      b += x * y;
      if (farb == "colorful") {
        //console.log("color");
        stroke(h, s, b);
      }
      if (layer == "square") {
        //console.log("square");
        quad(
          //x1, y1
          xpos + random(-off, off),
          ypos + random(-off, off),
          //x2, y2
          xpos + gridSpacex / 1.2 + random(-off, off),
          ypos + random(-off, off),
          //x3, y3
          xpos + gridSpacex / 1.2 + random(-off, off),
          ypos + gridSpacey / 1.2 + random(-off, off),
          //x4, y4
          xpos + random(-off, off),
          ypos + gridSpacey / 1.2 + random(-off, off)
        );
        console.log("quaded");
      } else {
        console.log("handdrawn");
        var x1 = getItem("1x");
        var y1 = getItem("1y");
        var x2 = getItem("2x");
        var y2 = getItem("2y");
        var x3 = getItem("3x");
        var y3 = getItem("3y");
        var x4 = getItem("4x");
        var y4 = getItem("4y");

        var upperx = (x2 - x1) / 4;
        var uppery = (y2 - y1) / 4;
        var leftx = (x3 - x1) / 4;
        var lefty = (y3 - y1) / 4;
        var rightx = (x4 - x2) / 4;
        var righty = (y4 - y2) / 4;
        var lowerx = (x4 - x3) / 4;
        var lowery = (y4 - y3) / 4;

        quad(
          //x1, y1
          xpos + random(-off, off),
          ypos + random(-off, off),
          //x2, y2
          xpos + upperx + random(-off, off),
          ypos + uppery + random(-off, off),
          //x3, y3
          xpos + upperx + rightx + random(-off, off),
          ypos + uppery + righty + random(-off, off),
          //x4, y4
          xpos + leftx + random(-off, off),
          ypos + lefty + random(-off, off)
        );
      }
    }
  }
}

function saveArtwork() {
  saveCanvas(canvas, "howTo-meineQuadrat", "jpg");
}
