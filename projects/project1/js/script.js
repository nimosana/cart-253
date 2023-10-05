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
    accelX: 0.01,
    y: 0,
    vy: 0,
    accelY: 0.01,
    maxSpeed: 1,
    size: 20
}

let wall = {
    x: 0,
    y: 0,
    w: 20,
    h: 40
}

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
user.x = windowWidth/2;
user.y = windowHeight/2;    // wall.position = createVector((windowWidth / 4), (windowHeight / 4));
    wall.x = user.x + windowWidth / 4;
    wall.y = user.y + windowHeight / 4;
}

/**
 * Description of draw()
*/
function draw() {
    background(0);
    fill('red');
    keyMovement(user);
    wall.x = wall.x - user.vx;
    wall.y = wall.y-user.vy;
    if (collideRectCircle(wall.x, wall.y, wall.w, wall.h, windowWidth/2, windowHeight/2, user.size)) {
        fill('blue')
        if ((user.x < wall.x + wall.w / 2) && !(user.y < wall.y)) {
            // user.x = wall.x - user.size / 2;
            // user.vx = -user.vx;
        }
        else if (user.x > wall.x + wall.w / 2) {
            // user.x = wall.x + wall.w + user.size / 2;
            // user.vx = 0;
        }
    }
    ellipse(windowWidth / 2, windowHeight / 2, user.size);
    rect(wall.x , wall.y , wall.w, wall.h);
    console.log(`circle pos: X: ${user.x}\nY: ${user.y}`);
    console.log(`wall pos: X: ${wall.x} Y: ${wall.y}`)
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
    if (keyIsDown(38) && !keyIsDown(40)) {
        obj.vy = obj.vy - obj.accelY;
    }
    else if (keyIsDown(40) && !keyIsDown(38)) {
        obj.vy = obj.vy + obj.accelY;
    }
    else if ((!keyIsDown(40) && !keyIsDown(38)) || (keyIsDown(40) && keyIsDown(38))) {
        obj.vy /= 1.03;
    }
    //limit to max speed
    if (abs(obj.vx) > abs(obj.maxSpeed)) {
        obj.vx = obj.maxSpeed * Math.sign(obj.vx);
    }
    if (abs(obj.vy) > abs(obj.maxSpeed)) {
        obj.vy = obj.maxSpeed * Math.sign(obj.vy);
    } //move obj
    obj.x += obj.vx;
    obj.y += obj.vy;
}