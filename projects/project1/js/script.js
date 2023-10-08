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
    size: 100,
    speed: 1,
    maxSpeed: 5,
    directionX: 1,
    directionY: 1,
    accelX: 0.5,
    accelY: 0.5,
    texture: null
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
    user.x = windowWidth / 2;
    user.y = windowHeight / 2;
}


/**
 * Description of draw()
*/
function draw() {
    background(0);
    keyMovement(user);
    ellipse(user.x, user.y, user.size);
}


/** Allows the user to control an object's speed with accelerations, using the arrow keys
 * @param obj object to be controlled using the arrow keys or WASD */
function keyMovement(obj) {
    //horizontal movement
    if ((keyIsDown(39) && !keyIsDown(37)) || (keyIsDown(68) && !keyIsDown(65))) {
        obj.vx = obj.vx + obj.accelX;
    }
    else if (keyIsDown(37) && !keyIsDown(39) || (keyIsDown(65) && !keyIsDown(68))) {
        obj.vx = obj.vx - obj.accelX;
    }
    else if ((!keyIsDown(37) && !keyIsDown(39)) || (keyIsDown(37) && keyIsDown(39)) || (keyIsDown(65) && keyIsDown(68))) {
        if (abs(obj.vx) > 0.05) {
            obj.vx /= 1.03;
        } else {
            obj.vx = 0;
        }
    }
    //vertical movement
    if ((keyIsDown(38) && !keyIsDown(40)) || (keyIsDown(87) && !keyIsDown(83))) {
        obj.vy = obj.vy - obj.accelY;
    }
    else if (keyIsDown(40) && !keyIsDown(38) || (keyIsDown(83) && !keyIsDown(87))) {
        obj.vy = obj.vy + obj.accelY;
    }
    else if ((!keyIsDown(40) && !keyIsDown(38)) || (keyIsDown(40) && keyIsDown(38)) || (keyIsDown(83) && keyIsDown(87))) {
        if (abs(obj.vy) > 0.05) {
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