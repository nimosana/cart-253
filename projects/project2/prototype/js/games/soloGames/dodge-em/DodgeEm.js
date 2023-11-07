/**Exercise 2: Dodge em!
 * @author Nicolas Morales-Sanabria
 * 
 * You are a clown! Get as many vaccinations as possible before catching covid, 
 * the game will end if you are touched by the virus and a special animation will appear.*/
class DodgeEm {

    constructor() {
        this.clickDelay = 0;
        //represents the user/player
        this.user = new Player(width / 2, height, 100, 0.4, 10);
        //represents the virus
        this.virus = new Player(width / 2, 0, 100, 0.3, 10);
        //mouse position as an object
        this.mousePos = {
            x: 250,
            y: 250
        };

        //represents the syringe
        this.syringe = {
            x: 250,
            y: 250,
            size: 60,
            yDraw: 0
        };

        this.staticAmount = 100;
        this.firstEndFrame = true;
        this.finalSyringesDisplayed = 0, this.finalClownsDisplayed = 0;
        this.state = "title";
    }

    /** Description of setup*/
    setup() {
        textAlign(CENTER, CENTER);
        textSize(width * 0.0234);
        this.virus.texture = virusImage;
        this.syringe.x = random(this.syringe.size, width - this.syringe.size);
        this.syringe.y = random(this.syringe.size, height - this.syringe.size);
        this.syringe.yDraw = this.syringe.y - this.syringe.size / 2;
    }

    /** Description of draw() */
    run() {
        if (this.state === "title") {
            this.title();
        } else if (this.state === "simulation") {
            this.simulation();
        } else if (this.state === "loss") {
            this.loss();
        }
    }

    title() {
        background(0);
        fill("red");
        push();
        text("Get as many vaccinations as possible\n don't catch (or get caught by) covid!\n\nYou're the clown, guide him with the mouse\nClick to start", width / 2, height / 2)
        pop();
        if (this.clickDelay < 20) {
            this.clickDelay++;
        } else if (mouseIsPressed) {
            this.state = `simulation`;
        }
    }

    loss() {
        if (this.firstEndFrame) {
            background(0); //clean the background if the player just died
            this.firstEndFrame = false;
            noStroke();
        }
        //display a syringe for every syringe the player had when he died, every 30 frames
        if ((frameCount % 30 === 0) && (this.finalSyringesDisplayed < this.user.vaccinations)) {
            this.drawSyringe(random(this.syringe.size, width - this.syringe.size), this.syringe.yDraw = random(this.syringe.size, height - this.syringe.size), this.syringe.size);
            this.finalSyringesDisplayed++;
        }
        //when all the final syringes are displayed,taunt the user with the shots he had when he died
        if ((this.finalSyringesDisplayed === this.user.vaccinations) || this.user.vaccinations === 0) {
            if (this.finalClownsDisplayed < this.user.vaccinations) {
                for (let i = 0; i < this.user.vaccinations; i++) { //clown the user for every vaccination he had
                    image(this.user.texture, random(0, width - this.user.size), random(0, height - this.user.size), this.user.size, this.user.size);
                    this.finalClownsDisplayed++;
                }
            }
            fill("red");
            if (this.user.vaccinations < 1) { //write the correct message depending on the amount of syringes caught
                text("YOU DIED OF COVID\n UNVACCINATED\n\nClick to restart", width / 2, height / 2);
            } else if (this.user.vaccinations === 1) {
                text("YOU HAD YOUR SHOT\n AND STILL DIED\n\nClick to restart", width / 2, height / 2);
            } else if (this.user.vaccinations >= 1) {
                text("YOU HAD " + this.user.vaccinations + " SHOTS\n AND STILL DIED\n\nClick to restart", width / 2, height / 2);
            }
        }
        //reset and start a new game
        if (mouseIsPressed) {
            this.finalSyringesDisplayed = this.finalClownsDisplayed = 0;
            this.syringe.x = random(this.syringe.size, width - this.syringe.size);
            this.syringe.y = random(this.syringe.size, height - this.syringe.size);
            this.syringe.yDraw = this.syringe.y - this.syringe.size / 2;
            while (CommonGameFunctions.ellipseSuperpositionDetection(this.user, this.syringe)) {
                this.syringe.x = random(this.syringe.size, width - this.syringe.size);
                this.syringe.yDraw = random(this.syringe.size, height - this.syringe.size);
                this.syringe.y = this.syringe.yDraw + this.syringe.size / 2;
            }
            this.firstEndFrame = true;
            this.user.x = width / 2;
            this.user.y = height;
            this.virus.x = width / 2;
            this.virus.y = 0;
            this.user.vaccinations = this.user.vx = this.user.vy = this.virus.vx = this.virus.vy = 0;
            this.state = "simulation";
        }
    }

    simulation() {
        noStroke(); //display vaccinations/syringes caught
        //normal animation
        background(0);
        //display vaccinations/syringes caught
        push();
        fill("cyan");
        textAlign(LEFT, TOP);
        text(`Vaccinations: ${this.user.vaccinations}`, 0, 0);
        pop();
        //display static background dots
        for (let i = 0; i < this.staticAmount; i++) {
            let x = random(0, width);
            let y = random(0, height);
            stroke(random(0, 255), random(0, 255), random(0, 255), random(0, 255));
            strokeWeight(random(1, 10));
            point(x, y);
        }
        //draw the syringe with a random strokeweight from the static to have a trippy effect
        this.drawSyringe(this.syringe.x, this.syringe.yDraw, this.syringe.size);
        //update mousePos X & Y
        this.updateMousePositions(this.mousePos);
        //make the user chase the mousePos and virus chase the user
        chaseFleeTarget(this.user, this.mousePos, 1);
        chaseFleeTarget(this.virus, this.user, 1);
        //display virus & user
        displayObjAsImage(this.virus, 0);
        displayObjRotatingToTarget(this.user, this.mousePos, clownImage, 0, 0);
        fill("red");
        //if the user touches the syringe, teleport it
        if (CommonGameFunctions.ellipseSuperpositionDetection(this.user, this.syringe)) {
            //make sure the new syringe is not overlapping the user
            while (CommonGameFunctions.ellipseSuperpositionDetection(this.user, this.syringe)) {
                this.syringe.x = random(this.syringe.size, width - this.syringe.size);
                this.syringe.yDraw = random(this.syringe.size, height - this.syringe.size);
                this.syringe.y = this.syringe.yDraw + this.syringe.size / 2;
            }
            this.user.vaccinations++;
        }
        //Check user & virus superposition (game end)
        if (CommonGameFunctions.ellipseSuperpositionDetection(this.virus, this.user)) {
            this.state = "loss";
        }
    }

    /** updates the  X & Y positions of a mouse object */
    updateMousePositions(mouseObject) {
        mouseObject.x = mouseX;
        mouseObject.y = mouseY;
    }

    /** draws a syringe */
    drawSyringe(x, yDraw, size) {
        fill(0, 255, 255);
        rect(x - size / 6, yDraw + size / 12, size / 3, size / 12);
        rect(x - size / 12, yDraw + size / 12, size / 6, size / 4);
        rect(x - size / 4, yDraw + size / 3, size / 2, size / 12);
        rect(x - size / 8, yDraw + size / 2.4, size / 4, size / 2);
        strokeWeight(1);
        triangle(x - size / 24, yDraw + (size / 1.09), x + size / 24, yDraw + (size / 1.09), x, yDraw + (size * 1.2));
        // ellipse(x, yDraw + size / 2, size); //check hitbox
    }
}