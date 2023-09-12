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
let x1= 0;
let y1= 0;
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
    createCanvas(canvasHeight, canvasHeight);

}


/**
 * Description of draw()
*/
function draw() {
    resizeCanvas(canvasWidth,canvasHeight);
    background(redValue, 0, 0, 125);
    if (stateChange) {
        canvasHeight += 1;
        canvasWidth = canvasHeight;
    } else {
        canvasHeight -= 1;
        canvasWidth = canvasHeight;
        if (canvasHeight <= minCanvasSize) 
            stateChange = false;
    }
    if (canvasHeight >= maxCanvasSize)
        stateChange = false;
    if (canvasHeight <= minCanvasSize)
        stateChange = true;
    
    const event = new MouseEvent("mousemoved", {
        view:window,
        bubbles: true,
        cancelable:true,
        clientX:winMouseX,
        clientY:winMouseY
    });
    document.body.dispatchEvent(event);
    x1 = map(mouseX, 0, canvasWidth, 0, canvasWidth, true);
    y1 = map(mouseY,0,canvasWidth,0,canvasWidth,true);
    fill(redValue,GreenValue,BlueValue);
    ellipse(x1, y1, canvasHeight/2 , canvasWidth/2);
}
 