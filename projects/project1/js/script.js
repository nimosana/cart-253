/** Project 1: The clownapping
 * @author Nicolas Morales-Sanabria
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */
"use strict";
//used to always have a similar gameplay area no matter the screen ratio/dimensions
let heightRatio = 0.513671875;
//represents the user
let user, userTexture;
//camera offsets used to follow the user
let cameraOffsetX = undefined, cameraOffsetY = undefined;
//represent gameplay elements
let clowniseumTexture;
let walls = [], wallWidth;
let fireRate = 0, fireDelay = 0;
let titleAliens = [], topAliens = [], bottomAliens = [], leftAliens = [], rightAliens = [];
//variables used to correctly execute different states of the simulation
let state = `title`;
let titleFirstFrame = true, simulationFirstFrame = true;
//variables used for the beginning animation
let titleClownMovement = 0, titleFinalMovement = 0, titleAliensMovement = 0, titleAliensTimer = 0, titleBeginningSpeed, titleFinalSpeed, titleAlienSpeed, beginningSimulationI;
//represents the animation Clown & Clownette
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

/** Loads the textures/images used in the simulation*/
function preload() {
    clowniseumTexture = loadImage('assets/images/clowniseum.png');
    userTexture = loadImage('assets/images/clown.png');
    titleClown.texture = loadImage('assets/images/clown.png');
    titleClownette.texture = loadImage('assets/images/clownette.png');
}

/** sets up the critical variables, settings or executes the necessary actions in order to correctly launch the simulation */
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

/** sets up the critical variables in order to correctly run the title state of the simulation */
function titleSetup() {
    titleBeginningSpeed = windowWidth * 7.824726E-4;
    titleFinalSpeed = windowHeight * 1.801801802E-3;
    titleAlienSpeed = windowHeight * 1.171875E-3 / 2.8;
    titleClownette.size = titleClown.size = windowHeight / 4;
    titleClownette.y = titleClown.y = windowHeight - titleClown.size / 2;
    titleFirstFrame = false;
    simulationFirstFrame = true;
}

/** sets up the critical variables in order to correctly run the gameplay state of the simulation */
function gameplaySetup() {
    beginningSimulationI = 0;
    Alien.size = 0.09765625 * windowWidth;
    simulationFirstFrame = false;
    titleFirstFrame = true;
}

/** Ensures the aliens are always being animated and draws the correct state of the simulation accoding the application's state */
function draw() {
    Alien.alienAnimation();
    if (state === `title`) {
        title();
    } else if (state === `gameplay`) {
        gameplay();
    }
}

/** runs the 'title' of the simulation, where the beginning animation is set up and automatically plays, can be skipped by clicking */
function title() {
    if (titleFirstFrame) {
        titleSetup();
    }
    background(0);
    beginningAnimation();
    if (mouseIsPressed) {
        state = `gameplay`;
    }
}

/** runs the 'gameplay' part of the simulation, where the user can interact, move, shoot, etc. inside the game area*/
function gameplay() {
    if (simulationFirstFrame) {
        gameplaySetup();
    }
    background(0);
    user.keyMovement();
    wallCollisions();
    displayObjects();
    projectileManagement();
}

