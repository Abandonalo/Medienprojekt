let drawallowed;
var points = new Array(11);
//var clientWidth;
//var clientHeight;
let width = 250;
let height = 300;

function setup() {
  //clientWidth = window.innerWidth - 60;
  //clientHeight = window.innerHeight - 60;
  //gameCanvasWidth = clientWidth;
  canvas = createCanvas(width, height);
  //canvas.parent("game-input");

  background(255);
  strokeWeight(5);
  drawallowed=true;
  forusepoint();
}

function draw() {
  if (mouseIsPressed &&  drawallowed) {
    stroke(0,146,177);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}

function mouseReleased(){
    drawallowed=false;
    readout();
    storearray();
}

function readout() {
  loadPixels();
    
  var stepSize = width/10;  
  var max = -1;

  for (var i = 0; i  <= width; i += stepSize ) {
    points[i/stepSize].x=i;
    max = -1;
    print("scanning x:" + i);
      
    for (var j=0; j <= height; j++){
      var index = (i+j*width)*4;
      if (pixels[index] < 255 && j > max ) {
        max=j;
        points[i/stepSize].y=max;  
        set(i,j,0);
        updatePixels();
        points[i/stepSize].usepoint=true;
      }
    }
  }
  print(points);
  printpoint();
}

function forusepoint(){
  for (var i=0;i<points.length;i++){
      points[i]=new Mypoint(0,0);
  }
}

function storearray(){
  storeItem('pointsarray', points);
}

class Mypoint {
  constructor(x,y){
    this.x=x;
    this.y=y;
    this.usepoint=false;
  }
}

function printpoint(){
  for(i=0;i<points.length;i++){
    if(points[i].usepoint){
      point(points[i].x,points[i].y);
      stroke('#05596B');
      strokeWeight(8);
    }
  }
}