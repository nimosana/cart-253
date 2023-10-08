/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */
"use strict";
let user = {
    x: undefined,
    y: undefined,
    vx: 0,
    vy: 0,
    size: undefined,
    maxSpeed: 5,
    directionX: 1,
    directionY: 1,
    accelX: undefined,
    accelY: undefined,
    texture: null
}
let walls = [];

/** Description of preload*/
function preload() {
}

/** Description of setup*/
function setup() {
    createCanvas(windowWidth, windowHeight);
    console.log(`Window width: ${windowWidth}, Window height: ${windowHeight}`)
    createWalls();
    user.x = windowWidth / 2;
    user.y = windowHeight / 2;
    user.size = windowWidth * 0.039;
    user.accelX = user.accelY = windowWidth * 7.8125E-5;
    user.maxSpeed = windowWidth * 1.953125E-3;
}

function createWalls() {
    let topWall = {
        x: 0,
        y: 0,
        w: windowWidth,
        h: windowHeight / 20,
        fill: 'red'
    }, bottomWall = {
        x: 0,
        y: windowHeight - windowHeight / 20,
        w: windowWidth,
        h: windowHeight / 20,
        fill: 'blue'
    }, leftWall = {
        x: 0,
        y: 0,
        w: windowHeight / 20,
        h: windowHeight,
        fill: 'green'
    }, rightWall = {
        x: (windowWidth - (windowHeight / 20)),
        y: 0,
        w: windowWidth / 20,
        h: windowHeight,
        fill: 'yellow'
    }
    walls.push(topWall, bottomWall, leftWall, rightWall);
}

/** Description of draw() */
function draw() {
    animation();
}

function animation() {
    background(0);
    keyMovement(user);
    displayObjects();
}

function displayObjects() {
    for (let wall of walls) {
        fill(wall.fill);
        rect(wall.x, wall.y, wall.w, wall.h);
    }
    fill('white');
    ellipse(user.x, user.y, user.size);
}

/** Allows the user to control an object's speed with accelerations, using the arrow keys
 * @param obj object to be controlled using the arrow keys or WASD */
function keyMovement(obj) {
    //horizontal movement
    if ((keyIsDown(39) && !keyIsDown(37)) || (keyIsDown(68) && !keyIsDown(65))) {
        obj.vx += obj.accelX;
    } else if (keyIsDown(37) && !keyIsDown(39) || (keyIsDown(65) && !keyIsDown(68))) {
        obj.vx -= obj.accelX;
    } else if ((!keyIsDown(37) && !keyIsDown(39)) || (keyIsDown(37) && keyIsDown(39)) || (keyIsDown(65) && keyIsDown(68))) {
        if (abs(obj.vx) > (obj.maxSpeed * 0.01)) {
            obj.vx /= 1.03;
        } else {
            obj.vx = 0;
        }
    }
    //vertical movement
    if ((keyIsDown(38) && !keyIsDown(40)) || (keyIsDown(87) && !keyIsDown(83))) {
        obj.vy -= obj.accelY;
    } else if (keyIsDown(40) && !keyIsDown(38) || (keyIsDown(83) && !keyIsDown(87))) {
        obj.vy += obj.accelY;
    } else if ((!keyIsDown(40) && !keyIsDown(38)) || (keyIsDown(40) && keyIsDown(38)) || (keyIsDown(83) && keyIsDown(87))) {
        if (abs(obj.vy) > (obj.maxSpeed * 0.01)) {
            obj.vy /= 1.03;
        } else {
            obj.vy = 0;
        }
    }
    //limit to max speed
    let speed = sqrt(pow(obj.vx, 2) + pow(obj.vy, 2));
    if (speed > obj.maxSpeed) {
        obj.vx *= (obj.maxSpeed / speed);
        obj.vy *= (obj.maxSpeed / speed);
    }
    //move obj
    obj.x += obj.vx;
    obj.y += obj.vy;
    console.log(`spd X: ${obj.vx} spd Y: ${obj.vy}`);
}