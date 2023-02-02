//TODO: font, call saveArtWork function from --> button in final app
//TODO JETZT: einen Buchstaben weglassen aus Menükarten bzw. wenn nur einer kein Menu!!!

let myFont = 'Montserrat';
var canvas;
var clientWidth;
var clientHeight;
let matrixHeightRelative = 0.7;
let menuHeightRelative = 0.25;

//default, overwritten in setup, with locally stored values from screen 1
//var cardsChoice = ['SVGs/M.svg', 'SVGs/L.svg', 'SVGs/E.svg'];
let choiceIndeces;
//default, overwritten in setup, with locally stored values from screen 2
let matrixSize;

var touchStartX;
var touchStartY;

var menuCards;
var letterCards;
var letterMatrix;

var menuCardsXPositions;
var menuCardsY;
var menuCardSize;
var squareSize;

var selectedCardIndex;
var selectedIsLetterCard;
var somethingWasTouched = false;

var letterImages;

function preload() {
  console.log("preloading");
  letterImages = new Array(16);
  loadSVGs();
  choiceIndeces = getItem('abc_letterChoiceIndeces');
  matrixSize = getItem('abc_matrixSize');
  console.log(choiceIndeces);
  console.log(abc_matrixSize);
}

//retrieves locally stored variable values and fills all card-arrays and the matrix
function setup() {
  console.log("setting up");
  clientWidth = window.innerWidth - 60;
  clientHeight = window.innerHeight - 60;
  canvas = createCanvas(clientWidth, clientHeight);
  canvas.parent("game");
  
  createLetterCards();
  createMatrix();
  computeMenuCardsXPositions();
  createMenuCards();
}

//resizes canvas and every element on it
windowResized = function () {
  clientWidth = window.innerWidth - 60;
  clientHeight = window.innerHeight - 60;
  resizeCanvas(clientWidth, clientHeight);
  
  computeMenuCardsXPositions();
  resizeMenuCards();
  letterMatrix.resize(clientWidth / 2, (clientHeight / 2) * matrixHeightRelative);
}

//downloads the artwork as jpg
function saveArtWork() {
  resizeCanvas(clientWidth, clientHeight * matrixHeightRelative);
  saveCanvas('how to: Vera Molnar - ABC', 'jpg');
}

//calls draw function of every element
function draw() {
  background(255);
  drawLetterCards();
  drawLetterMatrix();
  drawMenuCards();
}

//draws the lettermatrix
function drawLetterMatrix() {
  letterMatrix.draw();
}

//checks if the given coordinates are within a selectable item (card), if so returns true
//also sets the cards isSelected value to true and selectedIsLetterCard
function objectTouched(x, y) {
  for (var menuCard of menuCards) {
    if (dist(x, y, menuCard.xCenter, menuCard.yCenter) <= menuCardSize / 2) {
      menuCard.isSelected = true;
      selectedCardIndex = menuCard.index;
      selectedIsLetterCard = false;
      return true;
    }
  }
  
  for (var letterCard of letterCards) {
    if (dist(x, y, letterCard.xCenter, letterCard.yCenter) <= squareSize / 2) {
      letterCard.isSelected = true;
      selectedCardIndex = letterCard.index;
      selectedIsLetterCard = true;
      return true;
    }
  }
  return false;
}

//stores coordinates of touch start position and checks if something was touched
function touchStarted(){
  touchStartX = mouseX;
  touchStartY = mouseY;
  somethingWasTouched = objectTouched(touchStartX, touchStartY);
}

//calls touchEnded of selected card and deselects it
function touchEnded(){
  if(!somethingWasTouched) {
    return;
  }
  somethingWasTouched = !somethingWasTouched;
  if(selectedIsLetterCard) {
    letterCards[selectedCardIndex].isSelected = false;
    letterCards[selectedCardIndex].touchEnded();
  } else {
    menuCards[selectedCardIndex].isSelected = false;
    menuCards[selectedCardIndex].touchEnded();
  }
}

//checks if a card is dragged, if so calls the drag function
function touchMoved(){
  if (selectedIsLetterCard && dist(touchStartX, touchStartY, mouseX, mouseY) >= 10) {
    letterCards[selectedCardIndex].drag();
  }
}

//creates the matrix
function createMatrix() {
  letterMatrix = new LetterMatrix(clientWidth / 2, (clientHeight / 2) * matrixHeightRelative, matrixSize[0], matrixSize[1]);
}



