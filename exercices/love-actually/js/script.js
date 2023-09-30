/**
 * Exercise 3: Love, Actually
 * @author Nicolas Morales-Sanabria
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";
//represents the user
let user = {
    x: undefined,
    y: 250,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 3,
    maxSpeed: 3,
    directionX: 1,
    directionY: 1,
    accelX: 0.1,
    accelY: 0.1,
    texture: null

};
//array for all my fish
let fishInTheSea = [];
//number of fish to create
let fishNumber = 10;
//speed of the fishies
let fishSpeed = 3;
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
    makeFishList();
    user.x = windowWidth / 3;
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

function title() {
    push();
    textSize(64);
    fill(200, 100, 100);
    textAlign(CENTER, CENTER);
    text(`LOVE?`, width / 2, height / 2);
    pop();
}

function simulation() {
    keyMovement(user);
    fishCuriosity();
    // checkOffscreen();
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

function checkOffscreen() {
    // Check if the circles have gone offscreen
    if (isOffscreen(user)) {
        state = `sadness`;
    }
    for (let fish of fishInTheSea) {
        if (isOffscreen(fish)) {
            state = `sadness`;
            return;
        }
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
    // Check if a fish & the user overlap
    for (let fish of fishInTheSea) {
        let d = dist(user.x, user.y, fish.x, fish.y);
        if (d < user.size / 2 + fish.size / 2) {
            state = `love`;
        }
    }
}

function display() {
    // Display the user
    fill(255);
    ellipse(user.x, user.y, user.size);
    // Display the fishes
    fill("blue");
    for (let fish of fishInTheSea) {
        ellipse(fish.x, fish.y, fish.size);
    }
}

function mousePressed() {
    if (state === `title`) {
        state = `simulation`;
    }
}

function makeFishList() {
    for (let i = 0; i < fishNumber; i++) {
        let fish = {
            x: undefined,
            y: 250,
            size: 100,
            speed: 3,
            x: width / 2,
            y: height / 2,
            vx: random(-fishSpeed, fishSpeed),
            vy: random(-fishSpeed, fishSpeed),
            maxSpeed: 7,
            directionX: 1,
            directionY: 1,
            accelX: 0.25,
            accelY: 0.25,
        };
        fishInTheSea.push(fish);
    }
}

function fishCuriosity() {
    for (let fish of fishInTheSea) {
        let d = dist(user.x, user.y, fish.x, fish.y);
        if (d > (user.size + fish.size) * 1.5) {
            chaseFleeTarget(fish, user, 1);
        }
        else {
            chaseFleeTarget(fish, user, -1);
        }
    }
}

/**compares X & Y of two objects & affects the mover's accel/speed to go towards the target
 * @param  mover the object being moved
 * @param  target the object being chased
 * @param  usage 1 for  chase, -1 for flee */
function chaseFleeTarget(mover, target, usage) {
    //horizontal movement
    //detect direction change & affect speed
    let directionX = usage * Math.sign(target.x - mover.x);
    let accelX = directionX * mover.accelX;
    mover.vx += accelX;
    //limit speed to max speed then move object
    if (abs(mover.vx) > abs(mover.maxSpeed)) {
        mover.vx = mover.maxSpeed * directionX;
    }
    mover.x += mover.vx;
    //vertical movement
    //detect direction change & affect speed
    let directionY = usage * Math.sign(target.y - mover.y);
    let accelY = directionY * mover.accelY;
    mover.vy += accelY;
    //limit speed to max speed then move object
    if (abs(mover.vy) > abs(mover.maxSpeed)) {
        mover.vy = mover.maxSpeed * directionY;
    }
    mover.y += mover.vy;
    console.log("mover speed X: " + mover.vx + "mover speed Y: " + mover.vy); //test acceleration
}

function keyMovement(moving) {
    //horizontal movement
    let directionX = 0;
    if (keyIsDown(39) && !keyIsDown(37)) {
        moving.vx = moving.vx + moving.accelX;
        directionX = 1;
    }
    else if (keyIsDown(37) && !keyIsDown(39)) {
        moving.vx = moving.vx - moving.accelX;
        directionX = -1;
    }
    else if ((!keyIsDown(37) && !keyIsDown(39)) || (keyIsDown(37) && keyIsDown(39))) {
        moving.vx /= 1.03;
    }
    //vertical movement
    let directionY = 0;
    if (keyIsDown(38) && !keyIsDown(40)) {
        moving.vy = moving.vy - moving.accelY;
        directionY = -1;
    }
    else if (keyIsDown(40) && !keyIsDown(38)) {
        moving.vy = moving.vy + moving.accelY;
        directionY = 1;
    }
    else if ((!keyIsDown(40) && !keyIsDown(38)) || (keyIsDown(40) && keyIsDown(38))) {
        moving.vy /= 1.03;
    }
    //limit to max speed
    if (abs(moving.vx) > abs(moving.maxSpeed)) {
        moving.vx = moving.maxSpeed * directionX;
    }
    if (abs(moving.vy) > abs(moving.maxSpeed)) {
        moving.vy = moving.maxSpeed * directionY;
    } //move object
    moving.x += moving.vx;
    moving.y += moving.vy;
}