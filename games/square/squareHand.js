let size
let vecTL, vecTR, vecBL, vecBR;
var clientWidth;
var clientHeight;



function setup() {
  clientWidth = window.innerWidth - 60;
  clientHeight = window.innerHeight - 60;

  canvas = createCanvas(clientWidth, clientHeight, WEBGL);
  canvas.parent("game");

  size = min(height, width) * 0.3;
  vecTL = createPoint(-size, -size);//TOP LEFT
  vecTR = createPoint(size, -size);//TOP RIGHT
  vecBR = createPoint(size, size);//BOTTOM LEFT
  vecBL = createPoint(-size, size);//BOTTOM RIGHT
}

function createPoint(x, y) {
  let vec = createVector(x, y);
  addDrag(vec);
  return vec;
}

function draw() {
  background(255);
  strokeWeight(5);
  quad(vecTL.x, vecTL.y, vecTR.x, vecTR.y, vecBR.x, vecBR.y, vecBL.x, vecBL.y);
  drawDrag();
}

function touchStarted() {
  dragTouchStarted();
}

function touchEnded() {
  dragTouchEnded();
}

function touchMoved() {
  dragTouchMoved();
}