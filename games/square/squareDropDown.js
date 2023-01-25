let sel_1, sel_2, sel_3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255)
  noLoop()
}

function draw() {
  
  textAlign(CENTER);
  textSize(35) 
  textStyle(BOLD)
  fill("#0092B1")
  
  text("Bitte ausfüllen:", width/2, height/7)
  
  textSize(20)
  text("Die einzelnen Formen sollen", width/2, height/4)
  text("von einander", width*0.64, height/3.3)
  text("abweichen.", width/2, height/2.8)
  sel_1 = createSelect();
  sel_1.option('wählen');
  sel_1.disable('wählen');
  sel_1.selected('wählen');
  sel_1.option('stark');
  sel_1.option('wenig');
  sel_1.position(width*0.64 - 180, height/3.5 - 4)
  sel_1.size(110)
  sel_1.changed(storeData);
  
  
  text("Die erste Ebene besteht aus", width/2, height/2.2)
  text("Vierecken.", 2*width / 3 - 10, height/1.95)

  sel_2 = createSelect();
  sel_2.option('wählen');
  sel_2.disable('wählen');
  sel_2.selected('wählen');
  sel_2.option('quadratischen');
  sel_2.option('verzerrten');
  sel_2.position(2*width / 3 - 180, height/2 - 8)
  sel_2.size(110)
  sel_2.changed(storeData);
  
  
  text("Das Bild ist", width/3, height/1.6)
  sel_3 = createSelect();
  sel_3.option('wählen');
  sel_3.disable('wählen');
  sel_3.selected('wählen');
  sel_3.option('farbig');
  sel_3.option('schwarz-weiß');
  sel_3.position(width/3 + 70, height/1.6 - 18)
  sel_3.size(110)
  sel_3.changed(storeData);
}


function storeData() {
  storeItem("form", sel_1.value())
  storeItem("layer", sel_2.value())
  storeItem("color", sel_3.value())
} 

