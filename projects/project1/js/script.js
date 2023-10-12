/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */
"use strict";
let heightRatio = 0.513671875;
let user, userTexture;
let cameraOffsetX = undefined, cameraOffsetY = undefined;

let walls = [], wallWidth;
let projectiles = [], fireRate = 0, fireDelay = 0;
let titleAliens = [], topAliens = [], bottomAliens = [], leftAliens = [], rightAliens = [];

let state = `title`;
let titleFirstFrame = true, simulationFirstFrame = true;
let beginningClownI = 0, beginningClownII = 0, beginningClownetteI = 0, beginningAliensI = 0, beginningAliensII = 0, beginningTitleSpeed, finalTitleSpeed, beginningAlienSpeed, beginningSimulationI;
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
};

/** Description of preload*/
function preload() {
    userTexture = loadImage('assets/images/clown.png');
    titleClown.texture = loadImage('assets/images/clown.png');
    titleClownette.texture = loadImage('assets/images/clownette.png');
}

/** Description of setup*/
function setup() {
    console.log(`Window width: ${windowWidth}, Window height: ${windowHeight}`);
    createCanvas(windowWidth, windowHeight);
    user = new Player(windowWidth / 2, windowHeight / 2, windowWidth * 0.039, windowWidth * 7.8125E-5, (windowWidth * 1.953125E-3) * 3);
    user.texture = userTexture;
    Alien.size = windowWidth / 3;
    createAliens();
    wallWidth = windowWidth / 20;
    createWalls();
    noStroke();
    angleMode(DEGREES);
    textAlign(CENTER, CENTER);
}

function titleSetup() {
    beginningTitleSpeed = windowWidth * 7.824726E-4;
    finalTitleSpeed = windowHeight * 1.801801802E-3;
    beginningAlienSpeed = windowHeight * 1.171875E-3 / 2.8;
    titleClownette.size = titleClown.size = windowHeight / 4;
    titleClownette.y = titleClown.y = windowHeight - titleClown.size / 2;
    titleFirstFrame = false;
    simulationFirstFrame = true;
}

function simulationSetup() {
    beginningSimulationI = 0;
    Alien.size = 0.09765625 * windowWidth;
    simulationFirstFrame = false;
    titleFirstFrame = true;
}

