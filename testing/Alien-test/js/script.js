"use strict";
let alien;

function setup() {
    createCanvas(windowWidth, windowHeight)
    Alien.size = windowHeight / 2; // set desired size for all aliens
    alien = new Alien((windowWidth / 2) - (Alien.size / 2), (windowHeight / 2) - Alien.size); //create an alien at the middle
}

function draw() {
    background(0);
    Alien.alienAnimation(); // only called once to animate all aliens
    alien.drawAlien(); //draws the alien in question
}