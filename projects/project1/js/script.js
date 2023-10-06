/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";
let user = {
    x: 0,
    vx: 0,
    accelX: 0.1,
    y: 0,
    vy: 0,
    accelY: 0.1,
    maxSpeed: 40,
    size: 75,
    touchingFloor: true
}

let floor = {
    x: 0,
    y: 0,
    w: 100,
    h: 500
}
let cameraYoffset = 0;
let state = 'simulation';
/**
 * Description of preload
*/
function preload() {

}

/**
 * Description of setup
*/
function setup() {
    user.touchingFloor = false;
    createCanvas(windowWidth, windowHeight);
    user.x = windowWidth / 2;
    user.y = windowHeight / 2;    // floor.position = createVector((windowWidth / 4), (windowHeight / 4));
    cameraYoffset = windowHeight / 2 - user.size * 5;
    floor.x = user.x - (windowWidth / 2);
    floor.y = user.y + (windowHeight / 2) - floor.h / 2;
    floor.w = windowWidth;
}

/**
 * Description of draw()
*/
function draw() {
    if (state === 'title') {

    }
    else if (state === 'simulation') {
        animation();
    }
}
function animation() {
    background(0);
    keyMovement(user);
    movements();
    floorCollisions();
    display();
}

/** Allows the user to control an object's speed with accelerations, using the arrow keys
 * @param obj object to be controlled using the arrow keys */
function keyMovement(obj) {
    //horizontal movement
    if (keyIsDown(39) && !keyIsDown(37)) {
        obj.vx = obj.vx + obj.accelX;
    }
    else if (keyIsDown(37) && !keyIsDown(39)) {
        obj.vx = obj.vx - obj.accelX;
    }
    else if ((!keyIsDown(37) && !keyIsDown(39)) || (keyIsDown(37) && keyIsDown(39))) {
        obj.vx /= 1.03;
    }
    //vertical movement
    if ((keyIsDown(38) && !keyIsDown(40)) && user.touchingFloor) {
        obj.vy = -17;
    }
    else if (!user.touchingFloor) {
        obj.vy += 1;
    }
    //limit to max speed
    if (abs(obj.vx) > abs(obj.maxSpeed)) {
        obj.vx = obj.maxSpeed * Math.sign(obj.vx);
    }
    if (abs(obj.vy) > abs(obj.maxSpeed)) {
        obj.vy = obj.maxSpeed * Math.sign(obj.vy);
    } //move obj
    // console.log(obj.vy)
    // obj.x += obj.vx;
    // obj.y += obj.vy;
}
function movements() {
    floor.y = floor.y - user.vy;
}
function display() {
    fill('red')
    rect(windowWidth / 2 - user.size / 2, user.y + cameraYoffset, user.size);
    fill('gray')
    rect(floor.x, floor.y + cameraYoffset, floor.w, floor.h);
    console.log(`user pos: X: ${user.x}\nY: ${user.y}`);
    console.log(`floor pos: X: ${floor.x} Y: ${floor.y}`);
}

function floorCollisions() {
    if (collideRectRect(floor.x, floor.y, floor.w, floor.h, windowWidth / 2, windowHeight / 2, user.size, user.size)) {
        user.touchingFloor = true;
        // fill('blue')
        if ((floor.y < user.x + user.size)) {
            floor.y = user.y + user.size;
            if (abs(user.vy) > 1.5) {
                user.vy = -user.vy / 2;
            } else {
                user.vy = 0;
            }
        }
        else if (user.x > floor.x + floor.w / 2) {
            floor.x = user.x - floor.w - user.size / 2;
            user.vx = -user.vx;
        }
    } else {
        user.touchingFloor = false;
    }
}
function mouseWheel(event) {
    if (user.size >= 25 && user.size <= 150) {
        user.size += Math.sign(event.delta) * -5;
    }
    if (user.size > 150) {
        user.size = 150;
    }
    if (user.size < 25) {
        user.size = 25;
    }
    console.log(`size ${user.size}`)
}