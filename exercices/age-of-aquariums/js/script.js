/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";
let school = [];
let schoolSize = 20;
let waterRatio = 0.8, waterSurface;
let fishTextureR, fishTextureL;
let user = {
    score: 0,
    boat: {
        x: 0,
        y: 0,
        w: 400,
        h: 200,
        vx: 0,
        accelX: 0.1,
        maxSpeed: 2
    },
    hook: {
        xOrigin: 0,
        yOrigin: 0,
        x: 0,
        y: 0,
        size: 10,
        vy: 0,
        busy: false
    },
    texture: undefined
}

/**
 * Description of preload
*/
function preload() {
    user.texture = loadImage('assets/images/fisherman.png');
    fishTextureL = loadImage('assets/images/GuppyL.png');
    fishTextureR = loadImage('assets/images/GuppyR.png');
}

/**
 * Description of setup
*/
function setup() {
    createCanvas(windowWidth, windowHeight);
    waterSurface = height * (1 - waterRatio);
    user.boat.y = waterSurface - (user.boat.h * 0.8);
    user.hook.y = user.boat.y + (user.boat.h / 2);
    textAlign(LEFT,TOP);
    textSize(50);
    noStroke();
    // Create the initial fish and add them to the school array
    for (let i = 0; i < schoolSize; i++) {
        school.push(createFish(random(0, width), random(0, height)));
    }
}

/**
 * Description of draw()
*/
function draw() {
    //draw background
    background('lightblue');
    keyMovement();
    image(user.texture, user.boat.x, user.boat.y, user.boat.w, user.boat.h);
    fill(0, 0, 100);
    rect(0, waterSurface, width, height * waterRatio);
    //animate and draw fish
    for (let fish of school) {
        moveFish(fish);
        // displayFish(fish);
        displayRotatingFish(fish);
    }
    controlBoatHook();
    text(`Fishies caught: ${user.score}`, 0, 0);
}
function controlBoatHook() {
    push();
    strokeWeight(5);
    stroke("white");
    for (let fish of school) {
        if (!user.hook.busy && (dist(user.hook.xOrigin, user.hook.y, fish.x, fish.y) < (fish.size / 2 + user.hook.size / 2))) {
            user.hook.busy = fish.caught = true;
            console.log('caught');
        }
    }
    if (!user.hook.busy) {
        line(user.hook.xOrigin, user.boat.y + (user.boat.h * 0.15), user.hook.xOrigin, user.hook.y - user.hook.size / 2);
        noStroke();
        fill('red');
        ellipse(user.hook.xOrigin, user.hook.y, user.hook.size);
    } else {
        for (let i = school.length - 1; i >= 0; i--) {
            if (school[i].caught) {
                line(user.hook.xOrigin, user.boat.y + (user.boat.h * 0.15), school[i].x, school[i].y);
                // fill('red'); 
                // ellipse(school[i].x, school[i].y, user.hook.size);
                if (keyIsDown(32)) {
                    let angle = atan2(user.hook.xOrigin - school[i].x, user.hook.yOrigin - school[i].y);
                    school[i].vx = school[i].speed * sin(angle);
                    school[i].vy = school[i].speed * cos(angle);
                }
                if (dist(user.hook.xOrigin, user.hook.yOrigin, school[i].x, school[i].y) < school[i].size) {
                    school.splice(i, 1);
                    user.hook.y = user.hook.yOrigin;
                    user.hook.busy = false;
                    user.score++;
                }
            }
        }
    }
    pop();
}

function createFish(x, y) {
    let fish = {
        x: x,
        y: y,
        size: random(25, 50),
        vx: 0,
        vy: 0,
        speed: 2.5,
        changeRate: random(0.5, 5),
        caught: false,
        fill: {
            r: random(0, 255),
            g: random(50, 255),
            b: random(50, 255)
        }
    };
    return fish;
}

function moveFish(fish) {
    // Choose whether to change direction
    if (fish.y > waterSurface) {
        let change = random(0, 100);
        if (change < fish.changeRate) {
            fish.vx = random(-fish.speed, fish.speed);
            fish.vy = random(-fish.speed, fish.speed);
        }
    }
    // Move the fish
    fish.x = fish.x + fish.vx;
    fish.y = fish.y + fish.vy;
    // Constrain the fish to the canvas
    if (fish.x < fish.size / 2 || fish.x > width - (fish.size / 2)) {
        fish.vx *= -0.5;
        fish.x = constrain(fish.x, fish.size / 2, width - (fish.size / 2));
    }
    if (fish.y < fish.size / 2 || fish.y > height - (fish.size / 2)) {
        fish.vy *= -0.5;
        fish.y = constrain(fish.y, fish.size / 2, height - (fish.size / 2));
    }
    // detectfishCollisions();
    if (fish.y < waterSurface) {
        fish.vy += 0.1;
    }
}

