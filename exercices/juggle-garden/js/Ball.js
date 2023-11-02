class Ball {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = -10;
        this.ax = 0;
        this.ay = 0;
        this.maxSpeed = 10;
        this.size = 40;
        this.active = true;
    }

    gravity(force) {
        this.ay = this.ay + force;
    }

    move() {
        this.vx = this.vx + this.ax;
        this.vy = this.vy + this.ay;

        this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed);
        this.vy = constrain(this.vy, -this.maxSpeed, this.maxSpeed);

        this.x = this.x + this.vx;
        this.y = this.y + this.vy;

        if (this.y - this.size / 2 > height) {
            this.active = false;
        }
    }

    constrainToWindow() {
        if (this.y > height) {
            this.y = height;
            this.vy *= -1;
        } else if (this.y < 0) {
            this.y = 0;
            this.vy *= -1;
        }
    }

    bounce(paddle) {
        if (this.x > paddle.x - paddle.width / 2 &&
            this.x < paddle.x + paddle.width / 2 &&
            this.y + this.size / 2 > paddle.y - paddle.height / 2 &&
            this.y - this.size / 2 < paddle.y + paddle.height / 2) {
            // Bounce
            let dx = this.x - paddle.x;
            this.vx = this.vx + map(dx, -paddle.width / 2, paddle.width / 2, -2, 2);

            this.vy = -this.vy;
            this.ay = 0;
            return true;
        } else {
            return false;
        }
    }

    display() {
        push();
        fill(255, 50, 50);
        stroke(0);
        ellipse(this.x, this.y, this.size);
        pop();
    }

}