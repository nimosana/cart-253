/**Exercise 2: Dodge em!
 * @author Nicolas Morales-Sanabria
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project! */
"use strict";
//represents the virus
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
//represents the user/player
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
    vaccinations: 0,
    texture: null
};
//mouse position as an object
let mousePos = {
    x: 250,
    y: 250
}
//represents the syringe
let syringe = {
    x: 250,
    y: 250,
    size: 60,
    yDraw: 0
}
//number of static background dots
let numStatic = 100;
let textSizeNumber = 60;

/** load virus and user textures*/
function preload() {
    virus.texture = loadImage('assets/images/virusTexture.png');
    user.texture = loadImage('assets/images/clown.png');
}

/** Description of setup*/
function setup() {
    createCanvas(windowWidth, windowHeight);
    textSize(textSizeNumber);
    virus.y = random(0, height);
    virus.x = width / 2;
    virus.y = 0;
    virus.vx = 0;
    user.x = width / 2;
    user.y = height;
    syringe.x = random(syringe.size, windowWidth - syringe.size);
    syringe.y = random(syringe.size, windowHeight - syringe.size);
    syringe.yDraw = syringe.y - syringe.size / 2;
}

/** Description of draw() */
function draw() {
    background(0);
    // Display static
    for (let i = 0; i < numStatic; i++) {
        let x = random(0, width);
        let y = random(0, height);
        stroke(random(0, 255), random(0, 255), random(0, 255), random(0, 255));
        strokeWeight(random(1, 10));
        point(x, y);
    }
    // draw the syringe with a random strokeweight from the static to have a trippy effect
    drawSyringe(syringe.x, syringe.yDraw, syringe.size);
    // update mousePos X & Y
    updateMousePositions(mousePos);
    // make the user chase the mousePos
    chaseTarget(user, mousePos);
    // make the virus chase the user
    chaseTarget(virus, user);
    // Check user & virus superposition (game end)
    if (ellipseSuperpositionDetection(virus, user)) {
        noLoop();
    }
    // if the user touches the syringe, teleport it
    if (ellipseSuperpositionDetection(user, syringe)) {
        syringe.x = random(syringe.size, windowWidth - syringe.size);
        syringe.yDraw = random(syringe.size, windowHeight - syringe.size);
        syringe.y = syringe.yDraw + syringe.size / 2;
        user.vaccinations++;
    }

    noStroke();
    text("Vaccinations: " + user.vaccinations, 20, textSizeNumber)

    // Display virus & user
    image(virus.texture, virus.x - virus.size / 2, virus.y - virus.size / 2, virus.size, virus.size);
    image(user.texture, user.x - user.size / 2, user.y - user.size / 2, user.size, user.size);
}

/** updates the  X & Y positions of a mouse object */
function updateMousePositions(mouseObject) {
    mouseObject.x = mouseX;
    mouseObject.y = mouseY;
}


/**compares X & Y of two objects & affects the chaser's accel/speed to go towards the target
 * @param  chaser the object chasing the other
 * @param  target the object being chased */
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
    }
    // console.log("Cov speed X: " + chaser.vx+ "Cov speed Y: " + chaser.vy); //test acceleration
}

/**  returns a boolean indicating if two ellipses are overlapping
 @param a the first ellipse
 @param b the second ellipse
 @return true if they are overlapping, false if they aren't */
function ellipseSuperpositionDetection(a, b) {
    let distance = dist(a.x, a.y, b.x, b.y);
    if (distance < a.size / 2 + b.size / 2) {
        return true;
    } else
        return false;
}

/** draws a syringe */
function drawSyringe(x, yDraw, size) {
    fill(0, 255, 255);
    rect(x - size / 6, yDraw + size / 12, size / 3, size / 12)
    rect(x - size / 12, yDraw + size / 12, size / 6, size / 4)
    rect(x - size / 4, yDraw + size / 3, size / 2, size / 12)
    rect(x - size / 8, yDraw + size / 2.4, size / 4, size / 2);
    strokeWeight(1);
    triangle(x - size / 24, yDraw + (size / 1.09), x + size / 24, yDraw + (size / 1.09), x, yDraw + (size * 1.2));
    // ellipse(x, yDraw + size / 2, size); //check hitbox
}