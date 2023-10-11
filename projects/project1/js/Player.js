class Player {
    // user.size: approx. 100 for a 2560 px screen
    // user.accel: windowWidth * 7.8125E-5 = 0.2 for a 2560px width screen
    // user.maxSpeed: windowWidth * (1.953125E-3) * 3 = maxSpeed of 15 in a 2560x1440 screen
    constructor(x, y, size, accel, maxSpeed) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.size = size;
        this.accelX = this.accelY = accel;
        this.maxSpeed = maxSpeed;
        this.speed = 0;
        this.texture = undefined;
        this.userAngle;
    }
    /** Allows the user to control the player's speed with accelerations,
     *  using the arrow keys or WASD*/
    keyMovement() {
        //horizontal movement
        if ((keyIsDown(39) && !keyIsDown(37)) || (keyIsDown(68) && !keyIsDown(65))) {
            this.vx += this.accelX;
        } else if (keyIsDown(37) && !keyIsDown(39) || (keyIsDown(65) && !keyIsDown(68))) {
            this.vx -= this.accelX;
        } else if ((!keyIsDown(37) && !keyIsDown(39)) || (keyIsDown(37) && keyIsDown(39)) || (keyIsDown(65) && keyIsDown(68))) {
            if (abs(this.vx) > (this.maxSpeed * 0.01)) {
                this.vx /= 1.03;
            } else {
                this.vx = 0;
            }
        }
        //vertical movement
        if ((keyIsDown(38) && !keyIsDown(40)) || (keyIsDown(87) && !keyIsDown(83))) {
            this.vy -= this.accelY;
        } else if (keyIsDown(40) && !keyIsDown(38) || (keyIsDown(83) && !keyIsDown(87))) {
            this.vy += this.accelY;
        } else if ((!keyIsDown(40) && !keyIsDown(38)) || (keyIsDown(40) && keyIsDown(38)) || (keyIsDown(83) && keyIsDown(87))) {
            if (abs(this.vy) > (this.maxSpeed * 0.01)) {
                this.vy /= 1.03;
            } else {
                this.vy = 0;
            }
        }
        //limit to max speed
        this.speed = sqrt(pow(this.vx, 2) + pow(this.vy, 2));
        if (this.speed > this.maxSpeed) {
            this.vx *= (this.maxSpeed / this.speed);
            this.vy *= (this.maxSpeed / this.speed);
        }
        //move obj
        this.x += this.vx;
        this.y += this.vy;
        // console.log(`spd X: ${this.vx} spd Y: ${this.vy}`);
    }

    displayRotatingPlayer(cameraOffsetX, cameraOffsetY) {
        push();
        this.userAngle = atan2(mouseY - height / 2 - (user.vy * 4), mouseX - width / 2 - (user.vx * 4));
        translate(user.x + cameraOffsetX, user.y + cameraOffsetY);
        rotate(this.userAngle - 90);
        this.displayImageForRotation();
        pop();
        // console.log(`User angle: ${userAngle}`)
    }

    displayImageForRotation() {
        image(this.texture, -this.size / 2, -this.size / 2, this.size, this.size);
    }
}