//TODO: font, currently everytime touch ended, choice gets stored --> needs to be changed in final app! (take out and use storeChoice function instead!)

var myFont = 'Montserrat';

var placeHolderLetter;

var xPositions = [0, 0, 0];
let squares = [2, 1, 2, 2, 4, 4];
var matrices = new Array(3);

var selectedSize = [2, 2];

var snLeft = false;
var snRight = false;

var clientWidth;
var clientHeight;

var touchStartX;

function preload() {
   placeHolderLetter = loadImage('SVGs/M.svg');
}

//sets up width, height of canvas and canvas, fills positions array and creates all matrices
function setup() {
  clientWidth = windowWidth;
  clientHeight = windowHeight;
  createCanvas(clientWidth, clientHeight);
  fillXPositions();
  createMatrices();
}


//calls draw method from the matrix class for every matrix
function draw() {
  background(255);
  for(var matrix of matrices) {
    matrix.draw();
  }
}

//updates width and height and resizes canvas accordingly, also updates the positions of the matrices
//snaps them (back) into default position!!
windowResized = function () {
    clientWidth = windowWidth;
    clientHeight = windowHeight;
    resizeCanvas(clientWidth, clientHeight);
    fillXPositions();
    repositionMatrices();
}

//computes centerpoints of the matrices and stores them in xPositions[]
function fillXPositions() {
  for (i = 0; i < xPositions.length; i++) {
    xPositions[i] = clientWidth / 2 + ((i - 1) * clientWidth);
  }
}

//creates matrices and stores them in matrices[]
function createMatrices() {
  for(i = 0; i < xPositions.length * 2; i += 2) {
    matrices[i / 2] = new PlaceHolderMatrix(xPositions[i / 2], clientHeight / 2, squares[i], squares[i + 1]);
  }
}

//repositions matrices by updating their x position stored in xCenter
function repositionMatrices() {
  for(i = 0; i < xPositions.length * 2; i += 2) {
    matrices[i / 2].xCenter = xPositions[i / 2];
    matrices[i / 2].tempX = xPositions[i / 2];
    matrices[i / 2].yCenter = clientHeight / 2;
    matrices[i / 2].tempY = clientHeight / 2;
  }
}

//saves x value of touch Start point to touchStartX
function touchStarted() {
  touchStartX = mouseX;
}

//snap into position and snapLeft or right to avoid snapping to "empty screens"
function touchEnded() {
  snapToSelection();
  if(snLeft) {
    snapLeftAll();
  } else if (snRight) {
    snapRightAll();
  }
  snLeft = false;
  snRight = false;

  //only use here for debugging!!!
  //storeItem('abc_matrixSize', selectedSize);
}

//TODO call in final implementation from --> button
function storeChoice() {
  storeItem('abc_matrixSize', selectedSize);
}

//calls drag method of class matrix for every matrix when a drag in x direction is detected
function touchMoved() {
  var xDifference = mouseX - touchStartX;
  if (xDifference < -5 || xDifference > 5) {
    for(var matrix of matrices) {
      //print(xDifference);
      matrix.drag(xDifference);
    }
  }
}

//calls snapToSelection method for every matrix
function snapToSelection() {
  //print("snapToSelection");
  for(var matrix of matrices) {
      matrix.snapToSelection();
    }
}

//calls snapLeft method for every matrix
function snapLeftAll() {
  for(var matrix of matrices) {
      matrix.snapLeft();
    }
}

//calls snapRight method for every matrix
function snapRightAll() {
  for(var matrix of matrices) {
      matrix.snapRight();
    }
}


class PlaceHolderMatrix {
  constructor(xCenter, yCenter, squaresX, squaresY) {
    this.xCenter = xCenter;
    this.yCenter = yCenter;
    this.squaresX = squaresX;
    this.squaresY = squaresY;
    
    this.tempX = xCenter;
    this.tempY = yCenter;
  }
  
  //draws the matrix on the canvas centered around tempX and tempY
  draw() {
    var matrixSize = min(clientWidth - 120, clientHeight - 120);
    var maxSquares = max(this.squaresX, this.squaresY);
    var squareSize = matrixSize / maxSquares;
    var x = this.tempX - (this.squaresX * squareSize / 2);
    var y = this.tempY - (this.squaresY * squareSize / 2);
    imageMode(CENTER);
    for (var i = 0; i < this.squaresY; i++) {
      x = this.tempX - (this.squaresX * squareSize / 2);
      for (var j = 0; j < this.squaresX; j++) {
        image(placeHolderLetter, x + (squareSize / 2), y + (squareSize / 2), squareSize, squareSize);
        strokeWeight(squareSize / 60);
        stroke(150);
        noFill();
        rect(x, y, squareSize, squareSize);
        x += squareSize;
      }
      y += squareSize;
    }
  }
  
  //drags the matrix by updating the centerpoint --> update shows with next draw
  drag(xDifference) {
    this.tempX = this.xCenter + xDifference;
  }
  
  //snaps to the selected screen by computing the distance to the screen centerpoints
  //also sets snapLeft or right if snapping results at an empty screen baaing visible
  snapToSelection() {
    if (this.tempX <= this.xCenter - 0.35 * clientWidth) {
      this.xCenter = this.xCenter - clientWidth;
    } else if(this.tempX > this.xCenter + 0.35 * clientWidth){
      this.xCenter = this.xCenter + clientWidth;
    } else {
    }
    this.tempX = this.xCenter;
    this.checkSelected();
    
    var buffer = clientWidth / 100;
    
    if(this.xCenter > clientWidth / 2 + clientWidth * 2 + buffer) {
      snLeft = true;
    }
    if(this.xCenter < clientWidth / 2 - clientWidth * 2 - buffer) {
      snRight = true;
    }
  }
  
  //moves matrix one screen to the right
  snapRight() {
    this.xCenter = this.xCenter + clientWidth;
    this.tempX = this.xCenter;
    this.checkSelected();
  }
  
  //moves matrix one screen to the left
  snapLeft() {
    this.xCenter = this.xCenter - clientWidth;
    this.tempX = this.xCenter;
    this.checkSelected();
  }
  
  //if this matrix is the one beeing displayed selectedSize gets updated to the x and y squares of this matrix
  checkSelected() {
    if(this.xCenter == xPositions[1]) {
      selectedSize[0] = this.squaresX;
      selectedSize[1] = this.squaresY;
    }
  }
}