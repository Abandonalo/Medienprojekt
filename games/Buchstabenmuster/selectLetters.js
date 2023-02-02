//TODOS: font
var myFont = 'Montserrat';

//let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

let lettersToUse = ['C', 'E', 'F', 'H', 'I', 'K', 'L', 'M', 'N', 'O', 'S', 'T', 'U', 'V', 'Y', 'Z'];
var selectedLetters;
var unselectedLetters;

//default selection: M, L
let defaultSelection = ['L', 'M'];
let useDefaultSelection = true;
//maximum choice: 4 letters
let maxLetterChoice = 4; //!!! TODO !!! ?

var choiceCount = 0;
var isSelected;

var clientWidth, clientHeight;

var lettersXPositions;
var lettersYPositions;

var lettersPerRow, letterSize;
let lo = {"clicked" : false};


function preload() {
  var img_name1 = 'games/SVGs/selected/';
  var img_name3 = '.svg';
  var lettersInTotal = lettersToUse.length;
  isSelected = new Array(lettersInTotal);
  lettersXPositions = new Array(lettersInTotal);
  lettersYPositions = new Array(lettersInTotal);
  selectedLetters = new Array(lettersInTotal);
  unselectedLetters = new Array(lettersInTotal);
  
  loadSVGs();
  
  /* //geht leide nicht :/
  for (var i = 0; i < lettersInTotal; i++) {
    var imgName = img_name1 + lettersToUse[i] + img_name3;
    print(imgName);
    selectedLetters[i] = loadImage(imgName.toString());
    //unselectedLetters[i] = loadImage(imgName);
    //selectedLetters[i] = loadImage('SVGs/selected/C.svg');
    //selectedLetters[i] = loadImage("SVGs/selected/" + lettersToUse[i].toString() + ".svg");
    
    unselectedLetters[i] = loadImage('SVGs/selected/C.svg');
  }*/
    
}

function setup() {
  clientWidth =  window.innerWidth - 60;
  clientHeight = window.innerHeight - 60;
  canvas = createCanvas(clientWidth, clientHeight);
  canvas.parent("game");
  
  fillIsSelected();
  if (useDefaultSelection) {
    setDefault();
  }
  
  getOptimalLayout();
  fillPositions();
}

//updates canvas size and positions of the letters on the canvas when the window gets resized
windowResized = function () {
    clientWidth =  window.innerWidth - 60;
    clientHeight = window.innerHeight - 60;
    resizeCanvas(clientWidth, clientHeight);
    getOptimalLayout();
    fillPositions();
}

function draw() {
  background(255);
  drawLetters();
}

//returns the current choice of letters as an array by using the isSelected array to determine said letters. Stores choice locally in 'abc_letterChoice'
function choiceToArray() {
  if(choiceCount <= 0) {
    console.log("ERROR: choice should not be empty"); //TODO remove when finished, only for testing
    return;
  }
  var choice = new Array(choiceCount);
  var alreadyFound = 0;
  for (var i = 0; i < lettersToUse.length; i++) {
    if (isSelected[i]) {
      choice[alreadyFound] = i;
      alreadyFound++;
    }
  }
  //print("choice: " + choice);
  console.log("choice: " + choice);
  storeItem('abc_letterChoiceIndeces', choice);
}

//fills the array with the (default) value --> false at every position
function fillIsSelected() {
  for (var i = 0; i <= lettersToUse.length; i++) {
    isSelected[i] = false;
  }
}

//updates the value for the L and the M in selection to true --> default selection
function setDefault() {
  /*isSelected[11] = true;
  isSelected[12] = true;
  choiceCount = 2;*/
  if(defaultSelection == null || defaultSelection.length <= 0) {
    return;
  }
  for (var i = 0; i < defaultSelection.length; i++) {
    setDefaultLetter(defaultSelection[i]);
  }
  
}

function setDefaultLetter(letter) {
  for (var i = 0; i < lettersToUse.length; i++) {
    if(letter == lettersToUse[i]) {
      isSelected[i] = true;
      choiceCount++;
    }
  }
  
}

