/**
 * Cart 253 Experimenting project
 * Nicolas Morales-Sanabria
 * 
 * This is a template. A bunch of shapes with basic commands
 * 
 */

"use strict";
var canvasWidth = 500;
var canvasHeight = 500;
var pointThicc = 2;
var strokeValue;

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
    ellipse(375, 125, canvasWidth/2, canvasWidth/2);
    //rectMode(CENTER);
    fill(255, 255, 255, 100);

    strokeValue = 5;
    var squareDims= canvasHeight/2;
    var posMiddle =(canvasWidth / 2) + (strokeValue / 2);
    strokeWeight(5);
    stroke(0, 0, 0, 125); 
    rect(posMiddle, posMiddle, squareDims - strokeValue, squareDims- strokeValue);
    rect(posMiddle, posMiddle, squareDims/2, squareDims/2);
    rect(posMiddle, posMiddle, squareDims/4, squareDims/4);
    stroke('cyan');
    strokeWeight(pointThicc); 
    point(canvasWidth / 2, canvasHeight / 2);
    
  
}


/**
 * Description of draw()
*/
function draw() {

}