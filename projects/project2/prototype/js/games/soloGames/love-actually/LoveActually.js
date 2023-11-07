/**Exercise 3: Love, Actually
 * @author Nicolas Morales-Sanabria
 * 
 * In this game, the user controls a clown emoji that moves around trying to collect money,
 *  there are also "fish" (clowns with lipstick) following him around but keeping a set distance,
 *  as the user collects more money the fish get closer to the user. The game ends if the user makes
 *  contact with a fish or if the user collects a set amount of money. */
class LoveActually {
    //represents the user
    constructor() {
        this.user = {
            x: undefined,
            y: undefined,
            size: undefined,
            vx: 0,
            vy: 0,
            speed: 3,
            maxSpeed: undefined,
            accel: width * 3.9025E-5,
            texture: clownImage,
            money: 5
        };
        //array for all my fish
        this.fishInTheSea = [];
        //number of fish to create
        this.fishNumber = 1000;
        //speed of the fiRshies
        this.fishSpeed = 3;
        //texture used for the fish
        this.fishTexture = clownetteImage;
        //represents the money wads
        this.money = {
            x: 250,
            y: 250,
            size: undefined,
            texture: moneyImage
        }
        this.state = `title`;
        this.clickDelay = 0;
    }

    /** Sets the user's initial position, creates the fish array, places the money and sets the text style*/
    setup() {
        this.user.size = width * 0.04;
        this.user.maxSpeed = width * 0.001718;
        this.money.size = this.user.size;
        this.user.x = width / 2;
        this.user.y = height / 2;
        this.makeFishList();
        this.spawnMoney();
        textSize(width * 0.025);
        textAlign(CENTER, CENTER);
    }

    /** Draws the correct animation depending on the state of the game */
    run() {
        background(0);
        if (this.state === `title`) {
            this.title();
        }
        else if (this.state === `simulation`) {
            this.simulation();
        }
        else if (this.state === `love`) {
            this.love();
        }
        else if (this.state === `rich`) {
            this.rich();
        }
    }

    /** Displays the title screen */
    title() {
        fill(200, 100, 100);
        text("💘Modern love simulator💘\n\nGet that money💸\nWASD/Arrow Keys to move\nClick to start", width / 2, height / 2);
        if (this.clickDelay < 20) {
            this.clickDelay++;
        } else if (mouseIsPressed) {
            this.state = `simulation`;
        }
    }

    /** executes the functions necessary for the animation. Control the user, money and display the moving fish */
    simulation() {
        keyMovementSolo(this.user);
        this.lockInWindow(this.user);
        this.fishCuriosity();
        this.checkOverlap();
        this.display();
        if (this.user.money >= 1310720) {
            this.state = 'rich';
        }
    }

    /** Displays the animation when the user makes contact with a fish */
    love() {
        for (let i = 0; i < 3000; i++) { //thats alot of money!
            image(moneyImage, random(-this.money.size / 2, width), random(-this.money.size / 2, height), this.money.size, this.money.size);
        }
        push();
        rectMode(CENTER);
        fill(0, 0, 0, 120)
        rect(width / 2, height / 2, width * 0.2, height * 0.2);
        fill(255, 50, 50);
        text(`You found "love"\n\nClick to restart`, width / 2, height / 2);
        pop();
        if (mouseIsPressed) {
            this.resetGame();
        }
    }

    /** Display an alternative end animation if the user has earned enough money */
    rich() {
        for (let i = 0; i < 3000; i++) { //thats alot of money!
            image(moneyImage, random(-this.money.size / 2, width), random(-this.money.size / 2, height), this.money.size, this.money.size);
        }
        push();
        rectMode(CENTER);
        fill(0, 0, 0, 120)
        rect(width / 2, height / 2, width * 0.5, height * 0.3);
        fill(255, 50, 50);
        text(`You're way too rich for these clowns\n go get a Bugatti or something\n\nClick to restart`, width / 2, height / 2);
        pop();
        if (mouseIsPressed) {
            this.resetGame();
        }
    }

    /** detect if the user has had contact with the money or the fishies */
    checkOverlap() {
        // check if the user has grabbed money and if he does, move it & make him richer
        if (CommonGameFunctions.ellipseSuperpositionDetection(this.user, this.money)) {
            this.repositionEllipseOutsideOther(this.money, this.user);
            this.user.money *= 2;
            for (let fish of this.fishInTheSea) { // draw every "fish" closer ;)
                fish.curiosity -= this.user.size * 0.2;
            }
        }
        // change the game state if the user and a fish touch
        for (let fish of this.fishInTheSea) {
            if (CommonGameFunctions.ellipseSuperpositionDetection(this.user, fish)) {
                this.state = `love`;
            }
        }
    }

