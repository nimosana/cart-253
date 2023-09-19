/**
 * Exercise 1: I like to move it!
 * @author Nicolas Morales-Sanabria
 * 
 * Animates a dancing alien that changes color and body width, it follows the user's cursor 
 * and moves its arms to the beat!
 * My submission for Excercise 1: I like to move it!
 */
"use strict";
var canvasWidth = 500;
var canvasHeight = canvasWidth;
let direction = 1;
let direction2 = 1;
let direction3 = 1;
let randomColorR1 = 0;
let randomColorG1 = 0;
let randomColorB1 = 0;
let randomColorR2 = 0;
let randomColorG2 = 0;
let randomColorB2 = 0;
let randomColorR3 = 0;
let randomColorG3 = 0;
let randomColorB3 = 0;
let randomColorR4 = 0;
let randomColorG4 = 0;
let randomColorB4 = 0;
let randomColorR5 = 0;
let randomColorG5 = 0;
let randomColorB5 = 0;
let randomColorR6 = 0;
let randomColorG6 = 0;
let randomColorB6 = 0;
let offset = 0;
let offset2 = 0;
let offset3 = 0;
let xOffset = 0;
let yOffset = 0;
let x1 = 0;
let y1 = 0;
let horizontalMovement = 0;
let verticalMovement = 0;

/**
 * Creates the canvas and sets the text size used in the animation.
*/
function setup() {
    createCanvas(canvasHeight, canvasHeight);
    textSize(20);
    strokeWeight(20)
}

