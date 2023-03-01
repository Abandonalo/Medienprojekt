let clientWidth;
let clientHeight;
const matrixHeightRelative = 0.7;
const menuHeightRelative = 0.25;

let choiceIndeces;
let matrixSize;

let touchStartX;
let touchStartY;

let menuCards;
let letterCards;
let letterMatrix;

let menuCardsXPositions;
let menuCardsY;
let menuCardSize;
let squareSize;

let selectedCardIndex;
let selectedIsLetterCard;
let somethingWasTouched = false;

let letterImages;

const defaultChoice = [7, 6]; //in case local storage malfunctions
const defaultSize = [2, 2]; //in case local storage malfunctions

let lo = {"clicked" : false};

function abcOutput_restart() {
  for (let letterCard of letterCards) {
    letterCard.setLetter(letterImages[choiceIndeces[0]]);
    letterCard.setRotation(0);
  }
}

function storeMatrix() {
  storeItem('abc_matrix-result', letterMatrix);
}

function restoreMatrix() {
  getItem('abc_matrix-result', letterMatrix);
}

function preload() {
  letterImages = new Array(16);
  loadSVGs();
  choiceIndeces = getItem('abc_letterChoiceIndeces');
  matrixSize = getItem('abc_matrixSize');
}

function setup() {
  if(choiceIndeces == null || choiceIndeces.length == 0) {
    choiceIndeces = defaultChoice;
  }
  if (matrixSize == null || matrixSize.length == 0) {
    matrixSize = defaultSize;
  }
  clientWidth = window.innerWidth - 60;
  clientHeight = window.innerHeight - 100;
  canvas = createCanvas(clientWidth, clientHeight);
  canvas.parent("game");
  createLetterCards();
  createMatrix();
  computeMenuCardsXPositions();
  createMenuCards(squareSize);
}

windowResized = function () {
  clientWidth = window.innerWidth - 60;
  clientHeight = window.innerHeight - 100;
  resizeCanvas(clientWidth, clientHeight);
  computeMenuCardsXPositions();
  resizeMenuCards();
  letterMatrix.resize(clientWidth / 2, (clientHeight / 2) * matrixHeightRelative);
}

function saveArtWork() {
  resizeCanvas(clientWidth, clientHeight * matrixHeightRelative);
  saveCanvas('how to: Vera Molnar - ABC', 'jpg');
  resizeCanvas(clientWidth, clientHeight);
}

function draw() {
  background(255);
  drawLetterCards(squareSize);
  drawLetterMatrix();
  drawMenuCards();
}

function drawLetterMatrix() {
  letterMatrix.draw();
}

function objectTouched(x, y) {
  for (let menuCard of menuCards) {
    if (dist(x, y, menuCard.xCenter, menuCard.yCenter) <= menuCardSize / 2) {
      menuCard.isSelected = true;
      selectedCardIndex = menuCard.index;
      selectedIsLetterCard = false;
      return true;
    }
  }
  
  for (let letterCard of letterCards) {
    if (dist(x, y, letterCard.xCenter, letterCard.yCenter) <= squareSize / 2) {
      letterCard.isSelected = true;
      selectedCardIndex = letterCard.index;
      selectedIsLetterCard = true;
      return true;
    }
  }
  return false;
}

function touchStarted(){
  if (!lo.clicked) {
    touchStartX = mouseX;
    touchStartY = mouseY;
    somethingWasTouched = objectTouched(touchStartX, touchStartY);
    lo.clicked = true;
  }
    setTimeout(() => {
      lo.clicked = false;
    }, 500);
}

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

function touchMoved(){
  if (selectedIsLetterCard && dist(touchStartX, touchStartY, mouseX, mouseY) >= 10) {
    letterCards[selectedCardIndex].drag();
  }
}

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
    this.xCenter = xCenter;
    this.yCenter = yCenter;
    
    this.squareSize = 0;
    this.resize(xCenter, yCenter);
  }
  
  draw () {
    let matrixSpace = min(clientWidth - 60, (clientHeight - 120) * matrixHeightRelative);
    let x = this.xCenter - 0.5 * matrixSpace + 0.5 * squareSize;
    let y = this.yCenter - 0.5 * matrixSpace + 0.5 * squareSize;
    
    for (let i = 0; i < this.squaresY; i++) {
      x = this.xCenter - 0.5 * matrixSpace + 0.5 * squareSize;
      for (let j = 0; j < this.squaresX; j++) {
        strokeWeight(squareSize / 60);
        stroke(150);
        noFill();
        rect(x, y, squareSize, squareSize);
        x += squareSize;
      }
      y += squareSize;
    }
  }
  
  resize(newX, newY) {
    this.xCenter = newX;
    this.yCenter = newY;
    let matrixSpace = min(clientWidth - 60, (clientHeight - 120) * matrixHeightRelative);
    let maxSquares = max(this.squaresX, this.squaresY);
    squareSize = matrixSpace / maxSquares;
    let x = this.xCenter - 0.5 * matrixSpace + 0.5 * squareSize;
    let y = this.yCenter - 0.5 * matrixSpace + 0.5 * squareSize;
    for (let i = 0; i < this.squaresY; i++) {
      x = this.xCenter - 0.5 * matrixSpace + 0.5 * squareSize;
      for (let j = 0; j < this.squaresX; j++) {
        let index = i * this.squaresX + j;
        letterCards[index].xCenter = x;
        letterCards[index].yCenter = y;
        letterCards[index].tempX = x;
        letterCards[index].tempY = y;
        x += squareSize;
      }
      y += squareSize;
    }
  }
  
  checkForChange(letter, x, y, rotation) {
    for(let i = 0; i < letterCards.length; i++) {
      if (dist(x, y, letterCards[i].xCenter, letterCards[i].yCenter) <= squareSize / 2) {
        letterCards[i].setLetter(letter);
        letterCards[i].setRotation(rotation);
        break;
      }
    }
  }
  
  checkForChangeLetterCard(letter, x, y, rotation, originalCard) {
    for(let i = 0; i < letterCards.length; i++) {
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