/** generates the beginning animation where Clown & Clownette are interrupted and then kidnapped by Allie, Allen & Alionso */
function beginningAnimation() {
    for (let alien of titleAliens) {
        alien.drawAlien();
    }
    let gameTitleColor = map(titleClownMovement, 0, 255, 255, 0);
    if (gameTitleColor > 0) {
        fill(255, gameTitleColor, gameTitleColor, gameTitleColor);
        textSize(0.025 * windowWidth);
        text(`Project 1: \n The clownapping`, windowWidth / 2, windowHeight / 2);
    }
    textSize(0.0125 * windowWidth);
    if (titleClownMovement < windowWidth / 3) {
        fill(255, 0, 255);
        if (titleClownMovement < (windowWidth / 3) / 3) {
            text("Why did the clown go to the doctor?\n he was feeling a bit funny!", titleClownMovement + windowWidth / 3, windowHeight * (11 / 16));
        } else if ((titleClownMovement > (windowWidth / 3) / 3) && titleClownMovement < windowWidth / 3 - (windowWidth / 3) / 3) {
            text("You really bring out the circus in me!\nUwU", titleClownMovement + windowWidth / 3, windowHeight * (11 / 16));
        } else if ((titleClownMovement > windowWidth / 3 - (windowWidth / 3) / 3) && titleClownMovement < windowWidth / 3) {
            fill('orange');
            text("haha babe you're so funny..\n you're like a joke!", titleClownMovement, windowHeight * (11 / 16));
        }
        titleClown.x = titleClownMovement;
        titleClownette.x = titleClownMovement + windowWidth / 3;
        titleClownMovement += titleBeginningSpeed;
    } else if (titleAliensMovement < Alien.size * 0.8) {
        for (let alien of titleAliens) {
            alien.y = windowHeight - Alien.size / 2 - titleAliensMovement;
            titleAliensMovement += titleAlienSpeed;
        }
        if (titleAliensMovement < Alien.size * 0.8 / 3) {
            textSize(0.015625 * windowWidth);
            fill(255, 150, 255);
            text("Allie:\nAlors on danse!", (windowWidth / 3) / 2, windowHeight - titleAliensMovement - Alien.size * 0.1);
        } else if ((titleAliensMovement > Alien.size * 0.8 / 3) && titleAliensMovement < 2 * Alien.size * 0.8 / 3) {
            fill(105, 255, 105);
            text("Allen:\nWhy didn't you tell me they had\nsuch good music here earlier!", 2 * windowWidth / 3 - Alien.size / 2, windowHeight - titleAliensMovement - Alien.size * 0.1);
        } else if ((titleAliensMovement > 2 * Alien.size * 0.8 / 3)) {
            fill(0, 255, 255);
            text("Alionso:\nWhat do we have here,\n a couple of clowns?", windowWidth - Alien.size / 2, windowHeight - titleAliensMovement - Alien.size * 0.1);
        }
    } else {
        if (titleAliensTimer < 255 * 2.5) {
            titleAliensTimer++;
        }
        if (titleAliensTimer < 255 * 2) {
            if (titleAliensTimer < 255 / 4) {
                fill('orange');
                text("A couple of clowns\nlol", titleClownMovement, windowHeight * (11 / 16));
                fill(255, 0, 255);
                text("A couple of clowns\nlol", titleClownMovement + windowWidth / 3, windowHeight * (11 / 16));
            }
            fill(255, 150, 255, titleAliensTimer);
            text("They're so cute!", (windowWidth / 3) / 2, windowHeight - titleAliensMovement - Alien.size * 0.1);
            fill(105, 255, 105, titleAliensTimer - (255 / 2));
            text("Bro she looks drawn on MS paint", 2 * windowWidth / 3 - Alien.size / 2, windowHeight - titleAliensMovement - Alien.size * 0.1);
            fill(0, 255, 255, titleAliensTimer - (255));
            text("Let's take them to the clowniseum", windowWidth - Alien.size / 2, windowHeight - titleAliensMovement - Alien.size * 0.1);
        }
        if (titleAliensTimer > 255 * 2 && titleAliensTimer < 255 * 2.5) {
            fill('orange');
            text("the clowniseum???", titleClownMovement, windowHeight * (11 / 16));
            fill(255, 0, 255);
            text("the clowniseum???", titleClownMovement + windowWidth / 3, windowHeight * (11 / 16));
        } else if (titleAliensTimer > 255 * 2.5) {
            if (titleFinalMovement < windowHeight / 2 + Alien.size / 3) {
                fill(255, 150, 255);
                text("Muahahahaha", (windowWidth / 3) / 2, titleFinalMovement + windowHeight - titleAliensMovement - Alien.size * 0.1);
                fill(105, 255, 105);
                text("Muahahahaha", 2 * windowWidth / 3 - Alien.size / 2, titleFinalMovement + windowHeight - titleAliensMovement - Alien.size * 0.1);
                fill(0, 255, 255);
                text("Muahahahaha", windowWidth - Alien.size / 2, titleFinalMovement + windowHeight - titleAliensMovement - Alien.size * 0.1);
                fill('orange');
                text("Noooooo", titleClownMovement, titleFinalMovement + windowHeight * (11 / 16));
                fill(255, 0, 255);
                text("Noooooo", titleClownMovement + windowWidth / 3, titleFinalMovement + windowHeight * (11 / 16));
                titleFinalMovement += titleFinalSpeed;
                titleClownette.y = titleClown.y += titleFinalSpeed;
                for (let alien of titleAliens) {
                    alien.y += titleFinalSpeed;
                }
            } else {
                state = `gameplay`;
            }
        }
    }
    displayImage(titleClown, 0);
    displayImage(titleClownette, 0);
}
/** creates projectiles at the request of the user (Space/LeftClick) in accordance to a fire rate
 *  also recalculates the positions and draws existing projectiles for every frame */
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

/** displays all the objects of the simulation (user, walls, wall aliens & background)
 *  relative to the user, the image is centered on the user, with a speed effect (cameraOffsets) */
function displayObjects() {
    cameraOffsetX = windowWidth / 2 - user.x + user.vx * 4;
    cameraOffsetY = windowHeight / 2 - user.y + user.vy * 4;
    drawWallAliens();
    image(clowniseumTexture, -windowWidth + cameraOffsetX, -windowWidth * heightRatio - wallWidth + cameraOffsetY, windowWidth * 3, windowWidth * heightRatio * 3 + (wallWidth * 2))
    user.displayRotatingPlayer(cameraOffsetX, cameraOffsetY);
    for (let wall of walls) {
        fill('lime');
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

/** draws the aliens along the walls/game area */
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

/** creates the outside walls/game area relative to the window width */
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

/** creates aliens of the beginning animation,
 *  also creates the aliens to place along the outside walls */
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

/** detects wall collisions with the user to bring and bounce him back into the game area
 * also detects collisions with the projectiles and removes them if they hit a wall */
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
 * @param specialTexture a specific texture to be used (for type 2) */
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
