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
  clientHeight = window.innerHeight - 100;
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
  drawGrid(off, h, s, b);
}

function plusLayer() {
  buffer.copy(canvas, 0, 0, width, height, 0, 0, buffer.width, buffer.height);
  copy(buffer, 0, 0, buffer.width, buffer.height, 0, 0, width, height);

  h += 10;
  b += 10;

  if (form == "stark") {
    off = 20;
  } else {
    off = 10;
  }
  drawGrid(off, h, s, b);
}

function drawGrid(off, h, s, b) {
  for (y = 0; y < numy; y++) {
    for (x = 0; x < numx; x++) {
      var xpos = x * gridSpacex + 10;
      var ypos = y * gridSpacey + 5;
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
          xpos + gridSpacex / 1.3 + random(-off, off),
          ypos + random(-off, off),
          //x3, y3
          xpos + gridSpacex / 1.3 + random(-off, off),
          ypos + gridSpacey / 1.3 + random(-off, off),
          //x4, y4
          xpos + random(-off, off),
          ypos + gridSpacey / 1.3 + random(-off, off)
        );
      } else {
        var x1 = getItem("1x") == null ? xpos : getItem("1x");
        var y1 = getItem("1y") == null ? ypos : getItem("1y");
        var x2 =
          getItem("2x") == null
            ? xpos + (gridSpacex / 1.3) * 3.5
            : getItem("2x");
        var y2 = getItem("2y") == null ? y1 : getItem("2y");
        var x3 = getItem("3x") == null ? x2 : getItem("3x");
        var y3 =
          getItem("3y") == null
            ? ypos + (gridSpacey / 1.3) * 3.5
            : getItem("3y");
        var x4 = getItem("4x") == null ? x1 : getItem("4x");
        var y4 = getItem("4y") == null ? y3 : getItem("4y");

        /*console.log(
          "from storage: (x1, y1: " +
            x1 +
            ", " +
            y1 +
            "), (x2, y2: " +
            x2 +
            ", " +
            y2 +
            "), (x3, y3:" +
            x3 +
            ", " +
            y3 +
            "), (x4, y4:" +
            x4 +
            ", " +
            y4 +
            ")"
        );*/

        var upperx = (x2 - x1) / 3.5;
        var uppery = (y2 - y1) / 3.5;
        var leftx = (x4 - x1) / 3.5;
        var lefty = (y4 - y1) / 3.5;
        var rightx = (x3 - x2) / 3.5;
        var righty = (y3 - y2) / 3.5;
        
        
        /*console.log(
          "upperx: " +
          upperx +
          ", uppery: " +
          uppery +
          ", leftx: " +
          leftx +
          ", lefty: " +
          lefty +
          ", rightx: " +
          rightx +
          ", righty: " +
          righty
        );

        console.log(
          "(x1, y1: " +
            xpos +
            ", " +
            ypos +
            "), (x2, y2: " +
            xpos +
            upperx +
            ", " +
            ypos +
            uppery +
            "), (x3, y3:" +
            xpos +
            upperx +
            rightx +
            ", " +
            ypos +
            uppery +
            righty +
            "), (x4, y4:" +
            xpos +
            leftx +
            ", " +
            ypos +
            lefty +
            ")"
        );*/

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
