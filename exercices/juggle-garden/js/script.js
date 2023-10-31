/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

let gravityForce = 0.0025;

let paddle;

let balls = [];
let numBalls = 10;
let state = `title`;

function setup() {
    createCanvas(windowWidth, windowHeight);

    paddle = new Paddle(300, 20);
    textSize(40);
    textAlign(CENTER, CENTER);
    for (let i = 0; i < numBalls; i++) {
        let x = random(0, width);
        let y = random(-400, -100);
        let ball = new Ball(x, y);
        balls.push(ball);
    }
}

function draw() {
    if (state === `title`) {
        title();
    } else if (state === `simulation`) {
        simulation();
    } else if (state === `loss`) {
        loss();
    }
    // console.log(`size: ${balls.length}`);
}

function title() {
    background(0);
    fill("white");
    text("juggle juggle", width / 2, height / 2);
    if (mouseIsPressed) {
        state = `simulation`;
    }
}

function simulation() {
    background(0);

    paddle.move();
    paddle.display();

    for (let i = balls.length - 1; i >= 0; i--) {
        let ball = balls[i];
        if (ball.active) {
            ball.gravity(gravityForce);
            ball.move();
            ball.bounce(paddle);
            ball.display();
        } else {
            balls.splice(i, 1);
        }
    }
    if (balls.length === 0) {
        state = `loss`;
    }
}

function loss() {
    background(0);
    text("haha loser", width / 2, height / 2);
}