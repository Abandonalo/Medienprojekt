let drawallowed;
var points = new Array(11);
var width;
var height;
var timer = null;

function setup() {
  width = window.innerWidth - 60;
  height = window.innerHeight - 60;
  canvas = createCanvas(width, height);
  canvas.parent("game");

  background(255);
  strokeWeight(5);

  timer = setTimeout(function() {
    console.log("time out");
    drawallowed=true;
    timer = null;
  }, 500);

  forusepoint();
}

function draw() {
  if (mouseIsPressed && drawallowed) {
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

  for (var i = 0; i <10; i++ ) {
    points[i].x=i*stepSize;
    max = -1;
    //print("scanning x:" + i);
      
    for (var j=0; j <= height; j++){
      var index = (i*stepSize+j*width)*4;
      if (pixels[index] < 255 && j > max ) {
        max=j;
        points[i].y=max;  
        set(i*stepSize,j,0);
        updatePixels();
        points[i].usepoint=true;
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