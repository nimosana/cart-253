/**
 * Exercise 2: Dodge em!
 * @author Nicolas Morales-Sanabria
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */
"use strict";

let virus = {
    x: 0,
    y: 250,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 1,
    maxSpeed: 10,
    directionX: 1,
    directionY: 1,
    accelX: 0.25,
    accelY: 0.25,
    texture: null
};

let user = {
    x: 250,
    y: 250,
    vx: 0,
    vy: 0,
    size: 100,
    speed: 1,
    maxSpeed: 10,
    directionX: 1,
    directionY: 1,
    accelX: 0.4,
    accelY: 0.4,
    texture: null
};

//mouse position as an object
let mousePos = {
    x: 250,
    y: 250
}
let numStatic = 5000;
/**
 * load virus and user textures
*/
function preload() {
    virus.texture = loadImage('assets/images/virusTexture.png');
    user.texture = loadImage('assets/images/clown.png');
}

/**
 * Description of setup
*/
function setup() {
    createCanvas(windowWidth, windowHeight);
    virus.y = random(0, height);
    virus.x = width / 2;
    virus.y = 0;
    virus.vx = 0;
    user.x = width / 2;
    user.y = height;

}

/**
 * Description of draw()
*/
function draw() {
    background(0);

    // Display static
    for (let i = 0; i < numStatic; i++) {
        let x = random(0, width);
        let y = random(0, height);
        stroke(255);
        point(x, y);
    }

    // update mousePos object
    updateMousePositions(mousePos);
    // make the user chase the mousePos
    chaseTarget(user, mousePos);
    // make the virus chase the user
    chaseTarget(virus, user);

    // Check for catching virus
    let d = dist(user.x, user.y, virus.x, virus.y);
    if (d < virus.size / 2 + user.size / 2) {
        noLoop();
    }

    // Display virus & user
    image(virus.texture, virus.x - virus.size / 2, virus.y - virus.size / 2, virus.size, virus.size);
    image(user.texture, user.x - user.size / 2, user.y - user.size / 2, user.size, user.size);
}

/** updates the  X & Y positions of a mouse object */
function updateMousePositions(mouseObject) {
    mouseObject.x = mouseX;
    mouseObject.y = mouseY;
}

/**
 * compares X & Y of two objects & affects the chaser's accel/speed to go towards the target
 * 
 * @param  chaser the object chasing the other
 * @param  target the object being chased
 */
function chaseTarget(chaser, target) {
    //horizontal movement
    let directionX;
    if (chaser.x > target.x) {
        directionX = -1;
        if (chaser.directionX !== directionX) {
            chaser.accelX *= -1;
        }
        chaser.directionX = -1;
        chaser.vx += chaser.accelX;
        if (Math.abs(chaser.vx) > Math.abs(chaser.maxSpeed)) {
            chaser.vx = -chaser.maxSpeed;
        }
        chaser.x += chaser.vx;
    } else {
        directionX = 1;
        if (chaser.directionX !== directionX) {
            chaser.accelX *= -1;
        }
        chaser.directionX = 1;
        chaser.vx += chaser.accelX;
        if (Math.abs(chaser.vx) > Math.abs(chaser.maxSpeed)) {
            chaser.vx = chaser.maxSpeed;
        }
        chaser.x += chaser.vx;
    }
    //vertical movement
    let directionY;
    if (chaser.y > target.y) {
        directionY = -1;
        if (chaser.directionY !== directionY) {
            chaser.accelY *= -1;
        }
        chaser.directionY = -1;
        chaser.vy += chaser.accelY;
        if (Math.abs(chaser.vy) > Math.abs(chaser.maxSpeed)) {
            chaser.vy = -chaser.maxSpeed;
        }
        chaser.y += chaser.vy;
    } else {
        directionY = 1;
        if (chaser.directionY !== directionY) {
            chaser.accelY *= -1;
        }
        chaser.directionY = 1;
        chaser.vy += chaser.accelY;
        if (Math.abs(chaser.vy) > Math.abs(chaser.maxSpeed)) {
            chaser.vy = chaser.maxSpeed;
        }
        chaser.y += chaser.vy;
        //console.log("Cov speed X: " + virus.vx+ "Cov speed Y: " + virus.vy);
    }
}