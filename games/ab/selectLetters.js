//TODOS: font
var myFont = 'Montserrat';

let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

//default selection: M, L
var useDefaultSelection = true;
//maximum choice: 4 letters
let maxLetterChoice = 4; //!!! TODO !!! ?

var choiceCount = 0;
var isSelected = new Array(26);

var clientWidth, clientHeight;

var lettersXPositions = new Array(26);
var lettersYPositions = new Array(26);

var lettersPerRow, letterSize;

//TODO: in app remove button (just for test purposes and call choice to array from -->)

function setup() {
  clientWidth = windowWidth;
  clientHeight = windowHeight;
  createCanvas(clientWidth, clientHeight);
  
  var nextButton = createButton('-->');
  nextButton.position(300,700);
  nextButton.mousePressed(choiceToArray);
  
  fillIsSelected();
  if (useDefaultSelection) {
    setDefault();
  }
  
  getOptimalLayout();
  fillPositions();
}

//updates canvas size and positions of the letters on the canvas when the window gets resized
windowResized = function () {
    clientWidth = windowWidth;
    clientHeight = windowHeight;
    resizeCanvas(clientWidth, clientHeight);
    getOptimalLayout();
    fillPositions();
}

function draw() {
  drawLetters();
}

//returns the current choice of letters as an array by using the isSelected array to determine said letters. Checks for empty choice. Stores choice locally in 'abc_letterChoice'
//!!! if choice is empty, no choice is stored --> needs to be checked before moving on !!!!
function choiceToArray() {
  if(choiceCount <= 0) {
    console.log("choice must not be empty!"); //TODO remove when finished, only for testing
    return;
  }
  var choice = new Array(choiceCount);
  var alreadyFound = 0;
  for (var i = 0; i < letters.length; i++) {
    if (isSelected[i]) {
      choice[alreadyFound] = letters[i];
      alreadyFound++;
    }
  }
  storeItem('abc_letterChoice', choice);
}

//fills the array with the (default) value -->false at every position
function fillIsSelected() {
   for (var i = 0; i <= 25; i++) {
     isSelected[i] = false;
   }
 }

//updates the value for the L and the M in selection to true --> default selection
function setDefault() {
  isSelected[11] = true;
  isSelected[12] = true;
  choiceCount = 2;
}

//computes optimal layout and stores size, number of rows and letters per row
function getOptimalLayout() {
  var bestI = 3;
  var bestSize = 0;
  var size;
  var rows;
  for (var i = 3; i <= 8; i ++) {
    rows = ceil(26 / i);
    size = min (clientWidth / i, clientHeight / rows);
    if(size > bestSize) {
      bestI = i;
      bestSize = size;
    }
  }
  lettersPerRow = bestI;
  letterSize = bestSize;
}

//computes the coordinates of the letters and stores them in an array for x or y positions
function fillPositions() {
  letterRows = ceil(26 / lettersPerRow);
  for (var i = 0; i < letterRows; i++) {
    for (var j = 0; j < lettersPerRow; j++) {
      if((i * lettersPerRow + j) >= 26) {
        break;
      }
      lettersXPositions[i * lettersPerRow + j] = letterSize / 2 + letterSize * j;
      lettersYPositions[i * lettersPerRow + j] = letterSize / 2 + letterSize * i;
    }
  }
}

//draws the letters
function drawLetters() {
  textFont(myFont);
  textAlign(CENTER, CENTER);
  textSize(letterSize / 1.5);
  textStyle(BOLD);
  noStroke();
  for (var i = 0; i < 26; i++) {
    fill('grey');
    if(isSelected[i]) {
      fill('black');
    }
    text(letters[i], lettersXPositions[i], lettersYPositions[i]);
  }
}

//checks if a letter is clicked
function touchStarted(){
  for(var i = 0; i < letters.length; i++) {
    if (dist(mouseX, mouseY, lettersXPositions[i], lettersYPositions[i]) <= letterSize * 0.45) {
      updateSelection(i);
    }
  }
}

//updates the selection for a given letter (by index) called when letter is clicked
//only selects letter when selection is not already full
//    index: position (index) of the letter that should be updated in the letter- and isSelected-array
function updateSelection(index) {
  if(choiceCount >= maxLetterChoice && !isSelected[index]) {
    return;
  }
  isSelected[index] = !isSelected[index];
  if (isSelected[index]) {
    choiceCount++;
  } else {
    choiceCount--;
  }
}
    