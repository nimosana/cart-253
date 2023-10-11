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
        y: -windowHeight - wallWidth,
        w: windowWidth * 3,
        h: wallWidth,
        fill: 'red'
    }, bottomWall = {
        x: -windowWidth,
        y: windowHeight * 2,
        w: windowWidth * 3,
        h: wallWidth,
        fill: 'blue'
    }, leftWall = {
        x: -windowWidth - wallWidth,
        y: -windowHeight - wallWidth,
        w: wallWidth,
        h: windowHeight * 3 + (wallWidth * 2),
        fill: 'green'
    }, rightWall = {
        x: windowWidth * 2,
        y: -windowHeight - wallWidth,
        w: wallWidth,
        h: windowHeight * 3 + (wallWidth * 2),
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
    shootProjectiles();
}
function drawWallAliens() {
    for (let i = 0; i < topAliens.length; i++) {
        topAliens[i].x = -0.0125 * windowWidth - windowWidth / 20 - windowWidth + Alien.size * i + cameraOffsetX;
        topAliens[i].y = -windowHeight - Alien.size * 1.8 + cameraOffsetY;
        topAliens[i].drawAlien();
    }
    push();
    rotate(180);
    for (let i = 0; i < bottomAliens.length; i++) {
        bottomAliens[i].x = -0.0125 * windowWidth - windowWidth / 20 - windowWidth * 2 + Alien.size * i - cameraOffsetX;
        bottomAliens[i].y = -windowHeight * 2 - (wallWidth / 20) * 2 - Alien.size * 1.8 - cameraOffsetY;
        bottomAliens[i].drawAlien();
    }
    pop();
    push();
    rotate(90);
    for (let i = 0; i < rightAliens.length; i++) {
        rightAliens[i].x = -windowWidth * 9.765625E-3 - windowHeight + Alien.size * i + cameraOffsetY;
        rightAliens[i].y = -0.0125 * windowWidth * 2 - windowWidth / 20 - windowWidth * 2 - Alien.size - cameraOffsetX;
        rightAliens[i].drawAlien();
    }
    pop();
    push();
    rotate(-90);
    for (let i = 0; i < leftAliens.length; i++) {
        leftAliens[i].x = windowWidth * 9.765625E-3 + windowHeight  - Alien.size - Alien.size * i - cameraOffsetY;
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
    displayRotatingPlayer();
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

function shootProjectiles() {
    if ((keyIsDown(32) || (mouseIsPressed && mouseButton === LEFT)) && frameCount % 30 === 0) {
        let projectile = new Projectile(user.x, user.y, windowWidth * 3.90625E-3, windowWidth * 7.8125E-3, userAngle);
        projectiles.push(projectile);
    }

    for (let projectile of projectiles) {
        projectile.x += (cos(projectile.angle) * projectile.speed) + user.vx;
        projectile.y += (sin(projectile.angle) * projectile.speed) + user.vy;
        // console.log(`Proj angle: ${projectile.angle} speed: ${projectile.speed}`)
        // console.log(`projectile Coords, X: ${projectile.x}, Y: ${projectile.y}\n speedX: ${cos(projectile.speed)}, speedY: ${sin(projectile.speed)}`)
        ellipse(projectile.x + cameraOffsetX, projectile.y + cameraOffsetY, projectile.size, projectile.size);
    }
    for (let i = projectiles.length - 1; i >= 0; i--) {
        for (let wall of walls) {
            if (collideRectCircle(wall.x, wall.y, wall.w, wall.h, projectiles[i].x, projectiles[i].y, projectiles[i].size)) {
                projectiles.splice(i, 1);
                break;
            }
        }
    }
}

function displayRotatingPlayer() {
    push();
    userAngle = atan2(mouseY - height / 2 - (user.vy * 4), mouseX - width / 2 - (user.vx * 4));
    translate(user.x + cameraOffsetX, user.y + cameraOffsetY);
    rotate(userAngle - 90);
    user.displayImageForRotation();
    pop();
    // console.log(`User angle: ${userAngle}`)
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
