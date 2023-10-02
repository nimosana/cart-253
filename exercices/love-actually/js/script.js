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
    y: undefined,
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
let fishNumber = 1000;
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
    user.x = windowWidth / 2;
    user.y = windowHeight / 2;
    makeFishList();
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
    lockInWindow(user);
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
        let tempPos = {
            x: random(0, windowWidth),
            y: random(0, windowHeight)
        }
        while (dist(user.x, user.y, tempPos.x, tempPos.y) < user.size * 2) {
            tempPos.x = random(0, windowWidth);
            tempPos.y = random(0, windowHeight);
        }
        let fish = {
            x: tempPos.x,
            y: tempPos.y,
            size: user.size,
            speed: 3,
            vx: 0,
            vy: 0,
            maxSpeed: 7,
            directionX: 1,
            directionY: 1,
            accelX: 0.25,
            accelY: 0.25,
            curiosity: random(2 * user.size, 25 * user.size)
        };
        fishInTheSea.push(fish);
    }
}

function fishCuriosity() {
    for (let fish of fishInTheSea) {
        let d = dist(user.x, user.y, fish.x, fish.y);
        if (d > (user.size + fish.curiosity)) {
            chaseFleeTarget(fish, user, 1);
        }
        else {
            chaseFleeTarget(fish, user, -1);
        }
        randomSpasm(fish, 0.01);
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
    // console.log("mover speed X: " + mover.vx + "mover speed Y: " + mover.vy); //test acceleration
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

function lockInWindow(moving) {
    if ((moving.x < moving.size / 2)) {
        moving.x = moving.size / 2;
        moving.vx *= -1;
    }
    else if ((moving.x > windowWidth - moving.size / 2)) {
        moving.x = windowWidth - moving.size / 2;
        moving.vx *= -1;
    }
    if ((moving.y < moving.size / 2)) {
        moving.y = moving.size / 2;
        moving.vy *= -1;
    }
    else if ((moving.y > windowHeight - moving.size / 2)) {
        moving.y = windowHeight - moving.size / 2;
        moving.vy *= -1;
    }
    console.log(`X: ${moving.x} Y:${moving.y}`);
}

function randomSpasm(spasmer, odds) {
    let chance = random(0, 1);
    if (chance <= odds) {
        spasmer.vx = random(-spasmer.maxSpeed, spasmer.maxSpeed);
        spasmer.vy = random(-spasmer.maxSpeed, spasmer.maxSpeed);
    }
}