/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";
var canvasWidth = 500;
var canvasHeight = canvasWidth;
var squareDims = canvasHeight / 2;
var pointThicc = 20;
var strokeValue;
let redValue= 255;
let GreenValue= 255;
let BlueValue= 255;
let maxCanvasSize = 600;
let minCanvasSize = 500;

let stateChange = true;
/**
 * Description of preload
*/
function preload() {

}


/**
 * Description of setup
*/
function setup() {

}


/**
 * Description of draw()
*/
function draw() {
    createCanvas(canvasHeight, canvasHeight);
    background(redValue, 0, 0, 125);
    
    if (stateChange) {
        canvasHeight += 1;
        canvasWidth = canvasHeight;
    } else {
        canvasHeight -= 1;
        canvasWidth = canvasHeight;
        if (canvasHeight <= minCanvasSize) {
            stateChange = false;
        }
    }
    if (canvasHeight >= maxCanvasSize)
        stateChange = false;
    if (canvasHeight <= minCanvasSize)
        stateChange = true;

}