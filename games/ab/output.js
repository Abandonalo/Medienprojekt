//TODO: font, call saveArtWork function from --> button in final app

var myFont = 'Montserrat';
var canvas;
var clientWidth;
var clientHeight;
var matrixHeightRelative = 0.7;
var menuHeightRelative = 0.25;

//default, overwritten in setup, with locally stored values from screen 1
var cardsChoice = ["M", "L"];
//default, overwritten in setup, with locally stored values from screen 2
var matrixSize = [2, 2];

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

//retrieves locally stored variable values and fills all card-arrays and the matrix
function setup() {
  cardsChoice = getItem('abc_letterChoice');
  matrixSize = getItem('abc_matrixSize');
  clientWidth = windowWidth;
  clientHeight = windowHeight;
  createCanvas(clientWidth, clientHeight);
  
  createLetterCards();
  createMatrix();
  computeMenuCardsXPositions();
  createMenuCards();
}

//resizes canvas and every element on it
windowResized = function () {
  clientWidth = windowWidth;
  clientHeight = windowHeight;
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

//draws menucards
function drawMenuCards() {
  for(var menuCard of menuCards) {
    menuCard.draw();
  }
}

//draws lettercards
function drawLetterCards() {
  for(var letterCard of letterCards) {
    letterCard.draw();
  }
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

//creates the menucards
function createMenuCards() {
  menuCards = new Array(menuCardsXPositions.length);
  var x;
  menuCardsY = clientHeight - (clientHeight * menuHeightRelative) / 2;
  for(var i = 0; i < menuCardsXPositions.length; i++) {
    x = menuCardsXPositions[i];
    menuCards[i] = new MenuCard(cardsChoice[i], i);
  }
}

//creates the lettercards
function createLetterCards() {
  letterCards = new Array(matrixSize[0] * matrixSize[1]);
  for(var i = 0; i < matrixSize[0] * matrixSize[1]; i++) {
    letterCards[i] = new LetterCard("", true, i);
  }
}

//creates the matrix
function createMatrix() {
  letterMatrix = new LetterMatrix(clientWidth / 2, (clientHeight / 2) * matrixHeightRelative, matrixSize[0], matrixSize[1]);
}

//resizes the menucards
function resizeMenuCards() {
  for(var menuCard of menuCards) {
    menuCard.resize();
  }
}

//computes the x positions of the menucards and stores them in menuCardsXPositions[]
function computeMenuCardsXPositions() {
  var numCards = cardsChoice.length;
  menuCardsXPositions = new Array(numCards);
  //var maxHeight = min(clientHeight * menuHeightRelative, squareSize);
  var maxHeight = clientHeight * menuHeightRelative;
  var outerBuffer = 60;
  var minInnerBuffer = (numCards - 1) * 20;
  var maxWidth = (clientWidth - outerBuffer - minInnerBuffer) / numCards;
  menuCardSize = min(maxWidth, maxHeight);
  var innerBuffer = 0;
  if (numCards > 1) {
    innerBuffer = clientWidth - (numCards * menuCardSize) - outerBuffer;
    innerBuffer = innerBuffer / (numCards - 1);
  } else {
    outerBuffer = (clientWidth - menuCardSize);
  }
  
  for (var i = 0; i < numCards; i++) {
    menuCardsXPositions[i] = 0.5 * outerBuffer + i * innerBuffer + i * menuCardSize + menuCardSize / 2;
  }
}



//cards to select from at the bottom of the screen, can be dragged onto the matrix to fill it
class MenuCard {
  constructor (letter, index) {
    this.index = index;
    this.letter = letter;
    
    this.xCenter = 0;
    this.yCenter = 0;
    this.size = 0;
    
    this.tempX = 0;
    this.tempY = 0;
    
    this.isSelected = false;
    this.resize();
  }
  
  draw() {
    if(this.isSelected) {
      this.drag();
    }
    noStroke();
    fill(252, 252, 247);
    rectMode(CENTER);
    rect(this.tempX, this.tempY, this.size, this.size);
    noStroke();
    textAlign(CENTER);
    textFont(myFont);
    textStyle(BOLD);
    textSize(this.size * 1.4275);
    fill(0);
    text(this.letter, this.tempX, this.tempY + (this.size / 2));
    noFill();
    stroke(150);
    strokeWeight(this.size / 80);
    rectMode(CENTER);
    rect(this.tempX, this.tempY, this.size, this.size);
  }
  
  drag () {
    this.tempX = mouseX;
    this.tempY = mouseY;
  }
  
  touchEnded() {
    letterMatrix.checkForChange(this.letter, this.tempX, this.tempY, 0);
    this.tempX = this.xCenter;
    this.tempY = this.yCenter;
  }
  
  resize() {
    this.xCenter = menuCardsXPositions[this.index];
    this.yCenter = menuCardsY;
    this.size = menuCardSize;
    
    this.tempX = this.xCenter;
    this.tempY = this.yCenter;
    
    this.isSelected = false;
  }
  
}



//cards that are positioned within the matrix, can be empty, can be rotated and moved
class LetterCard {
  constructor (letter, isEmpty, index) {
    this.xCenter = 0;
    this.yCenter = 0;
    
    this.tempX = 0;
    this.tempY = 0;
    
    this.isDraggable = true;
    this.isRotatable = true;
    
    this.isSelected = false;
    
    this.isEmpty = isEmpty;
    this.letter = "M";
    this.index = index;
    
    this.angle = 0;
    
    if(!isEmpty) {
      this.letter = letter;
    } else {
      this.isDraggable = false;
      this.isRotatable = false;
    }
    
    this.dragging = false;
  }
  
  draw() {
    fill(252, 252, 247);
    rectMode(CENTER);
    rect(this.xCenter, this.yCenter, squareSize, squareSize);
    if (!this.isEmpty) {
      textAlign(CENTER);
      textFont(myFont);
      textStyle(BOLD);
      textSize(squareSize * 1.4275);
      fill(0);
      push();
      translate(this.xCenter, this.yCenter);
      angleMode(DEGREES);
      rotate(this.angle);
      text(this.letter, 0, (squareSize / 2));
      pop();
    }
    
  }
  
  drag () {
    this.dragging = true;
    if(this.isDraggable) {
      this.tempX = mouseX;
      this.tempY = mouseY;
    }
  }
  
  rotate() {
    if(this.isRotatable) {
      if(this.angle >= 270) {
        this.angle = 0;
      } else{
        this.angle += 90;
      }
    }
  }
  
  touchEnded() {
    if(this.dragging) {
      this.dragging = false;
      this.snapTo();
    } else {
      this.rotate();
    }
    
  }
  
  changeTo(isEmpty, letter) {
    if(isEmpty) {
      this.setEmpty();
    } else {
      this.setLetter(letter);
    }
    this.tempX = xCenter;
    this.tempY = yCenter;
  }
  
  setEmpty() {
    this.isEmpty = true;
    this.isDraggable = false;
    this.isRotatable = false;
    this.angle = 0;
  }
  
  setLetter(letter) {
    this.letter = letter
    this.isEmpty = false;
    this.isDraggable = true;
    this.isRotatable = true;
  }
  
  setRotation(degree) {
    this.angle = degree;
  }
  
  //when dragging of this card stopped:
  //sets itsself empty
  //then calls function in letterMatrix that computes if it is in an OK position
  //(then the lettercard there is changed to hold the new letter)
  snapTo() {
    if(!this.isEmpty) {
      var saveLetter = this.letter;
      var saveX = this.tempX;
      var saveY = this.tempY;
      var saveRotation = this.angle;
      this.setEmpty();
      letterMatrix.checkForChange(saveLetter, saveX, saveY, saveRotation);
    }
  }
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
}