let dragging = false;
let selectedIndex = -1;
let dragabble = [];
const DRAG_SIZE = 20;

function addDrag(vec) {
  dragabble.push(vec);
}

function drawDrag() {
  for (let i = 0; i < dragabble.length; i++) {
    fill(selectedIndex == i ? color("#0092B1") : 255);
    circle(dragabble[i].x, dragabble[i].y, DRAG_SIZE);
  }
}

function dragTouchStarted() {
  findSelected();
}

function dragTouchEnded() {
  selectedIndex = -1;
}

function dragTouchMoved() {
  if (selectedIndex == -1) return;
  dragabble[selectedIndex].add(getMouseX() - getPmouseX(), getMouseY() - getPmouseY(), 0);
  console.log("Vertex %d changed to (%d, %d)",selectedIndex, dragabble[selectedIndex].x, dragabble[selectedIndex].y)
  if (selectedIndex == 0) {
    storeItem("1x", dragabble[selectedIndex].x)
    storeItem("1y", dragabble[selectedIndex].y)
  }
  if (selectedIndex == 1) {
    storeItem("2x", dragabble[selectedIndex].x)
    storeItem("2y", dragabble[selectedIndex].y)
  }
  if (selectedIndex == 2) {
    storeItem("4x", dragabble[selectedIndex].x)
    storeItem("4y", dragabble[selectedIndex].y)
  }
  if (selectedIndex == 3) {
    storeItem("3x", dragabble[selectedIndex].x)
    storeItem("3y", dragabble[selectedIndex].y)
  }
}


function findSelected() {
  selectedIndex = -1;
  let closest = 99999;
  const MIN_DIST = pow(DRAG_SIZE / 2, 2);
  let mX = getMouseX();
  let mY = getMouseY();
  for (let i = 0; i < dragabble.length; i++) {
    let distX = dragabble[i].x - mX;
    let distY = dragabble[i].y - mY;
    let distance = distX * distX + distY * distY;
    if (distance < closest && distance < MIN_DIST) {
      closest = distance;
      selectedIndex = i;
    }
  }
}

function getMouseX() {
  return mouseX - width / 2
}

function getMouseY() {
  return mouseY - height / 2;
}

function getPmouseX() {
  return pmouseX - width / 2; 
}

function getPmouseY() {
  return pmouseY - height / 2;
}