/**
 * Draws an alien that bops its head around, Updates the random colors, the offsets and follows 
 * the user's cursor while staying inside the canvas. The alien's body stretches and compresses.
*/
function draw() {
    background(0, 0, 0);
    //x1 and y1 values determine a position that follows the mouse,
    //the constrain on "map" to keeps the alien's whole head in the canvas
    x1 = constrain(map(mouseX, 0, canvasWidth, 0, canvasWidth) - (canvasWidth / 2), -(canvasHeight * 0.25), (canvasHeight * 0.25));
    y1 = constrain(map(mouseY, 0, canvasHeight, 0, canvasHeight) - ((canvasHeight / 2) + 140), -(canvasHeight * 0.5), 0);
    //the code without constrain would let the alien follow the cursor up to the corner of the canvas (with map's withinBounds =true)
    //x1 = map(mouseX, 0, canvasWidth, 0, canvasWidth, true) - (canvasWidth / 2), -(canvasHeight * 0.25), (canvasHeight * 0.25);
    //y1 = map(mouseY, 0, canvasHeight, 0, canvasHeight, true) - ((canvasHeight / 2) + 140), -(canvasHeight * 0.5), 0;

    //randomize colors and determine next movement
    randomColors();
    boppingX(10);
    boppingY(30);
    bodyWiggle(20);
    horizontalMovement = xOffset + x1;
    verticalMovement = yOffset + y1;
    //The following code draws the alien
    //top of the head
    noStroke();
    fill(randomColorR1, randomColorG1, randomColorB1);
    ellipse((canvasWidth / 2) + horizontalMovement, (canvasHeight / 2) + (canvasHeight / 8) + verticalMovement, canvasWidth / 2, canvasHeight / 4);
    fill(0);
    rect(0 + x1, canvasHeight * (5 / 8) + verticalMovement, canvasWidth, canvasHeight);
    //body
    fill(randomColorR1, randomColorG1, randomColorB1);
    stroke(randomColorR1, randomColorG1, randomColorB1);
    //left arm
    line(canvasWidth / 2 + horizontalMovement, canvasHeight + verticalMovement, (canvasWidth / 8) + horizontalMovement, canvasHeight - (yOffset / 5) + y1 + 50);
    line((canvasWidth / 8) + horizontalMovement, canvasHeight - (yOffset / 5) + y1 + 50, (canvasWidth * 0.2) + horizontalMovement, canvasHeight - yOffset * 5 + y1 + -50);
    //right arm
    line(canvasWidth / 2 + horizontalMovement, canvasHeight + verticalMovement, (canvasWidth * 0.875) + horizontalMovement, canvasHeight - (yOffset / 5) + y1 + 50);
    line((canvasWidth * 0.875) + horizontalMovement, canvasHeight - (yOffset / 5) + y1 + 50, (canvasWidth * 0.8) + horizontalMovement, canvasHeight + yOffset * 5 + y1 + -50);
    noStroke();
    ellipse((canvasWidth / 2) + horizontalMovement, canvasHeight + verticalMovement + 180, (canvasWidth / 4) + offset3, canvasHeight + offset3);
    //CLASSIFIED
    fill(randomColorR2, randomColorG2, randomColorB2);
    text("BELIEVE", (canvasWidth / 2) + horizontalMovement - 40, (canvasHeight / 2) + verticalMovement + 375);
    //bottom of the head
    fill(randomColorR1, randomColorG1, randomColorB1);
    triangle(canvasWidth / 4 + horizontalMovement, canvasHeight * (5 / 8) + verticalMovement, (canvasWidth * 0.75) + horizontalMovement, canvasWidth * (5 / 8) + verticalMovement,
        (canvasWidth / 2) + x1, canvasHeight + verticalMovement);
    //mouth
    fill(randomColorR2, randomColorG2, randomColorB2);
    ellipse((canvasWidth / 2) + horizontalMovement, (canvasHeight * 3 / 4) + verticalMovement, canvasWidth / 8, canvasHeight / 4);
    fill(randomColorR1, randomColorG1, randomColorB1);
    ellipse((canvasWidth / 2) + horizontalMovement, (canvasHeight * 3 / 4) - 10 + verticalMovement, canvasWidth / 7, canvasHeight / 4);
    //left eye
    fill(randomColorR3, randomColorG3, randomColorB3);
    translate(canvasWidth * (6 / 16) - 8 + horizontalMovement, canvasHeight * (10.6 / 16) + verticalMovement);
    rotate(PI / 7);
    ellipse(0, 0, 120, 20 + offset3);
    resetMatrix();
    //right eye
    translate(canvasWidth * (10 / 16) + 8 + horizontalMovement, canvasHeight * (10.6 / 16) + verticalMovement);
    rotate(-(PI / 7));
    fill(randomColorR4, randomColorG4, randomColorB4);
    ellipse(0, 0, 120, 20 + offset3);
    resetMatrix();
    //nostrils
    fill(randomColorR5, randomColorG5, randomColorB5);
    ellipse(canvasWidth * (8 / 16) - 10 + horizontalMovement, (canvasHeight / 1.5) + 50 + verticalMovement, 5, 5);
    fill(randomColorR6, randomColorG6, randomColorB6);
    ellipse(canvasWidth * (8 / 16) + 10 + horizontalMovement, (canvasHeight / 1.5) + 50 + verticalMovement, 5, 5);
}
/**
 * Randomizes the RGB values for the different colors used
*/
function randomColors() {
    //body & head
    randomColorR1 = (Math.random() * 80);
    randomColorG1 = (Math.random() * 80);
    randomColorB1 = (Math.random() * 80);
    //mouth & text
    randomColorR2 = (Math.random() * 160);
    randomColorG2 = (Math.random() * 160);
    randomColorB2 = (Math.random() * 160);
    //left eye
    randomColorR3 = (Math.random() * 255);
    randomColorG3 = (Math.random() * 255);
    randomColorB3 = (Math.random() * 255);
    //right eye
    randomColorR4 = (Math.random() * 255);
    randomColorG4 = (Math.random() * 255);
    randomColorB4 = (Math.random() * 255);
    //nostrils
    randomColorR5 = (Math.random() * 120);
    randomColorG5 = (Math.random() * 120);
    randomColorB5 = (Math.random() * 120);
    randomColorR6 = (Math.random() * 120);
    randomColorG6 = (Math.random() * 120);
    randomColorB6 = (Math.random() * 120);
}
/**
 * creates a left-right movement, modifying the xOffset.
 * @param maxOffset maximum value of the offset (absolute)
*/
function boppingX(maxOffset) {
    offset += direction * 1;
    if (offset >= maxOffset || offset <= -maxOffset) {
        direction *= -1;
    }
    xOffset = offset;
}
/**
 * creates an up-down movement, modifying the yOffset.
 * @param maxOffset maximum value of the offset (absolute)
*/
function boppingY(maxOffset) {
    offset2 += direction2 * 2;
    if (offset2 >= maxOffset || offset2 <= -maxOffset) {
        direction2 *= -1;
    }
    yOffset = offset2;
}
/**
 * modifies offset3, the value oscillates between its max offset
 * @param maxOffset maximum value of the offset (absolute)
*/
function bodyWiggle(maxOffset) {
    offset3 += direction3 * 1;
    if (offset3 >= maxOffset || offset3 <= -maxOffset) {
        direction3 *= -1;
    }
}