/** Description of draw() */
function draw() {
    Alien.alienAnimation();
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

function simulation() {
    if (simulationFirstFrame) {
        simulationSetup();
    }
    background(0);
    user.keyMovement();
    wallCollisions();
    displayObjects();
    projectileManagement();
}

function beginningAnimation() {
    for (let alien of titleAliens) {
        alien.drawAlien();
    }
    let reversedBeginningClownI = map(beginningClownI, 0, 255, 255, 0);
    if (reversedBeginningClownI > 0) {
        fill(255, reversedBeginningClownI, reversedBeginningClownI, reversedBeginningClownI);
        textSize(0.025 * windowWidth);
        text(`Project 1: \n The clownapping`, windowWidth / 2, windowHeight / 2);
    }
    textSize(0.0125 * windowWidth);
    if (beginningClownI < windowWidth / 3) {
        fill(255, 0, 255);
        if (beginningClownI < (windowWidth / 3) / 3) {
            text("Why did the clown go to the doctor?\n he was feeling a bit funny!", beginningClownI + windowWidth / 3, windowHeight * (11 / 16));
        } else if ((beginningClownI > (windowWidth / 3) / 3) && beginningClownI < windowWidth / 3 - (windowWidth / 3) / 3) {
            text("You really bring out the circus in me!\nUwU", beginningClownI + windowWidth / 3, windowHeight * (11 / 16));
        } else if ((beginningClownI > windowWidth / 3 - (windowWidth / 3) / 3) && beginningClownI < windowWidth / 3) {
            fill('orange');
            text("haha babe you're so funny..\n you're like a joke!", beginningClownI, windowHeight * (11 / 16));
        }
        titleClown.x = beginningClownI;
        titleClownette.x = beginningClownI + windowWidth / 3;
        beginningClownI += beginningTitleSpeed;
    } else if (beginningAliensI < Alien.size * 0.8) {
        for (let alien of titleAliens) {
            alien.y = windowHeight - Alien.size / 2 - beginningAliensI;
            beginningAliensI += beginningAlienSpeed;
        }
        if (beginningAliensI < Alien.size * 0.8 / 3) {
            textSize(0.015625 * windowWidth);
            fill(255, 150, 255);
            text("Allie:\nAlors on danse!", (windowWidth / 3) / 2, windowHeight - beginningAliensI - Alien.size * 0.1);
        } else if ((beginningAliensI > Alien.size * 0.8 / 3) && beginningAliensI < 2 * Alien.size * 0.8 / 3) {
            fill('lime');
            text("Allen:\nWhy didn't you tell me they had\nsuch good music here earlier!", 2 * windowWidth / 3 - Alien.size / 2, windowHeight - beginningAliensI - Alien.size * 0.1);
        } else if ((beginningAliensI > 2 * Alien.size * 0.8 / 3)) {
            fill('cyan');
            text("Alionso:\nWhat do we have here,\n a couple of clowns?", windowWidth - Alien.size / 2, windowHeight - beginningAliensI - Alien.size * 0.1);
        }
    } else {
        if (beginningAliensII < 255 * 2.5) {
            beginningAliensII++;
        }
        if (beginningAliensII < 255 * 2) {
            if (beginningAliensII < 255 / 4) {
                fill('orange');
                text("A couple of clowns\nlol", beginningClownI, windowHeight * (11 / 16));
                fill(255, 0, 255);
                text("A couple of clowns\nlol", beginningClownI + windowWidth / 3, windowHeight * (11 / 16));
            }
            fill(255, 150, 255, beginningAliensII);
            text("They're so cute!", (windowWidth / 3) / 2, windowHeight - beginningAliensI - Alien.size * 0.1);
            fill(105, 255, 105, beginningAliensII - (255 / 2));
            text("Bro she looks drawn on MS paint", 2 * windowWidth / 3 - Alien.size / 2, windowHeight - beginningAliensI - Alien.size * 0.1);
            fill(0, 255, 255, beginningAliensII - (255));
            text("Let's take them to the clowniseum", windowWidth - Alien.size / 2, windowHeight - beginningAliensI - Alien.size * 0.1);
        }
        if (beginningAliensII > 255 * 2 && beginningAliensII < 255 * 2.5) {
            fill('orange');
            text("the clowniseum???", beginningClownI, windowHeight * (11 / 16));
            fill(255, 0, 255);
            text("the clowniseum???", beginningClownI + windowWidth / 3, windowHeight * (11 / 16));
        } else if (beginningAliensII > 255 * 2.5) {
            if (beginningClownII < windowHeight / 2 + Alien.size / 3) {
                fill(255, 150, 255);
                text("Muahahahaha", (windowWidth / 3) / 2, beginningClownII + windowHeight - beginningAliensI - Alien.size * 0.1);
                fill(105, 255, 105);
                text("Muahahahaha", 2 * windowWidth / 3 - Alien.size / 2, beginningClownII + windowHeight - beginningAliensI - Alien.size * 0.1);
                fill(0, 255, 255);
                text("Muahahahaha", windowWidth - Alien.size / 2, beginningClownII + windowHeight - beginningAliensI - Alien.size * 0.1);
                fill('orange');
                text("Noooooo", beginningClownI, beginningClownII + windowHeight * (11 / 16));
                fill(255, 0, 255);
                text("Noooooo", beginningClownI + windowWidth / 3, beginningClownII + windowHeight * (11 / 16));
                beginningClownII += finalTitleSpeed;
                titleClownette.y = titleClown.y += finalTitleSpeed;
                for (let alien of titleAliens) {
                    alien.y += finalTitleSpeed;
                }
            } else {
                state = `simulation`;
            }
        }
    }
    if (mouseIsPressed) {
        state = `simulation`;
    }
    displayImage(titleClown, 0);
    displayImage(titleClownette, 0);
}

function projectileManagement() {
    if (fireDelay > fireRate && (keyIsDown(32) || (mouseIsPressed && mouseButton === LEFT))) {
        Projectile.shoot(user.x, user.y, user.angle);
        fireDelay = 0;
    }
    fireDelay++;
    console.log(`delay : ${fireDelay}`)
    fill('green');
    Projectile.moveDrawProjectiles(cameraOffsetX, cameraOffsetY);
}

function displayObjects() {
    cameraOffsetX = windowWidth / 2 - user.x + user.vx * 4;
    cameraOffsetY = windowHeight / 2 - user.y + user.vy * 4;
    drawWallAliens();
    user.displayRotatingPlayer(cameraOffsetX, cameraOffsetY);
    for (let wall of walls) {
        fill('gray');
        rect(wall.x + cameraOffsetX, wall.y + cameraOffsetY, wall.w, wall.h);
    }
    if (beginningSimulationI < 255 * 2) {
        textSize(0.025 * windowWidth);
        if (beginningSimulationI < 255) {
            let reversedBeginningSimulationI = map(beginningSimulationI, 0, 255, 255, 0);
            fill(255, 255, 255, reversedBeginningSimulationI);
            text("WASD/🠹🠻🠸🠺 to move", windowWidth / 2, windowHeight / 4);
        } else {
            let reversedBeginningSimulationII = map(beginningSimulationI, 255, 255 * 2, 255, 0);
            fill(255, 255, 255, reversedBeginningSimulationII);
            text("Space/Left click to shoot mucus", windowWidth / 2, windowHeight / 4);
        }
        beginningSimulationI++;
    }
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

function createWalls() {
    let topWall = {
        x: -windowWidth,
        y: -windowWidth * heightRatio - wallWidth,
        w: windowWidth * 3,
        h: wallWidth,
    }, bottomWall = {
        x: -windowWidth,
        y: windowWidth * heightRatio * 2,
        w: windowWidth * 3,
        h: wallWidth,
    }, leftWall = {
        x: -windowWidth - wallWidth,
        y: -windowWidth * heightRatio - wallWidth,
        w: wallWidth,
        h: windowWidth * heightRatio * 3 + (wallWidth * 2),
    }, rightWall = {
        x: windowWidth * 2,
        y: -windowWidth * heightRatio - wallWidth,
        w: wallWidth,
        h: windowWidth * heightRatio * 3 + (wallWidth * 2),
    };
    walls.push(topWall, bottomWall, leftWall, rightWall);
}

function createAliens() {
    for (let i = 0; i < 3; i++) {
        titleAliens.push(new Alien(Alien.size * i, windowHeight));
    }
    for (let i = 0; i < 32; i++) {
        topAliens.push(new Alien(0, 0));
        bottomAliens.push(new Alien(0, 0));
    }
    for (let i = 0; i < 16; i++) {
        leftAliens.push(new Alien(0, 0));
        rightAliens.push(new Alien(0, 0));
    }
    console.log(`aliens created`);
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
