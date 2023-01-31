//creates the lettercards
function createLetterCards() {
  letterCards = new Array(matrixSize[0] * matrixSize[1]);
  for(var i = 0; i < matrixSize[0] * matrixSize[1]; i++) {
    letterCards[i] = new LetterCard(letterImages[choiceIndeces[0]], i);
  }
}


//draws lettercards
function drawLetterCards() {
  for(var letterCard of letterCards) {
    letterCard.draw();
  }
}

//cards that are positioned within the matrix, can be empty, can be rotated and moved
class LetterCard {
  constructor (letter, index) {
    this.xCenter = 0;
    this.yCenter = 0;
    
    this.tempX = 0;
    this.tempY = 0;
    
    this.isSelected = false;
    
    this.letter = letter;
    this.index = index;
    
    this.angle = 0;
    
    this.dragging = false;
  }
  
  draw() {
    fill(252, 252, 247);
    rectMode(CENTER);
    rect(this.xCenter, this.yCenter, squareSize, squareSize);
    /*textAlign(CENTER);
    textFont(myFont);
    textStyle(BOLD);
    textSize(squareSize * 1.4275);
    fill(0);*/
    push();
    translate(this.xCenter, this.yCenter);
    angleMode(DEGREES);
    rotate(this.angle);
    //text(this.letter, 0, (squareSize / 2));
    imageMode(CENTER);
    image(this.letter, 0, 0, squareSize, squareSize);
    pop();
  }
  
  drag () {
    this.dragging = true;
    this.tempX = mouseX;
    this.tempY = mouseY;
  }
  
  rotate() {
    if(this.angle >= 270) {
      this.angle = 0;
    } else{
      this.angle += 90;
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
  
  changeTo(letter) {
    this.setLetter(letter);
    this.tempX = xCenter;
    this.tempY = yCenter;
  }
  
  setLetter(letter) {
    this.letter = letter
  }
  
  setRotation(degree) {
    this.angle = degree;
  }
  
  //when dragging of this card stopped:
  //sets itsself empty
  //then calls function in letterMatrix that computes if it is in an OK position
  //(then the lettercard there is changed to hold the new letter)
  snapTo() {
    var saveLetter = this.letter;
    var saveX = this.tempX;
    var saveY = this.tempY;
    var saveRotation = this.angle;
    this.setLetter(letterImages[choiceIndeces[0]]);
    letterMatrix.checkForChangeLetterCard(saveLetter, saveX, saveY, saveRotation, this);
  }
}