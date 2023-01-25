//let width = 300;
//let height = 400;
let a = 30;
var outputframe;

let slider, slider2, slider3, slider4;

var canava;





function setup() {
  //createCanvas(windowWidth, windowHeight);
  
 canava = createCanvas(width, height);
 canava.parent("game-output")
  
  
 //slider 1 to adjust the line distance 
  slider = createSlider(0, 40, 0, 5);

  slider.addClass("slider");
  
  slider.hide(); 
  
 //slider 2 to adjust the character distance 
  slider2 = createSlider(0, 7, 0, 1);
 
  slider2.addClass("slider");
  
  slider2.hide(); 
    
 //slider 3 to adjust the crescendos 
  slider3 = createSlider(0, 28, 0, 1);
  
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
  
  stroke(val4,200,130);
  
  
//output
  
  for(n=a-10; n<height-(a+10); n+=val+43){
    
    beginShape();
    
    for (i = 0; i < width; i+=val2+8) {
    
      curveVertex(i,n+noise(i)*(val3+60));
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

  function download() {
  
      saveCanvas('myoutput.png');
    
  }

//function windowResized() {
  //resizeCanvas(windowWidth, windowHeight);
//}
