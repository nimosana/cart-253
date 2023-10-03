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
    texture: null,
    money: 5
};
//array for all my fish
let fishInTheSea = [];
//number of fish to create
let fishNumber = 1000;
//speed of the fishies
let fishSpeed = 3;
//texture used for the fish
let fishTexture = undefined;
//represents the money wads
let money = {
    x: 250,
    y: 250,
    size: 100,
    texture: undefined
}
let state = `title`; // Can be: title, simulation, love, sadness

/**
 * Description of preload
*/
function preload() {
    user.texture = loadImage('assets/images/clown.png');
    fishTexture = loadImage('assets/images/clownette2.png');
    money.texture = loadImage('assets/images/money2.png');
}

/**
 * Description of setup
*/
function setup() {
    createCanvas(windowWidth, windowHeight);
    user.x = windowWidth / 2;
    user.y = windowHeight / 2;
    makeFishList();
    spawnMoney();
    textSize(64);
    textAlign(CENTER, CENTER);
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
    fill(200, 100, 100);
    text(`LOVE?`, width / 2, height / 2);
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
    fill(255, 150, 150);
    text(`You found "love"`, width / 2, height / 2);
}

function sadness() {
    fill(150, 150, 255);
    text(`:(`, width / 2, height / 2);
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

function isOffscreen(obj) {
    if (obj.x < 0 || obj.x > width || obj.y < 0 || obj.y > height) {
        return true;
    }
    else {
        return false;
    }
}

function checkOverlap() {
    // Check if a fish & the user overlap
    if (ellipseSuperpositionDetection(user, money)) {
        repositionEllipseOutsideOther(money, user);
        user.money *= 2;
        for (let fish of fishInTheSea) {
            fish.curiosity -= user.size * 0.2;
        }
    }
    for (let fish of fishInTheSea) {
        if (ellipseSuperpositionDetection(user, fish)) {
            state = `love`;
        }
    }
}

function display() {
    // Display the user
    displayImage(user, 0);
    // Display the fishes
    fill("blue");
    for (let fish of fishInTheSea) {
        displayImage(fish, 2, fishTexture);
    }
    //display the money
    displayImage(money, 0);
    fill('lime');
    push();
    textAlign(screenX, CENTER);
    text(`Money: ${user.money}`, 150, 40);
    pop();
    user.money += 100;
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
            curiosity: random(4 * user.size, 25 * user.size)
        };
        fishInTheSea.push(fish);
    }
}

function fishCuriosity() {
    for (let fish of fishInTheSea) {
        if (dist(user.x, user.y, fish.x, fish.y) > (user.size + fish.curiosity)) {
            chaseFleeTarget(fish, user, 1);
        }
        else {
            chaseFleeTarget(fish, user, -1);
        }
        randomSpasm(fish, 0.01, 0.5);
    }
}

/**compares X & Y of two objects & affects the mover's accel/speed to go towards the target
 * @param  mover the object being moved
 * @param  target the object being chased
 * @param  usage 1 for  chase, -1 for flee */
function chaseFleeTarget(mover, target, usage) {
    //horizontal movement - detect direction change & affect speed
    let directionX = usage * Math.sign(target.x - mover.x);
    let accelX = directionX * mover.accelX;
    mover.vx += accelX;
    //limit speed to max speed then move object
    if (abs(mover.vx) > abs(mover.maxSpeed)) {
        mover.vx = mover.maxSpeed * directionX;
    }
    mover.x += mover.vx;
    //vertical movement - detect direction change & affect speed
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

function lockInWindow(obj) {
    if ((obj.x < obj.size / 2)) {
        obj.x = obj.size / 2;
        obj.vx *= -1;
    }
    else if ((obj.x > windowWidth - obj.size / 2)) {
        obj.x = windowWidth - obj.size / 2;
        obj.vx *= -1;
    }
    if ((obj.y < obj.size / 2)) {
        obj.y = obj.size / 2;
        obj.vy *= -1;
    }
    else if ((obj.y > windowHeight - obj.size / 2)) {
        obj.y = windowHeight - obj.size / 2;
        obj.vy *= -1;
    }
    console.log(`X: ${obj.x} Y:${obj.y}`);
}

function randomSpasm(spasmer, odds, intensity) {
    if (random(0, 1) <= odds) {
        spasmer.vx = random(-spasmer.maxSpeed * intensity, spasmer.maxSpeed * intensity);
        spasmer.vy = random(-spasmer.maxSpeed * intensity, spasmer.maxSpeed * intensity);
    }
}

/**  returns a boolean indicating if two ellipses are overlapping
 @param a the first ellipse
 @param b the second ellipse
 @return true if they are overlapping, false if they aren't */
function ellipseSuperpositionDetection(a, b) {
    let distance = dist(a.x, a.y, b.x, b.y);
    if (distance < a.size / 2 + b.size / 2)
        return true;
    else
        return false;
}

/** Repositions an object while making sure it is outside another, a buffer distance multiplier can be added
 * @param obj the object to be randomly repositioned 
 * @param other the object to stay outside of
 * @param distMultiplier a distance multiplier buffer for extra space between the objects
 */
function repositionEllipseOutsideOther(obj, other, distMultiplier) {
    let tempPos = {
        x: random(0, windowWidth),
        y: random(0, windowHeight)
    }
    while (dist(obj.x, obj.y, other.x, other.y) < (obj.size + other.size) * distMultiplier) {
        tempPos.x = random(0 + obj.size, windowWidth - obj.size);
        tempPos.y = random(0 + obj.size, windowHeight - obj.size);
    }
    obj.x = tempPos.x;
    obj.y = tempPos.y;
}
/** spawn the money ensuring it is outside the ellipse of the user*/
function spawnMoney() {
    let tempPos = {
        x: random(0 + money.size, windowWidth - money.size),
        y: random(0 + money.size, windowHeight - money.size)
    }
    while (dist(tempPos.x, tempPos.y, user.x, user.y) < (money.size + user.size)) {
        tempPos.x = random(0 + money.size, windowWidth - money.size);
        tempPos.y = random(0 + money.size, windowHeight - money.size);
    }
    money.x = tempPos.x;
    money.y = tempPos.y;
}

/** easily display images instead of shapes
 * @param obj object to be drawn
 * @param type type or case of object to be drawn
 * @param specialTexture a specific texture to be used (for type 2)*/
function displayImage(obj, type, specialTexture) {
    switch (type) {
        case 0: //adjust to draw instead of an ellispe (centered)
            image(obj.texture, obj.x - obj.size / 2, obj.y - obj.size / 2, obj.size, obj.size);
            break;
        case 1: //adjust to draw instead of a square (corner)
            image(obj.texture, obj.x, obj.y, obj.size, obj.size);
            break;
        case 2: //adjust to draw instead of an ellispe but using a predefined texture
            image(specialTexture, obj.x - obj.size / 2, obj.y - obj.size / 2, obj.size, obj.size);
            break;
        default: //invalid type
            console.log("DisplayImage Wrong type bud: " + type);
            break;
    }
}