class Alien {
    static offset = 0;
    static offset2 = 0;
    static offset3 = 0;
    static offset4 = 0;
    static randomColorR1;
    static randomColorB1;
    static randomColorG1;
    static randomColorR2;
    static randomColorG2;
    static randomColorB2;
    static randomColorR3;
    static randomColorG3;
    static randomColorB3;
    static randomColorR4;
    static randomColorG4;
    static randomColorB4;
    static randomColorR5;
    static randomColorG5;
    static randomColorB5;
    static randomColorR6;
    static randomColorG6;
    static randomColorB6;
    static size = 250;
    static direction = 1;
    static direction2 = 1;
    static direction3 = 1;
    static direction4 = 1;
    static xOffset = 0;
    static yOffset = 0;

    constructor(x, y) {
        this.x1 = x;
        this.y1 = y;
        this.horizontalMovement = this.verticalMovement = 0;
        this.cameraOffsetX;
        this.cameraOffsetY;
    }
    drawAlien() {
        strokeWeight(Alien.size * 0.04);
        // y1 = -(size / 3);
        //randomize colors and determine next movement
        // this.randomColors();
        // this.boppingX(this.size * 0.02);
        // this.boppingY(this.size * 0.06);
        // this.bodyWiggle(this.size * 0.04);
        // this.eyesClosing();
        this.horizontalMovement = Alien.xOffset + this.x1;
        this.verticalMovement = Alien.yOffset + this.y1;
        //The following code draws the alien
        //top of the head
        console.log(`aaa ${(Alien.size / 2) + this.horizontalMovement}`)
        noStroke();
        fill(Alien.randomColorR1, Alien.randomColorG1, Alien.randomColorB1);
        ellipse((Alien.size / 2) + this.horizontalMovement, (Alien.size / 2) + (Alien.size / 8) + this.verticalMovement, Alien.size / 2, Alien.size / 4);
        fill(0);
        rect(0 + this.x1, Alien.size * (5 / 8) + this.verticalMovement+1, Alien.size, Alien.size);
        fill(Alien.randomColorR1, Alien.randomColorG1, Alien.randomColorB1);
        stroke(Alien.randomColorR1, Alien.randomColorG1, Alien.randomColorB1);
        //left arm
        line(Alien.size / 2 + this.horizontalMovement, Alien.size + this.verticalMovement, (Alien.size / 8) + this.horizontalMovement, Alien.size - (Alien.yOffset / 5) + this.y1 + Alien.size * 0.1);
        line((Alien.size / 8) + this.horizontalMovement, Alien.size - (Alien.yOffset / 5) + this.y1 + Alien.size * 0.1, (Alien.size * 0.2) + this.horizontalMovement, Alien.size - Alien.yOffset * 5 + this.y1 + -Alien.size * 0.1);
        //right arm
        line(Alien.size / 2 + this.horizontalMovement, Alien.size + this.verticalMovement, (Alien.size * 0.875) + this.horizontalMovement, Alien.size - (Alien.yOffset / 5) + this.y1 + Alien.size * 0.1);
        line((Alien.size * 0.875) + this.horizontalMovement, Alien.size - (Alien.yOffset / 5) + this.y1 + Alien.size * 0.1, (Alien.size * 0.8) + this.horizontalMovement, Alien.size + Alien.yOffset * 5 + this.y1 + -Alien.size * 0.1);
        noStroke();
        //body
        ellipse((Alien.size / 2) + this.horizontalMovement, Alien.size + this.verticalMovement + Alien.size * 0.36, (Alien.size / 4) + Alien.offset3, Alien.size + Alien.offset3);
        fill(0);
        rect((Alien.size / 2) + this.horizontalMovement - (Alien.size / 4), Alien.size + this.verticalMovement + Alien.size * 0.4, (Alien.size / 2))
        //CLASSIFIED
        fill(Alien.randomColorR2, Alien.randomColorG2, Alien.randomColorB2);
        push();
        textSize(Alien.size * 0.04);
        text("BELIEVE", (Alien.size / 2) + this.horizontalMovement, (Alien.size / 2) + this.verticalMovement + Alien.size * 0.75);
        pop();
        //bottom of the head
        fill(Alien.randomColorR1, Alien.randomColorG1, Alien.randomColorB1);
        triangle(Alien.size / 4 + this.horizontalMovement, Alien.size * (5 / 8) + this.verticalMovement, (Alien.size * 0.75) + this.horizontalMovement, Alien.size * (5 / 8) + this.verticalMovement,
            (Alien.size / 2) + this.x1, Alien.size + this.verticalMovement);
        //mouth
        fill(Alien.randomColorR2, Alien.randomColorG2, Alien.randomColorB2);
        ellipse((Alien.size / 2) + this.horizontalMovement, (Alien.size * 3 / 4) + this.verticalMovement, Alien.size / 8, Alien.size / 4);
        fill(Alien.randomColorR1, Alien.randomColorG1, Alien.randomColorB1);
        ellipse((Alien.size / 2) + this.horizontalMovement, (Alien.size * 3 / 4) - Alien.size * 0.02 + this.verticalMovement, Alien.size / 7, Alien.size / 4);
        //left eye
        angleMode(RADIANS);
        push();
        fill(Alien.randomColorR3, Alien.randomColorG3, Alien.randomColorB3);
        translate(Alien.size * (6 / 16) - Alien.size * 0.016 + this.horizontalMovement, Alien.size * (10.6 / 16) + this.verticalMovement);
        rotate(PI / 7);
        ellipse(0, 0, Alien.size * 0.24, Alien.size * 0.04 + Alien.offset4);
        pop();
        //right eye
        push();
        translate(Alien.size * (10 / 16) + Alien.size * 0.016 + this.horizontalMovement, Alien.size * (10.6 / 16) + this.verticalMovement);
        rotate(-(PI / 7));
        fill(Alien.randomColorR4, Alien.randomColorG4, Alien.randomColorB4);
        ellipse(0, 0, Alien.size * 0.24, Alien.size * 0.04 + Alien.offset4);
        pop();
        //nostrils
        fill(Alien.randomColorR5, Alien.randomColorG5, Alien.randomColorB5);
        ellipse(Alien.size * (8 / 16) - Alien.size * 0.02 + this.horizontalMovement, (Alien.size / 1.5) + Alien.size * 0.1 + this.verticalMovement, Alien.size * 0.01, Alien.size * 0.01);
        fill(Alien.randomColorR6, Alien.randomColorG6, Alien.randomColorB6);
        ellipse(Alien.size * (8 / 16) + Alien.size * 0.02 + this.horizontalMovement, (Alien.size / 1.5) + Alien.size * 0.1 + this.verticalMovement, Alien.size * 0.01, Alien.size * 0.01);
        angleMode(DEGREES);
    }
    /**
     * Randomizes the RGB values for the different colors used
    */
    static randomColors() {
        //body & head
        Alien.randomColorR1 = (Math.random() * 80);
        Alien.randomColorG1 = (Math.random() * 80);
        Alien.randomColorB1 = (Math.random() * 80);
        //mouth & text
        Alien.randomColorR2 = (Math.random() * 160);
        Alien.randomColorG2 = (Math.random() * 160);
        Alien.randomColorB2 = (Math.random() * 160);
        //left eye
        Alien.randomColorR3 = (Math.random() * 255);
        Alien.randomColorG3 = (Math.random() * 255);
        Alien.randomColorB3 = (Math.random() * 255);
        //right eye
        Alien.randomColorR4 = (Math.random() * 255);
        Alien.randomColorG4 = (Math.random() * 255);
        Alien.randomColorB4 = (Math.random() * 255);
        //nostrils
        Alien.randomColorR5 = (Math.random() * 120);
        Alien.randomColorG5 = (Math.random() * 120);
        Alien.randomColorB5 = (Math.random() * 120);
        Alien.randomColorR6 = (Math.random() * 120);
        Alien.randomColorG6 = (Math.random() * 120);
        Alien.randomColorB6 = (Math.random() * 120);
    }
    /**
     * creates a left-right movement, modifying the xOffset.
     * @param maxOffset maximum value of the offset (absolute)
    */
    static boppingX(maxOffset) {
        Alien.offset += Alien.direction * Alien.size * 2.1E-3;
        if (Alien.offset >= maxOffset || Alien.offset <= -maxOffset) {
            Alien.direction *= -1;
        }
        Alien.xOffset = Alien.offset;
    }
    /**
     * creates an up-down movement, modifying the yOffset.
     * @param maxOffset maximum value of the offset (absolute)
    */
    static boppingY(maxOffset) {
        Alien.offset2 += Alien.direction2 * Alien.size * 4.2E-3;
        if (Alien.offset2 >= maxOffset || Alien.offset2 <= -maxOffset) {
            Alien.direction2 *= -1;
        }
        Alien.yOffset = Alien.offset2;
    }
    /**
     * generates the open and closing movement of the eyes
     */
    static eyesClosing() {
        let maxOffset = Alien.size * 0.04;
        Alien.offset4 += Alien.direction4 * (Alien.size * 0.04) / 30;
        if (Alien.offset4 >= maxOffset || Alien.offset4 <= -maxOffset) {
            Alien.direction4 *= -1;
        }
    }
    /**
     * modifies offset3, the value oscillates between its max offset
     * @param maxOffset maximum value of the offset (absolute)
    */
    static bodyWiggle(maxOffset) {
        Alien.offset3 += Alien.direction3 * 2E-3;
        if (Alien.offset3 >= maxOffset || Alien.offset3 <= -maxOffset) {
            Alien.direction3 *= -1;
        }
    }
}