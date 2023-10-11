/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */
"use strict";
let user, userTexture, userAngle;
let cameraOffsetX = undefined, cameraOffsetY = undefined;
let walls = [], wallWidth, touchingWalls = false;
let projectiles = [];
let topAliens = [], bottomAliens = [], leftAliens = [], rightAliens = [];
let heightRatio = 0.513671875;

/** Description of preload*/
function preload() {
    userTexture = loadImage('assets/images/clown.png');
}

/** Description of setup*/
function setup() {
    user = new Player(windowWidth / 2, windowHeight / 2, windowWidth * 0.039, windowWidth * 7.8125E-5, (windowWidth * 1.953125E-3) * 3);
    user.texture = userTexture;
    wallWidth = windowWidth / 20;
    createCanvas(windowWidth, windowHeight);
    createWalls();
    console.log(`Window width: ${windowWidth}, Window height: ${windowHeight}`);
    noStroke();
    angleMode(DEGREES);
    textAlign(CENTER, CENTER);
    Alien.size = 0.09765625 * windowWidth;
    createAliens();
}

function createWalls() {
    let topWall = {
        x: -windowWidth,
        y: -windowWidth * heightRatio - wallWidth,
        w: windowWidth * 3,
        h: wallWidth,
        fill: 'red'
    }, bottomWall = {
        x: -windowWidth,
        y: windowWidth * heightRatio * 2,
        w: windowWidth * 3,
        h: wallWidth,
        fill: 'blue'
    }, leftWall = {
        x: -windowWidth - wallWidth,
        y: -windowWidth * heightRatio - wallWidth,
        w: wallWidth,
        h: windowWidth * heightRatio * 3 + (wallWidth * 2),
        fill: 'green'
    }, rightWall = {
        x: windowWidth * 2,
        y: -windowWidth * heightRatio - wallWidth,
        w: wallWidth,
        h: windowWidth * heightRatio * 3 + (wallWidth * 2),
        fill: 'yellow'
    }
    walls.push(topWall, bottomWall, leftWall, rightWall);
}

/** Description of draw() */
function draw() {
    animation();
    // console.log(`user MaxSpd: ${user.maxSpeed}`)
}

function animation() {
    background(0);
    Alien.alienAnimation();
    drawWallAliens();
    user.keyMovement();
    wallCollisions();
    displayObjects();
    projectileManagement();
}

function projectileManagement() {
    Projectile.shoot(user.x, user.y, user.userAngle, 30);
    fill('green');
    Projectile.moveDrawProjectiles(cameraOffsetX, cameraOffsetY);
}

function drawWallAliens() {
    for (let i = 0; i < topAliens.length; i++) {
        topAliens[i].x = -0.0125 * windowWidth - windowWidth / 20 - windowWidth + Alien.size * i + cameraOffsetX;
        topAliens[i].y = -windowWidth * heightRatio - Alien.size * 1.8 + cameraOffsetY;
        topAliens[i].drawAlien();
    }
    push();
    rotate(180);
    for (let i = 0; i < bottomAliens.length; i++) {
        bottomAliens[i].x = -0.0125 * windowWidth - windowWidth / 20 - windowWidth * 2 + Alien.size * i - cameraOffsetX;
        bottomAliens[i].y = -windowWidth * heightRatio * 2 - (wallWidth / 20) * 2 - Alien.size * 1.8 - cameraOffsetY;
        bottomAliens[i].drawAlien();
    }
    pop();
    push();
    rotate(90);
    for (let i = 0; i < rightAliens.length; i++) {
        rightAliens[i].x = -windowWidth * 9.765625E-3 - windowWidth * heightRatio + Alien.size * i + cameraOffsetY;
        rightAliens[i].y = -0.0125 * windowWidth * 2 - windowWidth / 20 - windowWidth * 2 - Alien.size - cameraOffsetX;
        rightAliens[i].drawAlien();
    }
    pop();
    push();
    rotate(-90);
    for (let i = 0; i < leftAliens.length; i++) {
        leftAliens[i].x = windowWidth * 9.765625E-3 + windowWidth * heightRatio - Alien.size - Alien.size * i - cameraOffsetY;
        leftAliens[i].y = -0.0125 * windowWidth * 2 - windowWidth / 20 - windowWidth - Alien.size + cameraOffsetX;
        leftAliens[i].drawAlien();
    }
    pop();
}

function createAliens() {
    for (let i = 0; i < 32; i++) {
        let alien1 = new Alien(0, 0);
        topAliens.push(alien1);
        let alien2 = new Alien(0, 0);
        bottomAliens.push(alien2);
        console.log(`aliens created`);
    }
    for (let i = 0; i < 16; i++) {
        let alien1 = new Alien(0, 0);
        leftAliens.push(alien1);
        let alien2 = new Alien(0, 0);
        rightAliens.push(alien2);
    }
}

function displayObjects() {
    cameraOffsetX = windowWidth / 2 - user.x + user.vx * 4;
    cameraOffsetY = windowHeight / 2 - user.y + user.vy * 4;
    user.displayRotatingPlayer(cameraOffsetX, cameraOffsetY);
    for (let wall of walls) {
        fill(wall.fill);
        rect(wall.x + cameraOffsetX, wall.y + cameraOffsetY, wall.w, wall.h);
    }
    if (!touchingWalls) {
        fill('white');
    } else {
        fill('red');
    }
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
    for (let i = Projectile.projectiles.length - 1; i >= 0; i--) {
        for (let wall of walls) {
            if (collideRectCircle(wall.x, wall.y, wall.w, wall.h, Projectile.projectiles[i].x, Projectile.projectiles[i].y, Projectile.projectiles[i].size)) {
                Projectile.projectiles.splice(i, 1);
                break;
            }
        }
    }
}
