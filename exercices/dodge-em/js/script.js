/**
 * Exercise 2: Dodge em!
 * @author Nicolas Morales-Sanabria
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";
let covid19 = {
    x: 0,
    y: 250,
    size: 100,
    vx: 0,
    vy: 0,
    speed: 5,
    texture: null
};

let user = {
    x: 250,
    y: 250,
    size: 100,
    texture: null
};

let numStatic = 5000;
/**
 * load virus and user textures
*/
function preload() {
    covid19.texture = loadImage('assets/images/virusTexture.png');
    user.texture = loadImage('assets/images/clown.png');
}


/**
 * Description of setup
*/
function setup() {
    createCanvas(windowWidth, windowHeight);

    covid19.y = random(0, height);
    covid19.vx = covid19.speed;

    noCursor();
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

    // Covid 19 movement
    covid19.x = covid19.x + covid19.vx;
    covid19.y = covid19.y + covid19.vy;

    if (covid19.x > width) {
        covid19.x = 0;
        covid19.y = random(0, height);
    }

    // User movement
    user.x = mouseX;
    user.y = mouseY;

    // Check for catching covid19
    let d = dist(user.x, user.y, covid19.x, covid19.y);
    if (d < covid19.size / 2 + user.size / 2) {
        noLoop();
    }

    // Display virus & user
    image(covid19.texture, covid19.x - covid19.size / 2, covid19.y - covid19.size / 2, covid19.size, covid19.size);
    image(user.texture, user.x - user.size / 2, user.y - user.size / 2, user.size, user.size);
}