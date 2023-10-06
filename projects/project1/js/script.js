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
    defaultMaxSpeedX: 5,
    maxSpeedX: 5,
    maxSpeedY: 40,
    defaultSize: 100,
    size: 100,
    touchingFloor: true
}

let floor = {
    x: 0,
    y: 0,
    w: 100,
    h: 1000
}
let test = {
    x: 0,
    y: 0,
    defaultW: 150,
    w: 150,
    defaultH: 200,
    h: 200
}
let zoom = 1;
let cameraYoffset = 0;
let state = 'title';
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
    textAlign(CENTER);
    textSize(80);
    user.x = windowWidth / 2;
    user.y = windowHeight / 2;    // floor.position = createVector((windowWidth / 4), (windowHeight / 4));
    cameraYoffset = windowHeight / 2 - user.size * 3;
    floor.x = user.x - (windowWidth / 2);
    floor.y = (windowHeight * 3 / 4);
    floor.w = windowWidth;
    test.x = windowWidth * 3 / 4;
    test.y = floor.y - test.h;
}

/**
 * Description of draw()
*/
function draw() {
    if (state === 'title') {
        background(0);
        fill('red')
        text("Project 1", windowWidth / 2, windowHeight / 4,)
        display();
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
        obj.vx = 0;
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
    test.y = floor.y - user.vy - test.h;
}
function display() {
    // if (!user.touchingFloor) {
    fill('red')
    // } else {
    // fill('blue')
    // }
    rect(windowWidth / 2 - user.size / 2, user.y + cameraYoffset, user.size);
    fill('gray')
    rect(floor.x, floor.y + cameraYoffset, floor.w, floor.h);
    fill('cyan')
    rect(test.x, test.y + cameraYoffset, test.w, test.h);
    console.log(`user pos: X: ${user.x}\ntest pos X: ${test.x}\n${windowWidth / 2}`);
    // console.log(`floor pos: X: ${floor.x} Y: ${floor.y}`);
    // console.log(`maxSpeedX: ${user.maxSpeedX} Accel: ${user.accelX}`);
    // console.log(`user y: ${user.y + user.size} Accel: ${user.vy} floor : ${floor.y}`);
    // console.log(`testX: ${test.x} Accel: ${user.accelX}`);
}

function floorCollisions() {
    if (collideRectRect(floor.x, floor.y, floor.w, floor.h, windowWidth / 2, windowHeight / 2, user.size, user.size)) {
        user.touchingFloor = true;
        // fill('blue')
        if ((floor.y < user.x + user.size)) {
            floor.y = user.y + user.size;
            if (abs(user.vy) > 2) {
                user.vy = -user.vy / 3;
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
    if (state === 'simulation') {
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
        let deltaPosition;
        if (test.x > windowWidth / 2) {
            deltaPosition = (test.x - user.x + user.size / 2) * (zoom - previousZoom);
            test.x += (deltaPosition);
        } else {
            deltaPosition = ((user.x - user.size / 2 - test.x + test.w / 2) * (zoom - previousZoom));
            // deltaPosition = (user.x + user.size/2 - test.x + test.w) * (zoom - previousZoom);
            test.x -= deltaPosition;
            console.log("BBBBBB");
        }
        console.log(`size ${user.size} delta ${deltaPosition} zoom: ${(zoom)}`)
        // test.x += deltaPosition;
        test.w = test.defaultW * zoom;
        test.h = test.defaultH * zoom;
        console.log("AAAAAAAAAAAAAAA");
    }
}

function mousePressed() {
    if (state === 'title') {
        state = 'simulation'
    }
}