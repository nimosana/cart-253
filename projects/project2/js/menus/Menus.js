class Menus {

    constructor() {
        this.state = `mainMenu`;
        this.gameToRun;
        this.clickDelay = 0;
        this.buttons = [new Buttons(`soloMenu`), new Buttons(`versusMenu`),
        new Buttons(`clong`), new Buttons(`covid`), new Buttons(`love`), new Buttons(`clownapping`),
        new Buttons(`fishing`), new Buttons(`mainGame`)];

    }

    run() {
        if (this.state === `test`) {
            this.test();
        } else if (this.state === `mainMenu`) {
            this.mainMenu();
        } else if (this.state === `versusMenu`) {
            this.versusMenu();
        } else if (this.state === `soloMenu`) {
            this.soloMenu();
        } else if (this.state === `gameRunning`) {
            this.gameRunning();
        } else if (this.state === `mainGameRunning`) {
            this.mainGameRunning();
        }
    }
    test() {
        game.run();
    }

    mainMenu() {
        background(0);
        for (let button of this.buttons) {
            button.draw(this.state);
        }
        textAlign(CENTER, CENTER);
        fill(255);
        text(`Welcome to the minigame library\nClick to start`, width / 2, height / 8);
        text(`Press ESC to return to this menu\nor exit any game at any time`, width / 2, height * 7 / 8);
        if (this.clickDelay < 20) {
            this.clickDelay++;
        } else {
            for (let button of this.buttons) {
                if (button.checkPress(this.state)) {
                    break;
                }
            }
        }
    }

    versusMenu() {
        if (keyIsDown(27)) {
            this.clickDelay = 0;
            this.state = `mainMenu`;
        }
        background(0);
        fill(255);
        text(`versus menu\nSelect game`, width / 2, height / 8);
        text(`Press ESC to return to main menu\nor exit any game at any time`, width / 2, height * 7 / 8);
        fill(`cyan`);
        for (let button of this.buttons) {
            button.draw(this.state);
        }
        if (this.clickDelay < 20) {
            this.clickDelay++;
        } else {
            for (let button of this.buttons) {
                if (button.checkPress(this.state)) {
                    break;
                }
            }
        }
    }

    soloMenu() {
        if (keyIsDown(27)) {
            this.clickDelay = 0;
            this.state = `mainMenu`;
        }
        background(0);
        fill(255);
        text(`solo menu\nSelect game`, width / 2, height / 8);
        text(`Press ESC to return to main menu\nor exit any game at any time`, width / 2, height * 7 / 8);
        for (let button of this.buttons) {
            button.draw(this.state);
        }
        if (this.clickDelay < 20) {
            this.clickDelay++;
        } else {
            for (let button of this.buttons) {
                button.checkPress(this.state);
            }
        }
    }

    /**  */
    mainGameRunning() {
        game.run();
        if (keyIsDown(27)) {
            //check if the user pressed ESC
            if (inMainGame && !sameEsc) {
                this.state = `mainMenu`;
            } else if (inMiniGame) {
                noStroke();
                if (mainGameLevel === 1) {
                    // I won't force you to do anything.
                    if (vaccinations >= 2) {
                        obedient = true;
                        // But you should listen to me.
                    }
                    inMiniGame = false;
                    inMainGame = true;
                    sameEsc = true;
                    game = pausedGame;
                } else if (mainGameLevel === 2) {
                    // I just want you to be happy.
                    if (vaccinations >= 4 && inLove) {
                        obedient = true;
                    }
                    inMiniGame = false;
                    inMainGame = true;
                    sameEsc = true;
                    game = pausedGame;
                }
            }
        }
    }

    gameRunning() {
        game.run();
        if (keyIsDown(27)) {
            this.clickDelay = 0;
            this.state = `mainMenu`;
        }
    }
}


//
//
//
//
//
//