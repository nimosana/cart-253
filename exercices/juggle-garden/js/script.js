/**
 Exercise 5: Juggle garden (clong)
 * @author Nicolas Morales-Sanabria
 * In this exercise, 2 players can play a variation of the "Pong" called "clong".
 * each player controls a paddle and has to make a clown bounce trying * to score on
 * their opponent, the games are best of 3 but players can play as many games 
 * as they want. */

"use strict";
//represents the clong game
let clong;
// the image used for the ball in the clong game
let imageBalls;

/** load the assets used in the clong game */
function preload() {
    imageBalls = loadImage('assets/images/clown.png');
}

/** create the canvas, setup critical variables and initialize ball & paddles */
function setup() {
    createCanvas(windowWidth, windowHeight);
    textSize(40);
    clong = new Clong(`title`);
}

/** runs the instance of the clong game */
function draw() {
    clong.run();
}