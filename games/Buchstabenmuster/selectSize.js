let placeHolderLetter;

let xPositions;
let matrices;

const squares = [2, 1, 2, 2, 4, 4]; //change here to use other sizes or add/ remove sizes
const defaultScreenIndex = 1; //change here if you want to use a different default choice (Index of screen --> x position of SelectedSize in squares / 2)
let selectedSize = new Array(2);

let hasToSnapLeft = false;
let hasToSnapRight = false;

let clientWidth;
let clientHeight;

let touchStartX;


function abcSize_restart() {
  selectedSize[0] = squares[defaultScreenIndex * 2];
  selectedSize[1] = squares[defaultScreenIndex * 2 + 1];
  repositionMatrices(xPositions, clientHeight / 2);
}

function preload() {
  placeHolderLetter = loadImage('games/Buchstabenmuster/SVGs/M.svg'); //change here to use different letter as placeholder
  selectedSize[0] = squares[defaultScreenIndex * 2];
  selectedSize[1] = squares[defaultScreenIndex * 2 + 1];
  matrices = new Array(squares.length / 2);
  xPositions = new Array(squares.length / 2);
  for(let position of xPositions) {
    position = 0;
  }
}

function setup() {
  clientWidth =  window.innerWidth - 60;
  clientHeight = window.innerHeight - 60;
  canvas = createCanvas(clientWidth, clientHeight);
  canvas.parent("game");

  fillXPositions(clientWidth, defaultScreenIndex);
  createMatrices(xPositions, clientHeight / 2, squares);
}


function draw() {
  background(255);
  for(let matrix of matrices) {
    matrix.draw();
  }
}

windowResized = function () {
    clientWidth =  window.innerWidth - 60;
    clientHeight = window.innerHeight - 60;
    resizeCanvas(clientWidth, clientHeight);
    fillXPositions(clientWidth, defaultScreenIndex);
    repositionMatrices(xPositions, clientHeight / 2);
}

function fillXPositions(widthPerMatrix, defaultIndex) {
  for (let i = 0; i < squares.length / 2; i++) {
    xPositions[i] = widthPerMatrix / 2 + ((i - defaultIndex) * widthPerMatrix);
  }
}

function createMatrices(positions, yPosition, numSquares) {
  for(let i = 0; i < positions.length * 2; i += 2) {
    matrices[i / 2] = new PlaceHolderMatrix(positions[i / 2], yPosition, numSquares[i], numSquares[i + 1]);
  }
}

function repositionMatrices(positions, yPosition) {
  if (matrices == null) {
    return;
  }
  for(let i = 0; i < positions.length; i ++) {
    matrices[i].xCenter = positions[i];
    matrices[i].tempX = positions[i];
    matrices[i].yCenter = yPosition;
    matrices[i].tempY = yPosition;
  }
}

function touchStarted() {
  touchStartX = mouseX;
}

function touchEnded() {
  snapToSelection();
  if(hasToSnapLeft) {
    snapLeftAll();
  } else if (hasToSnapRight) {
    snapRightAll();
  }
  hasToSnapLeft = false;
  hasToSnapRight = false;
}

function storeAbcSizeChoice() {
  storeItem('abc_matrixSize', selectedSize);
}

function touchMoved() {
  let xDifference = mouseX - touchStartX;
  if (xDifference < -5 || xDifference > 5) {
    for(let matrix of matrices) {
      matrix.drag(xDifference);
    }
  }
}

function snapToSelection() {
  for(let matrix of matrices) {
      matrix.snapToSelection(clientWidth);
    }
    checkSelection();
}

function snapLeftAll() {
  for(let matrix of matrices) {
      matrix.snapLeft(clientWidth);
    }
    checkSelection();
}

function snapRightAll() {
  for(let matrix of matrices) {
      matrix.snapRight(clientWidth);
    }
    checkSelection();
}

function checkSelection() {
  for(let matrix of matrices) {
    matrix.checkSelected(xPositions[defaultScreenIndex]);
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
  }
  
  draw() {
    let matrixSize = min(clientWidth - 50, clientHeight - 225);
    let maxSquares = max(this.squaresX, this.squaresY);
    let squareSize = matrixSize / maxSquares;
    let x = this.tempX - (this.squaresX * squareSize / 2);
    let y = this.tempY - (this.squaresY * squareSize / 2);
    imageMode(CENTER);
    for (let i = 0; i < this.squaresY; i++) {
      x = this.tempX - (this.squaresX * squareSize / 2);
      for (let j = 0; j < this.squaresX; j++) {
        image(placeHolderLetter, x + (squareSize / 2), y + (squareSize / 2), squareSize, squareSize);
        strokeWeight(squareSize / 100);
        stroke(150);
        noFill();
        rect(x, y, squareSize, squareSize);
        x += squareSize;
      }
      y += squareSize;
    }
    textAlign(CENTER, CENTER);
    textSize(matrixSize / 8);
    fill(225);
    noStroke();
    let textY = this.tempY + 0.5 * matrixSize + matrixSize / 8;
    text(this.label, this.tempX, textY);
  }
  
  drag(xDifference) {
    this.tempX = this.xCenter + xDifference;
  }
  
  snapToSelection(widthPerMatrix) {
    if (this.tempX <= this.xCenter - 0.35 * widthPerMatrix) {
      this.xCenter = this.xCenter - widthPerMatrix;
    } else if(this.tempX > this.xCenter + 0.35 * widthPerMatrix){
      this.xCenter = this.xCenter + widthPerMatrix;
    } else {
    }
    this.tempX = this.xCenter;
    
    let buffer = widthPerMatrix / 100;
    
    if(this.xCenter > widthPerMatrix / 2 + widthPerMatrix * (squares.length / 2 - 1) + buffer) {
      hasToSnapLeft = true;
    }
    if(this.xCenter < widthPerMatrix / 2 - widthPerMatrix * (squares.length / 2 - 1) - buffer) {
      hasToSnapRight = true;
    }
  }
  
  snapRight(widthPerMatrix) {
    this.xCenter = this.xCenter + widthPerMatrix;
    this.tempX = this.xCenter;
  }
  
  snapLeft(widthPerMatrix) {
    this.xCenter = this.xCenter - widthPerMatrix;
    this.tempX = this.xCenter;
  }
  
  checkSelected(xSelection) {
    if(this.xCenter == xSelection) {
      selectedSize[0] = this.squaresX;
      selectedSize[1] = this.squaresY;
    }
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