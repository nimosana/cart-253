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
let state = `title`;
let titleFirstFrame = true, simulationFirstFrame = true;

let beginningTitleI = 255, beginningClownI = 0, beginningClownetteI = 0, beginningAliensI = 0, beginningTitleSpeed;
let titleClown = {
    x: 0,
    y: 0,
    size: 250,
    texture: undefined
}, titleClownette = {
    x: 0,
    y: 0,
    size: 250,
    texture: undefined
}

/** Description of preload*/
function preload() {
    userTexture = loadImage('assets/images/clown.png');
    titleClown.texture = loadImage('assets/images/clown.png');
    titleClownette.texture = loadImage('assets/images/clownette.png');
}

/** Description of setup*/
function setup() {
    beginningTitleSpeed = windowWidth * 7.824726E-4;
    titleClownette.size = titleClown.size = windowHeight / 4;
    titleClownette.y = titleClown.y = windowHeight - titleClown.size / 2;
    user = new Player(windowWidth / 2, windowHeight / 2, windowWidth * 0.039, windowWidth * 7.8125E-5, (windowWidth * 1.953125E-3) * 3);
    user.texture = userTexture;
    wallWidth = windowWidth / 20;
    createCanvas(windowWidth, windowHeight);
    createWalls();
    console.log(`Window width: ${windowWidth}, Window height: ${windowHeight}`);
    noStroke();
    angleMode(DEGREES);
    textAlign(CENTER, CENTER);
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
    if (state === `title`) {
        title();
    } else if (state === `simulation`) {
        simulation();
    }
}
function title() {
    if (titleFirstFrame) {
        titleSetup();
    }
    background(0);
    beginningAnimation();

}
function beginningAnimation() {
    if (beginningTitleI > 0) {
        fill(255, beginningTitleI, beginningTitleI, beginningTitleI);
        textSize(64);
        text(`Project 1: \n The clownapping`, windowWidth / 2, windowHeight / 2);
        beginningTitleI--;
    }
    textSize(32);
    if (beginningClownI < windowWidth / 3) {
        fill(255, 0, 255);
        if (beginningClownI < (windowWidth / 3) / 3) {
            text("Why did the clown go to the doctor?\n he was feeling a bit funny!", beginningClownI + windowWidth / 3, windowHeight * (11 / 16))
        } else if ((beginningClownI > (windowWidth / 3) / 3) && beginningClownI < windowWidth / 3 - (windowWidth / 3) / 3) {
            text("You really bring out the circus in me!\nUwU", beginningClownI + windowWidth / 3, windowHeight * (11 / 16))
        } else if ((beginningClownI > windowWidth / 3 - (windowWidth / 3) / 3) && beginningClownI < windowWidth / 3) {
            fill('orange');
            text("haha babe you're so funny..\n you're like a joke!", beginningClownI, windowHeight * (11 / 16))
        }
        titleClown.x = beginningClownI;
        titleClownette.x = beginningClownI + windowWidth / 3;
        beginningClownI += beginningTitleSpeed;
    } else {
        textSize(64);
        fill('white');
        text("WASD/Arrow Keys to move\n\nSpace/Left click to shoot\n\nClick to start", windowWidth / 2, windowHeight / 2);
        if (mouseIsPressed) {
            state = `simulation`;
        }
    }
    displayImage(titleClown, 0);
    displayImage(titleClownette, 0);

}

function titleSetup() {
    Alien.size = windowWidth / 3;
    titleFirstFrame = false;
    simulationFirstFrame = true;
}

function simulationSetup() {
    simulationFirstFrame = false;
    titleFirstFrame = true;
    Alien.size = 0.09765625 * windowWidth;
}

function simulation() {
    if (simulationFirstFrame) {
        simulationSetup();
    }
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
