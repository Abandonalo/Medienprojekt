const lettersToUse = ['C', 'E', 'F', 'H', 'I', 'K', 'L', 'M', 'N', 'O', 'S', 'T', 'U', 'V', 'Y', 'Z'];
let selectedLetters;
let unselectedLetters;

const defaultSelection = [7, 6]; //M and L
const useDefaultSelection = false;
const maxLetterChoice = 4;

let abc_choiceManager;

let clientWidth, clientHeight;

let lettersXPositions;
let lettersYPositions;

let lettersPerRow, letterSize;
let touchIsInProcess = false;
let pathToSVGs = "game/SVGs";


function abcLetters_restart() {
  abc_choiceManager.emptySelection(maxLetterChoice);
  if (useDefaultSelection) {
    setDefault();
  }
}

function preload() {
  abc_choiceManager = new choiceManager(maxLetterChoice);

  let lettersInTotal = lettersToUse.length;
  isSelected = new Array(lettersInTotal);
  lettersXPositions = new Array(lettersInTotal);
  lettersYPositions = new Array(lettersInTotal);
  selectedLetters = new Array(lettersInTotal);
  unselectedLetters = new Array(lettersInTotal);
  
  loadSVGs();
}

function setup() {
  clientWidth =  window.innerWidth - 60;
  clientHeight = window.innerHeight - 60;
  canvas = createCanvas(clientWidth, clientHeight);
  canvas.parent("game");
  if (useDefaultSelection) {
    setDefault();
  }
  getOptimalLayout();
  fillPositions();
}

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

function storeChoice() {
  abc_choiceManager.storeSelection(true);
}

function setDefault() {
  if(defaultSelection == null || defaultSelection.length <= 0) {
    return;
  }
  abc_choiceManager.setDefaultSelection(defaultSelection);
}

function getOptimalLayout() {
  let bestI = 1;
  let bestSize = 0;
  let size;
  let rows;
  for (let i = 1; i <= lettersToUse.length; i ++) {
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

function fillPositions() {
  letterRows = ceil(lettersToUse.length / lettersPerRow);
  for (let i = 0; i < letterRows; i++) {
    for (let j = 0; j < lettersPerRow; j++) {
      if((i * lettersPerRow + j) >= 26) {
        break;
      }
      lettersXPositions[i * lettersPerRow + j] = letterSize / 2 + letterSize * j;
      lettersYPositions[i * lettersPerRow + j] = letterSize / 2 + letterSize * i;
    }
  }
}

function drawLetters() {
  imageMode(CENTER);
  for (let i = 0; i < lettersToUse.length; i++) {
    if(abc_choiceManager.isSelected(i)) {
      image(selectedLetters[i], lettersXPositions[i], lettersYPositions[i], letterSize / 1.5, letterSize / 1.5);
    } else {
      image(unselectedLetters[i], lettersXPositions[i], lettersYPositions[i], letterSize / 1.5, letterSize / 1.5);
    }
  }
}

function touchStarted(){
  for(let i = 0; i < lettersToUse.length; i++) {
    if (dist(mouseX, mouseY, lettersXPositions[i], lettersYPositions[i]) <= letterSize * 0.45 
          && !touchIsInProcess) {
      updateSelection(i);
      touchIsInProcess = true;
    }
    setTimeout(() => {
      touchIsInProcess = false
    }, 500);
  }
}

function updateSelection(index) {
  abc_choiceManager.updateSelection(index);
}

function loadSVGs() {
  for(var i = 0; i < lettersToUse.length; i++) {
    selectedLetters[i] = loadImage(pathToSVGs + "/" + lettersToUse[i] + ".svg");
    unselectedLetters[i] = loadImage(pathToSVGs + "/unselected/" + lettersToUse[i] + ".svg");
  }
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

  removeAll() {
    this.items = [];
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

  //please note that if defaultSelection.length is larger than maxChoiceCount the first default-elements will not be selected
  setDefaultSelection(defaultSelection) {
    for (let defaultIndex of defaultSelection) {
      updateSelection(defaultIndex);
    }
  }

  storeSelection(checkForEmpty) {
    if(checkForEmpty && this.choice.isEmpty()) {
      console.log("choice should not be stored!!!");
      if(getItem('abc_letterChoiceIndeces') != null) {
        removeItem('abc_letterChoiceIndeces');
      }
      return;
    }
    storeItem('abc_letterChoiceIndeces', this.choice.toArray());
  }

  getSelection() {
    return this.choice.toArray();
  }

  emptySelection() {
    this.choice.removeAll();
  }

  isSelected(index) {
    return this.choice.includes(index);
  }
}
    