//computes optimal layout and stores size, number of rows and letters per row
function getOptimalLayout() {
  var bestI = 1;
  var bestSize = 0;
  var size;
  var rows;
  for (var i = 1; i <= lettersToUse.length; i ++) {
    rows = ceil(lettersToUse.length / i);
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
  letterRows = ceil(lettersToUse.length / lettersPerRow);
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
  imageMode(CENTER);
  for (var i = 0; i < lettersToUse.length; i++) {
    fill('grey');
    image(unselectedLetters[i], lettersXPositions[i], lettersYPositions[i], letterSize / 1.5, letterSize / 1.5);
    if(isSelected[i]) {
      image(selectedLetters[i], lettersXPositions[i], lettersYPositions[i], letterSize / 1.5, letterSize / 1.5);
      fill('black');
    }
  }
}

//checks if a letter is clicked
function touchStarted(){
  for(var i = 0; i < lettersToUse.length; i++) {
    if (dist(mouseX, mouseY, lettersXPositions[i], lettersYPositions[i]) <= letterSize * 0.45 
          && !lo.clicked) {
      updateSelection(i);
      lo.clicked = true;
    }
    setTimeout(() => {
      lo.clicked = false
    }, 500)
  }
}

//updates the selection for a given letter (by index) called when letter is clicked
//only selects letter when selection is not already full
//    index: position (index) of the letter that should be updated in the letter- and isSelected-array
function updateSelection(index) {
  if(choiceCount >= maxLetterChoice && !isSelected[index] || choiceCount <= 1 && isSelected[index]) {
    return;
  }
  isSelected[index] = !isSelected[index];
  if (isSelected[index]) {
    choiceCount++;
  } else {
    choiceCount--;
  }
}

function loadSVGs() {
  selectedLetters[0] = loadImage('games/Buchstabenmuster/SVGs/C.svg');
  selectedLetters[1] = loadImage('games/Buchstabenmuster/SVGs/E.svg');
  selectedLetters[2] = loadImage('games/Buchstabenmuster/SVGs/F.svg');
  selectedLetters[3] = loadImage('games/Buchstabenmuster/SVGs/H.svg');
  selectedLetters[4] = loadImage('games/Buchstabenmuster/SVGs/I.svg');
  selectedLetters[5] = loadImage('games/Buchstabenmuster/SVGs/K.svg');
  selectedLetters[6] = loadImage('games/Buchstabenmuster/SVGs/L.svg');
  selectedLetters[7] = loadImage('games/Buchstabenmuster/SVGs/M.svg');
  selectedLetters[8] = loadImage('games/Buchstabenmuster/SVGs/N.svg');
  selectedLetters[9] = loadImage('games/Buchstabenmuster/SVGs/O.svg');
  selectedLetters[10] = loadImage('games/Buchstabenmuster/SVGs/S.svg');
  selectedLetters[11] = loadImage('games/Buchstabenmuster/SVGs/T.svg');
  selectedLetters[12] = loadImage('games/Buchstabenmuster/SVGs/U.svg');
  selectedLetters[13] = loadImage('games/Buchstabenmuster/SVGs/V.svg');
  selectedLetters[14] = loadImage('games/Buchstabenmuster/SVGs/Y.svg');
  selectedLetters[15] = loadImage('games/Buchstabenmuster/SVGs/Z.svg');
  
  unselectedLetters[0] = loadImage('games/Buchstabenmuster/SVGs/unselected/C.svg');
  unselectedLetters[1] = loadImage('games/Buchstabenmuster/SVGs/unselected/E.svg');
  unselectedLetters[2] = loadImage('games/Buchstabenmuster/SVGs/unselected/F.svg');
  unselectedLetters[3] = loadImage('games/Buchstabenmuster/SVGs/unselected/H.svg');
  unselectedLetters[4] = loadImage('games/Buchstabenmuster/SVGs/unselected/I.svg');
  unselectedLetters[5] = loadImage('games/Buchstabenmuster/SVGs/unselected/K.svg');
  unselectedLetters[6] = loadImage('games/Buchstabenmuster/SVGs/unselected/L.svg');
  unselectedLetters[7] = loadImage('games/Buchstabenmuster/SVGs/unselected/M.svg');
  unselectedLetters[8] = loadImage('games/Buchstabenmuster/SVGs/unselected/N.svg');
  unselectedLetters[9] = loadImage('games/Buchstabenmuster/SVGs/unselected/O.svg');
  unselectedLetters[10] = loadImage('games/Buchstabenmuster/SVGs/unselected/S.svg');
  unselectedLetters[11] = loadImage('games/Buchstabenmuster/SVGs/unselected/T.svg');
  unselectedLetters[12] = loadImage('games/Buchstabenmuster/SVGs/unselected/U.svg');
  unselectedLetters[13] = loadImage('games/Buchstabenmuster/SVGs/unselected/V.svg');
  unselectedLetters[14] = loadImage('games/Buchstabenmuster/SVGs/unselected/Y.svg');
  unselectedLetters[15] = loadImage('games/Buchstabenmuster/SVGs/unselected/Z.svg');
}
    