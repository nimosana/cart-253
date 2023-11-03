/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

let paddles = [];
let ball, imageBalls;

let simulation;
let score1, score2;
let wins1, wins2;
let lastRoundWinner;
let roundEnded = false;

function preload() {
    imageBalls = loadImage('assets/images/clown.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    textSize(40);
    wins1 = wins2 = score1 = score2 = 0;
    simulation = new Simulation(`title`);
    paddles.push(new Paddle(20, 200, 1), new Paddle(20, 200, 2));
    ball = new Ball(width / 2, height / 2);
}

function draw() {
    simulation.draw();
}