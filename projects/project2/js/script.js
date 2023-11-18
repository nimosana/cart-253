/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";
//represents the clong game instance
let menus;
let game, pausedGame;
let governmentHappy = false;
let inMainGame, inMiniGame, lastScore, mainGameLevel;
let sameMouseClick = false, sameEsc = false;
let clownImage, clownetteImage, evilClownImage;
let clowniseumImage, wallTexture;
let fishermanImage;
let fishTexture, evilTexture;
let moneyImage;
let virusImage;
let runningMainGame = true;

/** Description of preload*/
function preload() {
    clownImage = loadImage('assets/images/clown.png');
    clownetteImage = loadImage('assets/images/clownette.png');
    virusImage = loadImage('assets/images/virusTexture.png');
    moneyImage = loadImage('assets/images/money.png');
    evilClownImage = loadImage('assets/images/evilClown.png');
    clowniseumImage = loadImage('assets/images/clowniseum.png');
    fishermanImage = loadImage('assets/images/fisherman.png');
    fishTexture = loadImage('assets/images/GuppyR.png');
    evilTexture = loadImage('assets/images/CarnivoreR.png');
    wallTexture = loadImage('assets/images/brickWall.png');
}

/** Description of setup */
function setup() {
    createCanvas(windowWidth, windowHeight);
    textSize(width * 0.03);
    inMainGame = inMiniGame = false;
    menus = new Menus();
    game = new MainGame();
    game.setup();

}

/** Description of draw() */
function draw() {
    menus.run()
    if (!mouseIsPressed) {
        sameMouseClick = false;
    }
    if (!keyIsDown(27)) {
        sameEsc = false;
    }
}

function startGame1() {
    game = new DodgeEm();
    game.setup();
}