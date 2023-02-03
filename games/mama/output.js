let a = 30;
var outputframe;
let slider;
var canava;

function setup() {
  clientWidth = window.innerWidth - 95;
  clientHeight = window.innerHeight - 290;
  canava = createCanvas(clientWidth, clientHeight);
  canava.parent("game");

  points = getItem("pointsarray");
  print(points);

  //slider 1 to adjust the line distance
  slider = createSlider(-200, 200, 0, 5);
  slider.addClass("slider");
  slider.hide();

  //slider 2 to adjust the character distance
  slider2 = createSlider(-200, 200, 0, 1);
  slider2.addClass("slider");
  slider2.hide();

  //slider 3 to adjust the crescendos
  slider3 = createSlider(-30, 30, 0, 1);
  slider3.addClass("slider");
  slider3.hide();

  //slider 4 to adjust the colors;
  colorMode(HSB);
  slider4 = createSlider(0, 360, 0, 10);
  slider4.addClass("slider");
  slider4.hide();
}

function draw() {
  background(255);
  strokeWeight(1.8);

  //slider 1 value
  let val = slider.value();
  //slider 2 value
  let val2 = slider2.value();
  //slider 3 value
  let val3 = slider3.value();
  //slider 4 value
  let val4 = slider4.value();
  stroke(val4, 200, 130);

  //output
  for (n = points[0].x - height; n < height; n += 50 + val3) {
    beginShape();

    for (i = 0; i < points.length; i++) {
      if (points[i].usepoint) {
        curveVertex(points[i].x + val2, points[i].y + n + val);
      }
    }
    endShape();
  }
}

function changecolor() {
  slider.hide();
  slider2.hide();
  slider3.hide();
  slider4.show();
}

function changeline() {
  slider.show();
  slider2.hide();
  slider3.hide();
  slider4.hide();
}

function changecha() {
  slider.hide();
  slider3.hide();
  slider4.hide();
  slider2.show();
}

function changecre() {
  slider.hide();
  slider2.hide();
  slider4.hide();
  slider3.show();
}

function saveArtwork() {
  saveCanvas(canvas, "howTo-meinSchriftbild", "jpg");
}

/*function sliderrestart(){
  setup();
  }*/
