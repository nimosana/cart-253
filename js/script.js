/**
 * Cart 253 Experimenting project
 * Nicolas Morales-Sanabria
 * 
 * This is a template. A bunch of shapes with basic commands
 * 
 */

"use strict";
var canvasWidth = 500;
var canvasHeight = canvasWidth;
var squareDims = canvasHeight / 2;
var pointThicc = 20;
var strokeValue;
var stateChange = True;

/**
 * Description of preload
*/
function preload() {

}


/**
 * Description of setup
*/
function setup() {

    createCanvas(canvasWidth, canvasHeight);
    background(255, 0, 0, 125);

    strokeValue = 10;
    strokeWeight(strokeValue);
    stroke(255, 0, 0, 125);
    fill(0, 0, 255, 100); //filling color
    rect(5, 5, (canvasWidth / 2) - strokeValue, (canvasHeight / 2) - strokeValue);

    stroke(0, 255, 0, 125); //outline color
    line(0, 0, canvasWidth, canvasHeight);

    strokeWeight(0);
    ellipse(375, 125, canvasWidth / 2, canvasWidth / 2);
    //rectMode(CENTER);
    fill(255, 255, 255, 100);

    strokeValue -= 5;
    var posMiddle = (canvasWidth / 2) + (strokeValue / 2);
    strokeWeight(strokeValue);
    stroke(0, 0, 0, 125);
    rect(posMiddle, posMiddle, squareDims - strokeValue, squareDims - strokeValue);
    rect(posMiddle, posMiddle, squareDims / 2, squareDims / 2);
    rect(posMiddle, posMiddle, squareDims / 4, squareDims / 4);
    stroke('cyan');
    strokeWeight(pointThicc);
    point(canvasWidth / 2, canvasHeight / 2);

    //Alien
    fill(60);
    noStroke();
    rect(0, canvasWidth / 2, canvasWidth / 2);
    fill(120);
    //head
    ellipse(canvasWidth/4,(canvasWidth/2)+canvasWidth/8,canvasHeight/2,canvasHeight/4);
    fill(60);
    rect(0, canvasWidth *(5/8), canvasWidth / 2);
    fill(120);
    triangle(0,canvasWidth *(5/8),canvasWidth/2,canvasWidth *(5/8),canvasWidth/4,canvasHeight);
    //mouth
    fill(0);
    ellipse(canvasWidth/4,canvasWidth*3/4,canvasHeight/8,canvasHeight/4);
    fill(120);
    ellipse(canvasWidth/4,(canvasWidth*3/4)-10,canvasHeight/7,canvasHeight/4);
    fill(0);
    
    translate(canvasWidth*(2/16)-8,canvasWidth*(10.6/16));
    rotate(PI/7);    
    ellipse(0,0,120,40);
    resetMatrix();

    translate(canvasWidth*(6/16)+8,canvasWidth*(10.6/16));
    rotate(-(PI/7));
    ellipse(0,0,120,40);
    resetMatrix();
    ellipse(canvasWidth*(4/16)-10, (canvasHeight / 1.5)+50,5,5);
    ellipse(canvasWidth*(4/16)+10, (canvasHeight / 1.5)+50,5,5);

}


/**
 * Description of draw()
*/
function draw() {
    createCanvas(canvasHeight,canvasHeight);
    background(255, 0, 0, 125);
    if (!stateChange) {
        canvasHeight+=1;
        canvasWidth = canvasHeight;
    }
if (canvasHeight >=600) {
    canvasHeight = 500;
}
strokeValue = 10;
    strokeWeight(strokeValue);
    stroke(255, 0, 0, 125);
    fill(0, 0, 255, 100); //filling color
    rect(5, 5, (canvasWidth / 2) - strokeValue, (canvasHeight / 2) - strokeValue);

    stroke(0, 255, 0, 125); //outline color
    line(0, 0, canvasWidth, canvasHeight);

    strokeWeight(0);
    ellipse(canvasHeight*0.75, canvasHeight*0.25, canvasWidth / 2, canvasWidth / 2);
    //rectMode(CENTER);
    fill(255, 255, 255, 100);

    strokeValue -= 5;
    var posMiddle = (canvasWidth / 2) + (strokeValue / 2);
    strokeWeight(strokeValue);
    stroke(0, 0, 0, 125);
    rect(posMiddle, posMiddle, (canvasHeight/2) - strokeValue, (canvasHeight/2) - strokeValue);
    rect(posMiddle, posMiddle, ((canvasHeight/2) - strokeValue)/2, ((canvasHeight/2) - strokeValue)/2);
    rect(posMiddle, posMiddle,((canvasHeight/2) - strokeValue)/4, ((canvasHeight/2) - strokeValue)/4);
    stroke('cyan');
    strokeWeight(pointThicc);
    point(canvasWidth / 2, canvasHeight / 2);
   //Alien
   fill(60);
   noStroke();
   rect(0, canvasWidth / 2, canvasWidth / 2);
   fill(120);
   //head
   ellipse(canvasWidth/4,(canvasWidth/2)+canvasWidth/8,canvasHeight/2,canvasHeight/4);
   fill(60);
   rect(0, canvasWidth *(5/8), canvasWidth / 2);
   fill(120);
   triangle(0,canvasWidth *(5/8),canvasWidth/2,canvasWidth *(5/8),canvasWidth/4,canvasHeight);
   //mouth
   fill(0);
   ellipse(canvasWidth/4,canvasWidth*3/4,canvasHeight/8,canvasHeight/4);
   fill(120);
   ellipse(canvasWidth/4,(canvasWidth*3/4)-10,canvasHeight/7,canvasHeight/4);
   fill(0);
   
   translate(canvasWidth*(2/16)-8,canvasWidth*(10.6/16));
   rotate(PI/7);    
   ellipse(0,0,120,40);
   resetMatrix();

   translate(canvasWidth*(6/16)+8,canvasWidth*(10.6/16));
   rotate(-(PI/7));
   ellipse(0,0,120,40);
   resetMatrix();
   ellipse(canvasWidth*(4/16)-10, (canvasHeight / 1.5)+50,5,5);
   ellipse(canvasWidth*(4/16)+10, (canvasHeight / 1.5)+50,5,5);

}