/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";
//represents the clong game instance
let menus;
let game;
let clownImage, clownetteImage, evilClownImage;
let clowniseumImage;
let moneyImage;
let virusImage;

/** Description of preload*/
function preload() {
    clownImage = loadImage('assets/images/clown.png');
    clownetteImage = loadImage('assets/images/clownette.png');
    virusImage = loadImage('assets/images/virusTexture.png');
    moneyImage = loadImage('assets/images/money.png');
    evilClownImage = loadImage('assets/images/evilClown.png');
    clowniseumImage = loadImage('assets/images/clowniseum.png');
}

/** Description of setup */
function setup() {
    createCanvas(windowWidth, windowHeight);
    textSize(width * 0.03);
    menus = new Menus();
}

/** Description of draw() */
function draw() {
    menus.run()
}