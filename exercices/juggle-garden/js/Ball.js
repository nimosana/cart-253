class Ball {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 3;
        this.vy = 0;
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

        if (this.x < 0 || this.x > width) {
            this.active = false;
        }
    }

    constrainToWindow() {
        if (this.y > height - this.size / 2) {
            this.y = height - this.size / 2;
            this.vy *= -1;
        } else if (this.y < this.size / 2) {
            this.y = 0 + this.size / 2;
            this.vy *= -1;
        }
    }

    bounce(paddle) {
        let dx = this.y - paddle.y - paddle.height / 2;
        if (paddle.player === 1) {
            if (collideRectCircle(paddle.x, paddle.y, paddle.width, paddle.height, this.x, this.y, this.size)) {
                this.x = paddle.x + paddle.width + this.size / 2;
                this.vx *= -1;
                this.vy = this.vy + map(dx, -paddle.height / 2, paddle.height / 2, -2, 2);
            }
        } else if (paddle.player === 2) {
            if (collideRectCircle(paddle.x, paddle.y, paddle.width, paddle.height, this.x, this.y, this.size)) {
                this.x = width - paddle.width - this.size / 2;
                this.vx *= -1;
                this.vy = this.vy + map(dx, -paddle.height / 2, paddle.height / 2, -2, 2);
            }
        }
        // Bounce
    }

    display() {
        push();
        fill(255, 50, 50);
        stroke(0);
        image(imageBalls, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        pop();
    }

}