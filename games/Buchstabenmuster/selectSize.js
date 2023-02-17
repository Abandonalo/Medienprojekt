let myFont = 'Montserrat';

var placeHolderLetter;

var xPositions;
let squares = [2, 1, 2, 2, 4, 4];
var matrices;

var selectedSize = [2, 2];

var snLeft = false;
var snRight = false;

var clientWidth;
var clientHeight;

var touchStartX;


function abcSize_restart() {
  selectedSize[0] = 2;
  selectedSize[1] = 2;
  repositionMatrices();
}

function preload() {
  placeHolderLetter = loadImage('games/Buchstabenmuster/SVGs/M.svg');
  matrices = new Array(squares.length / 2);
  xPositions = new Array(squares.length / 2);
  for(var position of xPositions) {
    position = 0;
  }
}

//sets up width, height of canvas and canvas, fills positions array and creates all matrices
function setup() {
  clientWidth =  window.innerWidth - 60;
  clientHeight = window.innerHeight - 60;
  canvas = createCanvas(clientWidth, clientHeight);
  canvas.parent("game");

  fillXPositions(clientWidth);
  createMatrices(xPositions, clientHeight / 2, squares);
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
    clientWidth =  window.innerWidth - 60;
    clientHeight = window.innerHeight - 60;
    resizeCanvas(clientWidth, clientHeight);
    fillXPositions(clientWidth);
    repositionMatrices(xPositions, clientHeight / 2);
}

//computes centerpoints of the matrices and stores them in xPositions[]
function fillXPositions(widthPerMatrix) {
  for (i = 0; i < xPositions.length; i++) {
    xPositions[i] = widthPerMatrix / 2 + ((i - 1) * widthPerMatrix);
  }
  //return xPositions;
}

//creates matrices and stores them in matrices[]
function createMatrices(positions, yPosition, numSquares) {
  for(i = 0; i < xPositions.length * 2; i += 2) {
    matrices[i / 2] = new PlaceHolderMatrix(positions[i / 2], yPosition, numSquares[i], numSquares[i + 1]);
  }
}

//repositions matrices by updating their x position stored in xCenter
function repositionMatrices(positions, yPosition) {
  for(i = 0; i < xPositions.length * 2; i += 2) {
    matrices[i / 2].xCenter = positions[i / 2];
    matrices[i / 2].tempX = positions[i / 2];
    matrices[i / 2].yCenter = yPosition;
    matrices[i / 2].tempY = yPosition;
    //to restore last selection
    /*
    if(! (selectedSize[0] == 2 && selectedSize[1] == 2)) {
      if(selectedSize[0] == 2 && selectedSize[0] == 1) {
        snapRightAll();
      } else {
        snapLeftAll();
      }
    }
    */
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
}

function storeAbcSizeChoice() {
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
      matrix.snapToSelection(clientWidth);
    }
    checkSelection();
}

//calls snapLeft method for every matrix
function snapLeftAll() {
  for(var matrix of matrices) {
      matrix.snapLeft(clientWidth);
    }
    checkSelection();
}

//calls snapRight method for every matrix
function snapRightAll() {
  for(var matrix of matrices) {
      matrix.snapRight(clientWidth);
    }
    checkSelection();
}

function checkSelection() {
  for(var matrix of matrices) {
    matrix.checkSelected(xPositions[1]);
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
    this.label = this.createLabel(squaresX, squaresY);
    console.log("new matrix: " + squaresX + " by " + squaresY);
  }
  
  //draws the matrix on the canvas centered around tempX and tempY
  draw() {
    var matrixSize = min(clientWidth - 50, clientHeight - 225);
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
    textAlign(CENTER, CENTER);
    textSize(matrixSize / 8);
    fill(235);
    noStroke();
    var textY = this.tempY + 0.5 * matrixSize + matrixSize / 8;
    text(this.label, this.tempX, textY);
  }
  
  //drags the matrix by updating the centerpoint --> update shows with next draw
  drag(xDifference) {
    this.tempX = this.xCenter + xDifference;
  }
  
  //snaps to the selected screen by computing the distance to the screen centerpoints
  //also sets snapLeft or right if snapping results at an empty screen baaing visible
  snapToSelection(widthPerMatrix) {
    if (this.tempX <= this.xCenter - 0.35 * widthPerMatrix) {
      this.xCenter = this.xCenter - widthPerMatrix;
    } else if(this.tempX > this.xCenter + 0.35 * widthPerMatrix){
      this.xCenter = this.xCenter + widthPerMatrix;
    } else {
    }
    this.tempX = this.xCenter;
    
    var buffer = widthPerMatrix / 100;
    
    if(this.xCenter > widthPerMatrix / 2 + widthPerMatrix * (squares.length / 2 - 1) + buffer) {
      snLeft = true;
    }
    if(this.xCenter < widthPerMatrix / 2 - widthPerMatrix * (squares.length / 2 - 1) - buffer) {
      snRight = true;
    }
  }
  
  //moves matrix one screen to the right
  snapRight(widthPerMatrix) {
    this.xCenter = this.xCenter + widthPerMatrix;
    this.tempX = this.xCenter;
  }
  
  //moves matrix one screen to the left
  snapLeft(widthPerMatrix) {
    this.xCenter = this.xCenter - widthPerMatrix;
    this.tempX = this.xCenter;
  }
  
  //if this matrix is the one beeing displayed selectedSize gets updated to the x and y squares of this matrix
  checkSelected(xSelection) {
    if(this.xCenter == xSelection) {
      selectedSize[0] = this.squaresX;
      selectedSize[1] = this.squaresY;
      return true;
    }
    return false;
  }

  createLabel(x, y) {
    if(this.xCenter == xPositions[xPositions.length - 1]) {
      return "<   " + x + " x " + y;
    } else if(this.xCenter == xPositions[0]){
      return x + " x " + y + "   >";
    } else {
      return "<   " + x + " x " + y + "   >";
    }
  }
}