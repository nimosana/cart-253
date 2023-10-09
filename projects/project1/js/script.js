/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */
"use strict";
let user;
let cameraOffsetX = undefined, cameraOffsetY = undefined;
let walls = [], touchingWalls = false;

/** Description of preload*/
function preload() {
}

/** Description of setup*/
function setup() {
    createCanvas(windowWidth, windowHeight);
    createWalls();
    console.log(`Window width: ${windowWidth}, Window height: ${windowHeight}`);
    user = new Player(windowWidth / 2, windowHeight / 2, windowWidth * 0.039, windowWidth * 7.8125E-5, (windowWidth * 1.953125E-3)*3);
    noStroke();
}

function createWalls() {
    let topWall = {
        x: -windowWidth,
        y: -windowHeight - windowWidth / 20,
        w: windowWidth * 3,
        h: windowWidth / 20,
        fill: 'red'
    }, bottomWall = {
        x: -windowWidth,
        y: windowHeight * 2,
        w: windowWidth * 3,
        h: windowWidth / 20,
        fill: 'blue'
    }, leftWall = {
        x: -windowWidth - windowWidth / 20,
        y: -windowHeight - (windowWidth / 20),
        w: windowWidth / 20,
        h: windowHeight * 3 + windowWidth / 20,
        fill: 'green'
    }, rightWall = {
        x: windowWidth * 2,
        y: -windowHeight - (windowWidth / 20),
        w: windowWidth / 20,
        h: windowHeight * 3 + windowWidth / 20,
        fill: 'yellow'
    }
    walls.push(topWall, bottomWall, leftWall, rightWall);
}

/** Description of draw() */
function draw() {
    animation();
    console.log(`user MaxSpd: ${user.maxSpeed}`)
}

function animation() {
    background(0);
    user.keyMovement();
    wallCollisions();
    displayObjects();
}

function displayObjects() {
    cameraOffsetX = windowWidth / 2 - user.x;
    cameraOffsetY = windowHeight / 2 - user.y;
    for (let wall of walls) {
        fill(wall.fill);
        rect(wall.x + cameraOffsetX + (user.vx * 4), wall.y + cameraOffsetY + (user.vy * 4), wall.w, wall.h);
    }
    if (!touchingWalls) {
        fill('white');
    } else {
        fill('red');
    }
    ellipse(user.x + cameraOffsetX + (user.vx * 4), user.y + cameraOffsetY + (user.vy * 4), user.size);
    touchingWalls = false;
}

function wallCollisions() {
    for (let wall of walls) {
        if (collideRectCircle(wall.x, wall.y, wall.w, wall.h, user.x, user.y, user.size)) {
            // top wall
            if ((user.x > wall.x && user.x < wall.x + wall.w) && (user.y > wall.y + wall.h)) {
                user.y = wall.y + wall.h + user.size / 2;
                user.vy *= -0.9;
            }
            //bottom wall
            if ((user.x > wall.x && user.x < wall.x + wall.w) && (user.y < wall.y)) {
                user.y = wall.y - user.size / 2;
                user.vy *= -0.9;
            }
            //left wall
            if ((user.y > wall.y && user.y < wall.y + wall.h) && (user.x > wall.x + wall.w)) {
                user.x = wall.x + wall.w + user.size / 2;
                user.vx *= -0.9;
            }
            //right wall
            if ((user.y > wall.y && user.y < wall.y + wall.h) && (user.x < wall.x)) {
                user.x = wall.x - user.size / 2;
                user.vx *= -0.9;
            }
            touchingWalls = true;
        }
    }
}
