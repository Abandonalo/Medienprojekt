let drawallowed;
let width = 250;
let height = 300;

function setup() {

  canvas = createCanvas(width, height);
  canvas.parent("game-input")

  strokeWeight(5);
  drawallowed=true;
  
}

function draw() {
 
  
   if (mouseIsPressed &&  drawallowed) {
      stroke(255);
      line(mouseX, mouseY, pmouseX, pmouseY);
         }
   
}


function mouseReleased(){
    drawallowed=false;
}