    /** displays the user, the fishies, the money wad & the money the user has */
    display() {
        // Display the user
        displayObjAsImage(this.user, 0);
        // Display the fishes
        fill("blue");
        for (let fish of this.fishInTheSea) {
            displayObjAsImage(fish, 2, clownetteImage);
        }
        //display the money
        displayObjAsImage(this.money, 0);
        push();
        textAlign(LEFT, TOP);
        fill(0, 0, 0, 150);
        rect(0, 0, width * 0.273, 80);
        fill('lime');
        text(`Money: ${this.user.money}`, 0, 0);
        pop();
    }

    /** generates a certain amount of fishies outside the user's personal space.
     * the fishes will each have a random position, and a random "curiosity" which
     * will affect how close they get to the user */
    makeFishList() {
        for (let i = 0; i < this.fishNumber; i++) {
            let tempPos = {
                x: random(0, width),
                y: random(0, height)
            }
            while (dist(this.user.x, this.user.y, tempPos.x, tempPos.y) < this.user.size * 2) {
                tempPos.x = random(0, width);
                tempPos.y = random(0, height);
            }
            let fish = {
                x: tempPos.x,
                y: tempPos.y,
                size: this.user.size,
                speed: 3,
                vx: 0,
                vy: 0,
                maxSpeed: width * 2.734E-3,
                directionX: 1,
                directionY: 1,
                accel: width * 9.7656E-5,
                curiosity: random(4 * this.user.size, 25 * this.user.size)
            };
            this.fishInTheSea.push(fish);
        }
    }

    /** generates a movement behavior for the fishies, makes them 
     * constantly chase the user and then flee when they are too close 
     * (depending on their curiosity). Also makes them have random spasms. */
    fishCuriosity() {
        for (let fish of this.fishInTheSea) {
            if (dist(this.user.x, this.user.y, fish.x, fish.y) > (this.user.size + fish.curiosity)) {
                chaseFleeTarget(fish, this.user, 1);
            }
            else {
                chaseFleeTarget(fish, this.user, -1);
            }
            this.randomSpasm(fish, 0.01, 0.5);
        }
    }

    /** Prevents an object from leaving the viewable window area, sets it back inside and inverts its speed.
     * @param obj object to be locked inside the window  */
    lockInWindow(obj) {
        //horizontally
        if ((obj.x < obj.size / 2)) {
            obj.x = obj.size / 2;
            obj.vx *= -1;
        }
        else if ((obj.x > width - obj.size / 2)) {
            obj.x = width - obj.size / 2;
            obj.vx *= -1;
        }
        //vertically
        if ((obj.y < obj.size / 2)) {
            obj.y = obj.size / 2;
            obj.vy *= -1;
        }
        else if ((obj.y > height - obj.size / 2)) {
            obj.y = height - obj.size / 2;
            obj.vy *= -1;
        }
    }

    /** allows for moving objects to have random spasms with set percentages and intensity
     * @param spasmer  object to introduce random speed changes to
     * @param odds % probability of a spasm to occur (between 0-1)
     * @param intensity an intensity multiplier relative to the max speed of the object */
    randomSpasm(spasmer, odds, intensity) {
        if (random(0, 1) <= odds) {
            spasmer.vx = random(-spasmer.maxSpeed * intensity, spasmer.maxSpeed * intensity);
            spasmer.vy = random(-spasmer.maxSpeed * intensity, spasmer.maxSpeed * intensity);
        }
    }

    /** Repositions an object while making sure it is outside another
     * a buffer distance multiplier can be added
     * @param obj the object to be randomly repositioned 
     * @param other the object to stay outside of
     * @param distMultiplier a distance multiplier buffer for extra space between the objects (>=1) */
    repositionEllipseOutsideOther(obj, other, distMultiplier) {
        let tempPos = {
            x: random(0, width),
            y: random(0, height)
        }
        while (dist(obj.x, obj.y, other.x, other.y) < (obj.size + other.size) * distMultiplier) {
            tempPos.x = random(0 + obj.size, width - obj.size);
            tempPos.y = random(0 + obj.size, height - obj.size);
        }
        obj.x = tempPos.x;
        obj.y = tempPos.y;
    }

    /** spawn the money ensuring it is outside the ellipse of the user*/
    spawnMoney() {
        let tempPos = {
            x: random(0 + this.money.size, width - this.money.size),
            y: random(0 + this.money.size, height - this.money.size)
        }
        while (dist(tempPos.x, tempPos.y, this.user.x, this.user.y) < (this.money.size + this.user.size)) {
            tempPos.x = random(0 + this.money.size, width - this.money.size);
            tempPos.y = random(0 + this.money.size, height - this.money.size);
        }
        this.money.x = tempPos.x;
        this.money.y = tempPos.y;
    }

    resetGame() {
        this.user.money = 5;
        this.user.x = width / 2;
        this.user.y = height / 2;
        this.fishInTheSea = [];
        this.makeFishList();
        this.state = "simulation";
    }
}