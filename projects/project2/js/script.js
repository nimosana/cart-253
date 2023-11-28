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
let obedient = false;
let levelsPassed = false;
let inlove, rich, dedicated;
let inMainGame, inMiniGame, vaccinations, mainGameLevel;
let sameMouseClick = false, sameEsc = false;
let clownImage, clownetteImage, evilClownImage;
let clowniseumImage, wallTexture;
let fishermanImage;
let fishTexture, evilTexture;
let moneyImage;
let virusImage;
let runningMainGame = true;
let level1pic1, level1pic2, level2pic1, level2pic2, level3pic1, level3pic2;

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
    level1pic1 = loadImage('assets/images/level1-1.png');
    level1pic2 = loadImage('assets/images/level1-2.png');
    level2pic1 = loadImage('assets/images/level2-1.png');
    level2pic2 = loadImage('assets/images/level2-2.png');
    level3pic1 = loadImage('assets/images/level3-1.png');
    level3pic2 = loadImage('assets/images/level3-2.png');
}

/** Description of setup */
function setup() {
    createCanvas(windowWidth, windowHeight);
    textSize(width * 0.03);
    inMainGame = inMiniGame = false;
    dedicated = inlove = rich = false;
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

function startGames(number) {
    switch (number) {
        case 1:
            game = new DodgeEm();
            game.setup();
            break;
        case 2:
            game = new AgeOfAquariums();
            game.setup();
            break;
        case 3:
            game = new LoveActually();
            game.setup();
            break;
        default:
            console.log("invalid game number");
            break;
    }
}


function startGame2() {
    game = new LoveActually();
    game.setup();
}