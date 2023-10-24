/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";
let school = [];
let schoolSize = 10;
let waterRatio = 0.8, waterSurface;

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
    waterSurface = height * (1 - waterRatio);
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
    background(0);
    fill(0,0,100);
    rect(0, waterSurface, width, height * 0.8);
    //animate and draw fish
    for (let fish of school) {
        moveFish(fish);
        displayFish(fish);
    }
}

function createFish(x, y) {
    let fish = {
        x: x,
        y: y,
        size: random(25, 50),
        vx: 0,
        vy: 0,
        speed: 2.5,
        changeRate: random(0.5,5),
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

function mousePressed() {
    school.push(createFish(mouseX, mouseY));
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