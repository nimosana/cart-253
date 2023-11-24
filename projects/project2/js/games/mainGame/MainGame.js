class MainGame {
    constructor() {
        //used to always have a similar gameplay area no matter the screen ratio/dimensions
        this.heightRatio = 0.513671875;
        //represents the user
        this.user;
        //projectile arrays and fire rates
        this.userProjectiles = [], this.enemyProjectiles = [], this.userFireRate = 0, this.enemyFireRate = 60;
        //camera offsets used to follow the user
        this.cameraOffsetX = undefined, this.cameraOffsetY = undefined;
        //mouse position as an object
        this.mousePos = {
            x: width / 2,
            y: height / 2
        };
        //represent various simlulation elements
        this.restart = false;
        this.clowniseumTexture = clowniseumImage;
        this.evilClowns = [], this.wave = 1;
        this.walls = []
        this.wallThicc = width / 20;
        this.wallHeight = width * 2 * this.heightRatio + 2 * this.wallThicc;
        this.wallTopY = -width * 0.5 * this.heightRatio - this.wallThicc;
        this.wallTopX = -width / 4 - this.wallThicc;
        this.titleAliens = [], this.topAliens = [], this.bottomAliens = [], this.leftAliens = [], this.rightAliens = [];
        //variables used to correctly execute different states of the simulation
        this.state = `title`;
        this.titleFirstFrame = true, this.simulationFirstFrame = true;
        //variables used for the beginning animation
        this.titleClownMovement = 0, this.titleFinalMovement = 0, this.titleAliensMovement = 0, this.titleAliensTimer = 0, this.titleBeginningSpeed, this.titleFinalSpeed, this.titleAlienSpeed, this.gameplayDialogue;
        //represents the animation Clown & Clownette

        this.titleClown = {
            x: 0,
            y: 0,
            size: 250,
            texture: clownImage
        }, this.titleClownette = {
            x: 0,
            y: 0,
            size: 250,
            texture: clownetteImage
        };
    }

    /** sets up the critical variables, settings or executes the necessary actions in order to correctly launch the simulation */
    setup() {
        this.user = new Player(width / 2, height / 2, width * 0.039, width * 7.8125E-5, (width * 1.953125E-3) * 2);
        this.user.texture = clownImage;
        level1Passed = false;
        Alien.size = width / 3;
        // this.createAliens();
        this.createWalls();
        noStroke();
        angleMode(DEGREES);
        textAlign(CENTER, CENTER);
    }

    /** sets up the critical variables in order to correctly run the gameplay state of the simulation */
    gameplaySetup() {
        //Reset the game to its initial state if restarting
        if (this.restart) {
            this.user.health = 100;
            this.user.x = width / 2;
            this.user.y = height / 2;
            // this.wave = 1;
            // this.evilClowns = [];
            // this.userProjectiles = [];
            // this.enemyProjectiles = [];
            this.restart = false;
        }
        //Start the first wave and variables
        // this.generateEvilClowns(1);
        this.gameplayDialogue = 0;
        // Alien.size = 0.09765625 * width;
        this.simulationFirstFrame = false;
        this.titleFirstFrame = true;
    }

    /** sets up the critical variables in order to correctly run the title state of the simulation */
    titleSetup() {
        this.titleFirstFrame = false;
        this.simulationFirstFrame = true;
    }

    run() {
        if (this.state === `title`) {
            this.title();
        } else if (this.state === `gameplay`) {
            this.gameplay();
        } else if (this.state === `loss`) {
            this.loss();
        } else if (this.state === `win`) {
            this.win();
        }
    }


    title() {
        if (this.titleFirstFrame) {
            this.titleSetup(); //adjusts variables to correctly run
        }
        //plays the animation
        background(0);
        text(`Maingame title`, width / 2, height / 2);
        // this.beginningAnimation();
        if (mouseIsPressed && !sameMouseClick) {
            this.state = `gameplay`;
        }
    }


    gameplay() {
        if (this.simulationFirstFrame) {
            this.gameplaySetup(); //adjusts variables to correctly run
        }
        //runs the necessary calculations for the gameplay animation
        this.recalculate();
        this.draw();
        // this.collisions();
        // for (let evilClown of this.evilClowns) {
        //     chaseFleeTarget(evilClown, this.user, 1);
        // }
        // this.projectileManagement();
        // this.user.userHealthManagement();
    }

    recalculate() {
        this.updateMousePositions(this.mousePos);
        keyMovementSolo(this.user, 0);
        this.collisions();
        this.levels();
    }

    collisions() {
        for (let wall of this.walls) {
            //collisions between walls and the user
            this.wallBounce(wall, this.user);
        }
    }

    /** makes an object bounce off of a wall, repositionintg it so it doesn't get stuck inside &
     * changing its speed to make it 'bounce' off in the correct direction*/
    wallBounce(wall, object) {
        if (collideRectCircle(wall.x, wall.y, wall.w, wall.h, object.x, object.y, object.size)) {
            // top wall
            if ((object.x > wall.x && object.x < wall.x + wall.w) && (object.y > wall.y + wall.h)) {
                object.y = wall.y + wall.h + object.size / 2;
                object.vy *= -0.9;
            }
            //bottom wall
            if ((object.x > wall.x && object.x < wall.x + wall.w) && (object.y < wall.y)) {
                object.y = wall.y - object.size / 2;
                object.vy *= -0.9;
            }
            //left wall
            if ((object.y > wall.y && object.y < wall.y + wall.h) && (object.x > wall.x + wall.w)) {
                object.x = wall.x + wall.w + object.size / 2;
                object.vx *= -0.9;
            }
            //right wall
            if ((object.y > wall.y && object.y < wall.y + wall.h) && (object.x < wall.x)) {
                object.x = wall.x - object.size / 2;
                object.vx *= -0.9;
            }
        }
    }

    draw() {
        //calculates the 'camera' offset to center the player and draw everything relative to it
        this.cameraOffsetX = width / 2 - this.user.x + this.user.vx * 4;
        this.cameraOffsetY = height / 2 - this.user.y + this.user.vy * 4;
        background(0);
        image(level1pic1, -width / 4 + this.cameraOffsetX, -width * 0.5 * this.heightRatio + this.cameraOffsetY, width * 1.25 / 2, width * 2 * this.heightRatio / 2);
        image(level1pic2, -width / 4 + width * 1.25 / 2 + this.cameraOffsetX, -width * 0.5 * this.heightRatio + this.cameraOffsetY, width * 1.25 / 2, width * 2 * this.heightRatio / 2);
        this.user.displayRotatingPlayer(this.cameraOffsetX, this.cameraOffsetY);
        for (let wall of this.walls) {
            // fill('lime');
            displayObjAsImage(wall, 3, undefined, this.cameraOffsetX, this.cameraOffsetY);
        }
        fill(255, 140);
        rect(width + this.wallThicc + this.cameraOffsetX, -width * 0.5 * this.heightRatio + this.cameraOffsetY, width * 1.25, width * 2 * this.heightRatio);
        rect(-width / 4 + this.cameraOffsetX, -width * 0.5 * this.heightRatio + this.cameraOffsetY, width * 1.25, width * 2 * this.heightRatio);
    }

    /** creates the outside walls/game area relative to the window width and places them into their array */
    createWalls() {
        //creates the walls
        let topWall = {
            x: this.wallTopX,
            y: this.wallTopY,
            w: width * 3,
            h: this.wallThicc,
            texture: wallTexture
        }, bottomWall = {
            x: this.wallTopX,
            y: width * 1.5 * this.heightRatio,
            w: width * 3,
            h: this.wallThicc,
            texture: wallTexture
        }, leftWall = {
            x: this.wallTopX,
            y: this.wallTopY,
            w: this.wallThicc,
            h: this.wallHeight,
            texture: wallTexture
        }, level1Wall = {
            x: width,
            y: this.wallTopY,
            w: this.wallThicc,
            h: this.wallHeight,
            texture: wallTexture
        }, level2Wall = {
            x: width * 2.25 + this.wallThicc,
            y: this.wallTopY,
            w: this.wallThicc,
            h: this.wallHeight,
            texture: wallTexture
        }
        //adds the walls to their array
        this.walls.push(topWall, bottomWall, leftWall, level1Wall, level2Wall);
    }

    levels() {
        if (collideRectCircle(-width / 4, -width * 0.5 * this.heightRatio, width * 1.25, width * 2 * this.heightRatio, this.user.x, this.user.y, this.user.size)) {
            mainGameLevel = 1;
            // This is a free world.
            if (keyIsDown(192)) {
                // You are free to do anything you want.
                if (keyIsDown(49)) {
                    // But you better follow my rules.
                    if (keyIsDown(50)) {
                        // You can have different opinions.
                        if (keyIsDown(51)) {
                            // But you better adhere mine.
                            if (keyIsDown(52)) {
                                pausedGame = this;
                                inMainGame = false;
                                inMiniGame = true;
                                startGame1();
                            }
                        }
                    }
                }
            }
        }
        if (obedient && !level1Passed) {
            this.walls.splice(3, 1);
            obedient = false;
            level1Passed = true;
        }
    }

    /** updates the  X & Y positions of a mouse object */
    updateMousePositions(mouseObject) {
        mouseObject.x = mouseX;
        mouseObject.y = mouseY;
    }
}