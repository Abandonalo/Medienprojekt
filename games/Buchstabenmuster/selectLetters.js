var myFont = 'Montserrat';

//let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

let lettersToUse = ['C', 'E', 'F', 'H', 'I', 'K', 'L', 'M', 'N', 'O', 'S', 'T', 'U', 'V', 'Y', 'Z'];
var selectedLetters;
var unselectedLetters;

let defaultSelection = ['L', 'M'];
let useDefaultSelection = false;
let maxLetterChoice = 4;

//var choiceCount = 0;
//var isSelected;
let abc_choiceManager;

var clientWidth, clientHeight;

var lettersXPositions;
var lettersYPositions;

var lettersPerRow, letterSize;
let lo = {"clicked" : false};


function abcLetters_restart() {
  choiceCount = 0;
  //fillIsSelected();
  if (useDefaultSelection) {
    setDefault();
  }
}

function preload() {
  var lettersInTotal = lettersToUse.length;
  isSelected = new Array(lettersInTotal);
  lettersXPositions = new Array(lettersInTotal);
  lettersYPositions = new Array(lettersInTotal);
  selectedLetters = new Array(lettersInTotal);
  unselectedLetters = new Array(lettersInTotal);
  
  loadSVGs();
  /* //geht leider nicht :(
  var img_name1 = 'games/Buchstabenmuster/SVGs/selected/';
  var img_name3 = '.svg';
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
  
  /*fillIsSelected();
  if (useDefaultSelection) {
    setDefault();
  }*/

  abc_choiceManager = new choiceManager(maxLetterChoice);
  
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
function storeChoice() {
  /*if(choiceCount <= 0) {
    console.log("ERROR: impossible case - choice should not be empty");
    //throw Error("impossible case - choice should not be empty");
  }*/
  /*if (choiceCount <= 0) {
    console.log("choice is empty !!!");
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
  console.log("choice: " + choice);
  storeItem('abc_letterChoiceIndeces', choice);*/
  abc_choiceManager.storeSelection(true);
}

//fills the array with the (default) value --> false at every position
/*function fillIsSelected() {
  for (var i = 0; i <= lettersToUse.length; i++) {
    isSelected[i] = false;
  }
}*/

//updates the value for the L and the M in selection to true --> default selection
function setDefault() {
  if(defaultSelection == null || defaultSelection.length <= 0) {
    return;
  }
  /*for (var i = 0; i < defaultSelection.length; i++) {
    setDefaultLetter(defaultSelection[i]);
  }*/
  //return isSelected;
  abc_choiceManager.setDefaultSelection(defaultSelection);
}

/*function setDefaultLetter(letter) {
  for (var i = 0; i < lettersToUse.length; i++) {
    if(letter == lettersToUse[i]) {
      isSelected[i] = true;
      choiceCount++;
    }
  }
  
}*/

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
  /*for (var i = 0; i < lettersToUse.length; i++) {
    if(isSelected[i]) {
      image(selectedLetters[i], lettersXPositions[i], lettersYPositions[i], letterSize / 1.5, letterSize / 1.5);
    } else {
      image(unselectedLetters[i], lettersXPositions[i], lettersYPositions[i], letterSize / 1.5, letterSize / 1.5);
    }
  }*/
  for (var i = 0; i < lettersToUse.length; i++) {
    if(abc_choiceManager.isSelected(i)) {
      image(selectedLetters[i], lettersXPositions[i], lettersYPositions[i], letterSize / 1.5, letterSize / 1.5);
    } else {
      image(unselectedLetters[i], lettersXPositions[i], lettersYPositions[i], letterSize / 1.5, letterSize / 1.5);
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
  /*if(choiceCount >= maxLetterChoice && !isSelected[index]) { // || choiceCount <= 1 && isSelected[index] //TODO decide whether it is ok to deselect everything or not!!!
    return;
  }
  isSelected[index] = !isSelected[index];
  if (isSelected[index]) {
    choiceCount++;
  } else {
    choiceCount--;
  }*/
  abc_choiceManager.updateSelection(index);
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



class ChoiceQueue {
  constructor (maxElements) {
    this.items = [];
    this.maxElements = maxElements;
  }

  enqueue(element) {
    if(this.items.length >= this.maxElements) {
      this.items.shift();
    }
    this.items.push(element);
  }

  /*dequeue() {
    return this.items.shift();
  }*/

  isEmpty() {
    if (this.items.length > 0) {
      return false;
    }
    console.log("choice is empty!!!");
    return true;
  }

  //we are only working with integers here !!!
  includes(element) {
    return this.items.includes(element);
  }

  remove(element) {
    if(this.includes(element)){
      this.items.splice(this.items.indexOf(element), 1);
      return true;
    }
    return false;
  }

  size() {
    return this.items.length;
  }

  toArray() {
    return this.items;
  }
}

class choiceManager{
  constructor(maxElements) {
    this.choice = new ChoiceQueue(maxElements);
  }

  updateSelection(index) {
    if(this.choice.includes(index)) {
      this.choice.remove(index);
    } else {
      this.choice.enqueue(index);
    }
  }

  //please note that if defaultSelection.length is larger than maxChoiceCount the first default-elements will not be selected!!!
  createDefaultSelection(defaultSelection) {
    for (defaultIndex of defaultSelection) {
      updateSelection(defaultSelection);
    }
  }

  storeSelection(checkForEmpty) {
    
    if(checkForEmpty && this.choice.isEmpty()) {
      console.log("choice should not be stored!!!");
      if(getItem('abc_letterChoiceIndeces') != null) {
        removeItem('abc_letterChoiceIndeces')
      }
      return;
    }
    storeItem('abc_letterChoiceIndeces', this.choice.toArray());
  }

  getSelection() {
    return this.choice.toArray();
  }

  emptySelection() {
    this.choice = new ChoiceQueue(maxElements);
  }

  isSelected(index) {
    return this.choice.includes(index);
  }
}
    