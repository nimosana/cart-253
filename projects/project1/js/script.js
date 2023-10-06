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
    defaultAccelX: 1,
    accelX: 1,
    y: 0,
    vy: 0,
    defaultJumpForce: 15,
    jumpForce: 15,
    defaultMaxSpeedX: 10,
    maxSpeedX: 10,
    maxSpeedY: 40,
    defaultSize: 100,
    size: 100,
    touchingFloor: true
}

let floor = {
    x: 0,
    y: 0,
    w: 100,
    h: 500
}
let test = {
    x: 0,
    defaultX: 0,
    y: 0,
    defaultW: 100,
    w: 100,
    defaultH: 200,
    h: 200
}
let zoom = 1;
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
    test.x = windowWidth * 3 / 4;
    test.defaultX = test.x;
    test.y = floor.y - test.h;
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
        obj.vy = (-user.defaultJumpForce * (user.size / user.defaultSize));
    }
    else if (!user.touchingFloor) {
        obj.vy += 1 * (user.size / user.defaultSize);
    }
    //limit to max speed
    if (abs(obj.vx) > abs(obj.maxSpeedX)) {
        obj.vx = obj.maxSpeedX * Math.sign(obj.vx);
    }
    // if (abs(obj.vy) > abs(obj.maxSpeed)) {
    //     obj.vy = obj.maxSpeedY * Math.sign(obj.vy);
    // } //move obj
    // console.log(obj.vy)
}
function movements() {
    floor.y = floor.y - user.vy;
    test.x = test.x - user.vx;
    test.y = floor.y - user.vy;
}
function display() {
    // if (!user.touchingFloor) {
    fill('red')
    // } else {
    //     fill('blue')
    // }
    rect(windowWidth / 2 - user.size / 2, user.y + cameraYoffset, user.size);
    fill('gray')
    rect(floor.x, floor.y + cameraYoffset, floor.w, floor.h);
    fill('cyan')
    rect(test.x - test.w / 2, test.y + cameraYoffset - test.h, test.w, test.h);
    // console.log(`user pos: X: ${user.x}\nY: ${user.y}`);
    // console.log(`floor pos: X: ${floor.x} Y: ${floor.y}`);
    // console.log(`maxSpeedX: ${user.maxSpeedX} Accel: ${user.accelX}`);
    console.log(`user y: ${user.y + user.size} Accel: ${user.vy} floor : ${floor.y}`);
    // console.log(`testX: ${test.x} Accel: ${user.accelX}`);
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
                floor.y = user.y + user.size;
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
    let previousZoom = user.size / user.defaultSize;
    user.size += Math.sign(event.delta) * -5;
    if (user.size + Math.sign(event.delta) * -5 > 100) {
        user.size = 100;
    } else if (user.size + Math.sign(event.delta) * -5 < 50) {
        user.size = 50;
    }
    zoom = (user.size / user.defaultSize);
    user.accelX = user.defaultAccelX * zoom;
    user.maxSpeedX = user.defaultMaxSpeedX * zoom;
    let deltaPosition
    if (test.x > windowWidth / 2) {
        deltaPosition = (test.x + test.w / 2 - user.x) * (zoom - previousZoom);
    } else {
        deltaPosition = (test.x - test.w / 2 - user.x) * (zoom - previousZoom);
        console.log("BBBBBB");
    }
    test.x += deltaPosition;
    test.w = test.defaultW * zoom;
    test.h = test.defaultH * zoom;
    console.log("AAAAAAAAAAAAAAA");

    console.log(`size ${user.size} delta ${deltaPosition}`)
}