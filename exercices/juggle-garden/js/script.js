/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

let gravityForce = 0.0025;

let paddles = [];
let ball, imageBalls;

let numBalls = 10;
let state = `title`;
let score = 0;

function preload() {
    imageBalls = loadImage('assets/images/clown.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    paddles.push(new Paddle(20, 200, 1), new Paddle(20, 200, 2));
    textSize(40);
    textAlign(CENTER, CENTER);
    ball = new Ball(width / 2, height / 2);
}

function draw() {
    if (state === `title`) {
        States.title();
    } else if (state === `simulation`) {
        States.simulation();
    } else if (state === `loss`) {
        States.loss();
    }
}