function loadSVGs() {
  letterImages[0] = loadImage('games/Buchstabenmuster/SVGs/C.svg');
  letterImages[1] = loadImage('games/Buchstabenmuster/SVGs/E.svg');
  letterImages[2] = loadImage('games/Buchstabenmuster/SVGs/F.svg');
  letterImages[3] = loadImage('games/Buchstabenmuster/SVGs/H.svg');
  letterImages[4] = loadImage('games/Buchstabenmuster/SVGs/I.svg');
  letterImages[5] = loadImage('games/Buchstabenmuster/SVGs/K.svg');
  letterImages[6] = loadImage('games/Buchstabenmuster/SVGs/L.svg');
  letterImages[7] = loadImage('games/Buchstabenmuster/SVGs/M.svg');
  letterImages[8] = loadImage('games/Buchstabenmuster/SVGs/N.svg');
  letterImages[9] = loadImage('games/Buchstabenmuster/SVGs/O.svg');
  letterImages[10] = loadImage('games/Buchstabenmuster/SVGs/S.svg');
  letterImages[11] = loadImage('games/Buchstabenmuster/SVGs/T.svg');
  letterImages[12] = loadImage('games/Buchstabenmuster/SVGs/U.svg');
  letterImages[13] = loadImage('games/Buchstabenmuster/SVGs/V.svg');
  letterImages[14] = loadImage('games/Buchstabenmuster/SVGs/Y.svg');
  letterImages[15] = loadImage('games/Buchstabenmuster/SVGs/Z.svg');
}



class LetterMatrix {
  constructor(xCenter, yCenter, squaresX, squaresY) {
    this.squaresX = squaresX;
    this.squaresY = squaresY;
    
    this.squareSize = 0;
    this.resize(xCenter, yCenter);
  }
  
  draw () {
    var x = this.xCenter - 0.5 * matrixSize + 0.5 * squareSize;
    var y = this.yCenter - 0.5 * matrixSize + 0.5 * squareSize;
    
    for (var i = 0; i < this.squaresY; i++) {
      x = this.xCenter - 0.5 * matrixSize + 0.5 * squareSize;
      for (var j = 0; j < this.squaresX; j++) {
        strokeWeight(squareSize / 60);
        stroke(150);
        noFill();
        rect(x, y, squareSize, squareSize);
        x += squareSize;
      }
      y += squareSize;
    }
  }
  
  //newX and newY define the new centerpoint of the matrix
  //also resizes the lettercars
  resize(newX, newY) {
    this.xCenter = newX;
    this.yCenter = newY;
    var matrixSize = min(clientWidth - 60, (clientHeight - 120) * matrixHeightRelative);
    var maxSquares = max(this.squaresX, this.squaresY);
    squareSize = matrixSize / maxSquares;
    
    var x = this.xCenter - 0.5 * matrixSize + 0.5 * squareSize;
    var y = this.yCenter - 0.5 * matrixSize + 0.5 * squareSize;
    for (var i = 0; i < this.squaresY; i++) {
      x = this.xCenter - 0.5 * matrixSize + 0.5 * squareSize;
      for (var j = 0; j < this.squaresX; j++) {
        var index = i * this.squaresX + j;
        letterCards[index].xCenter = x;
        letterCards[index].yCenter = y;
        letterCards[index].tempX = x;
        letterCards[index].tempY = y;
        x += squareSize;
      }
      y += squareSize;
    }
  }
  
  //sets the letterCard at (x, y) to the letter in letter and the given rotation
  checkForChange(letter, x, y, rotation) {
    for(var i = 0; i < letterCards.length; i++) {
      if (dist(x, y, letterCards[i].xCenter, letterCards[i].yCenter) <= squareSize / 2) {
        letterCards[i].setLetter(letter);
        letterCards[i].setRotation(rotation);
        break;
      }
    }
  }
  
  checkForChangeLetterCard(letter, x, y, rotation, originalCard) {
    for(var i = 0; i < letterCards.length; i++) {
      if (dist(x, y, letterCards[i].xCenter, letterCards[i].yCenter) <= squareSize / 2) {
        originalCard.setLetter(letterCards[i].letter);
        originalCard.setRotation(letterCards[i].angle);
        letterCards[i].setLetter(letter);
        letterCards[i].setRotation(rotation);
        break;
      }
    }
  }
}