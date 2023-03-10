function createMenuCards() {
  if (menuCardsXPositions.length <= 1) {
    menuCards = [];
    console.log("no menuCards");
    return;
  }
  menuCards = new Array(menuCardsXPositions.length);
  let x;
  menuCardsY = clientHeight - (clientHeight * menuHeightRelative) / 2;
  for(let i = 0; i < menuCardsXPositions.length; i++) {
    x = menuCardsXPositions[i];
    menuCards[i] = new MenuCard(letterImages[choiceIndeces[i]], i);
  }
}

function resizeMenuCards() {
  for(let menuCard of menuCards) {
    menuCard.resize();
  }
}

function drawMenuCards() {
  for(let menuCard of menuCards) {
    menuCard.draw();
  }
}

function computeMenuCardsXPositions() {
  let numCards = choiceIndeces.length;
  menuCardsXPositions = new Array(numCards);
  let maxHeight = min(clientHeight * menuHeightRelative, squareSize);
  let outerBuffer = 60;
  let minInnerBuffer = (numCards - 1) * 20;
  let maxWidth = (clientWidth - outerBuffer - minInnerBuffer) / numCards;
  menuCardSize = min(maxWidth, maxHeight);
  let innerBuffer = 0;
  if (numCards > 1) {
    innerBuffer = clientWidth - (numCards * menuCardSize) - outerBuffer;
    innerBuffer = innerBuffer / (numCards - 1);
  } else {
    outerBuffer = (clientWidth - menuCardSize);
  }
  
  for (let i = 0; i < numCards; i++) {
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
    imageMode(CENTER);
    image(this.letter, this.tempX, this.tempY, this.size, this.size);
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