function displayFish(fish) {
    push();
    fill(fish.fill.r, fish.fill.g, fish.fill.b);
    // noStroke();
    ellipse(fish.x, fish.y, fish.size);
    pop();
}

function displayRotatingFish(fish) {
    push();
    let angle = atan2(fish.vy, fish.vx);
    translate(fish.x, fish.y);
    rotate(angle);
    if (fish.vx < 0) {
        rotate(135);
        image(fishTextureL, -fish.size / 2, -fish.size / 2, fish.size, fish.size);
    } else {
        image(fishTextureR, -fish.size / 2, -fish.size / 2, fish.size, fish.size);
    }
    pop();
}

function mousePressed() {
    school.push(createFish(mouseX, mouseY));
}

/** Allows the user to control the player's speed with accelerations,
 *  using the arrow keys or WASD
 *  adaptation of the keyMovement function in project 1*/
function keyMovement() {
    //horizontal movement
    if ((keyIsDown(39) && !keyIsDown(37)) || (keyIsDown(68) && !keyIsDown(65))) {
        user.boat.vx += user.boat.accelX;
    } else if (keyIsDown(37) && !keyIsDown(39) || (keyIsDown(65) && !keyIsDown(68))) {
        user.boat.vx -= user.boat.accelX;
    } else if ((!keyIsDown(37) && !keyIsDown(39)) || (keyIsDown(37) && keyIsDown(39)) || (keyIsDown(65) && keyIsDown(68))) {
        if (abs(user.boat.vx) > (user.boat.maxSpeed * 0.01)) {
            user.boat.vx /= 1.03;
        } else {
            user.boat.vx = 0;
        }
    }
    if (keyIsDown(32) && !user.hook.busy) {
        user.hook.y += 2;
    } else if (!keyIsDown(32) && !user.hook.busy && user.hook.y > user.hook.yOrigin) {
        user.hook.y -= 2;
    }
    //move obj
    if (user.boat.x < 0 || user.boat.x > width - user.boat.w) {
        user.boat.vx *= -0.5;
        user.boat.x = constrain(user.boat.x, 0, width - user.boat.w);
    }
    user.boat.x += user.boat.vx;
    user.hook.xOrigin = user.boat.x + (user.boat.w * 0.83);
    user.hook.yOrigin = user.boat.y + (user.boat.h / 2);
}

// function detectfishCollisions() {
//     for (let fish1 of school) {
//         for (let fish2 of school) {
//             if ((fish1 != fish2) && (dist(fish1.x, fish1.y, fish2.x, fish2.y)) < fish1.size / 2 + fish2.size / 2) {
//                 calculateFishCollision(fish1, fish2);
//             }
//         }
//     }
// }

// function calculateFishCollision(fish1, fish2) {
//     let angle = atan2(fish2.y - fish1.y, fish2.x - fish1.y);
//     let distance = dist(fish1.x, fish1.y, fish2.x, fish2.y);
//     let overlapDistance = (fish1.size / 2 + fish2.size / 2 - distance) / 2;
//     if (fish1.x < fish2.x) {
//         fish1.x = fish1.x - overlapDistance * cos(angle);
//         fish2.x = fish2.x + overlapDistance * cos(angle);
//     } else {
//         fish1.x = fish1.x + overlapDistance * cos(angle);
//         fish2.x = fish2.x - overlapDistance * cos(angle);
//     }
//     if (fish1.y < fish2.y) {
//         fish1.y = fish1.y - overlapDistance * sin(angle);
//         fish2.y = fish2.y + overlapDistance * sin(angle);
//         fish1.vy
//     } else {
//         fish1.y = fish1.y - overlapDistance * sin(angle);
//         fish2.y = fish2.y + overlapDistance * sin(angle);
//     }
//     fish1.vx *= -1;
//     fish2.vx *= -1;
//     fish1.vy *= -1;
//     fish2.vy *= -1;
// }