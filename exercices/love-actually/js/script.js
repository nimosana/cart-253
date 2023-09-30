/**
 * Exercise 3: Love, Actually
 * @author Nicolas Morales-Sanabria
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";
let user = {
    x: undefined,
    y: 250,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 3
};
let fishInTheSea = [];
let fishNumber = 10;
let fish = {
    x: undefined,
    y: 250,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 3
};

let state = `title`; // Can be: title, simulation, love, sadness

/**
 * Description of preload
*/
function preload() {

}


/**
 * Description of setup
*/
function setup() {
    createCanvas(windowWidth, windowHeight);
    setupCircles();
}


/**
 * Description of draw()
*/
function draw() {
    background(0);

    if (state === `title`) {
        title();
    }
    else if (state === `simulation`) {
        simulation();
    }
    else if (state === `love`) {
        love();
    }
    else if (state === `sadness`) {
        sadness();
    }
}

function setupCircles() {
    // Position circles separated from one another
    user.x = width / 3;
    fish.x = 2 * width / 3;
    // Start circles moving in a random direction
    user.vx = random(-user.speed, user.speed);
    user.vy = random(-user.speed, user.speed);
    fish.vx = random(-fish.speed, fish.speed);
    fish.vy = random(-fish.speed, fish.speed);
}

function title() {
    push();
    textSize(64);
    fill(200, 100, 100);
    textAlign(CENTER, CENTER);
    text(`LOVE?`, width / 2, height / 2);
    pop();
}

function simulation() {
    move();
    checkOffscreen();
    checkOverlap();
    display();
}

function love() {
    push();
    textSize(64);
    fill(255, 150, 150);
    textAlign(CENTER, CENTER);
    text(`LOVE!`, width / 2, height / 2);
    pop();
}

function sadness() {
    push();
    textSize(64);
    fill(150, 150, 255);
    textAlign(CENTER, CENTER);
    text(`:(`, width / 2, height / 2);
    pop();
}

function move() {
    // Move the circles
    user.x = user.x + user.vx;
    user.y = user.y + user.vy;

    fish.x = fish.x + fish.vx;
    fish.y = fish.y + fish.vy;
}

function checkOffscreen() {
    // Check if the circles have gone offscreen
    if (isOffscreen(user) || isOffscreen(fish)) {
        state = `sadness`;
    }
}

function isOffscreen(circle) {
    if (circle.x < 0 || circle.x > width || circle.y < 0 || circle.y > height) {
        return true;
    }
    else {
        return false;
    }
}

function checkOverlap() {
    // Check if the circles overlap
    let d = dist(user.x, user.y, fish.x, fish.y);
    if (d < user.size / 2 + fish.size / 2) {
        state = `love`;
    }
}

function display() {
    // Display the circles
    ellipse(user.x, user.y, user.size);
    ellipse(fish.x, fish.y, fish.size);
}

function mousePressed() {
    if (state === `title`) {
        state = `simulation`;
    }
}