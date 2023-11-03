class Paddle {

    constructor(w, h, player) {
        this.width = w;
        this.height = h;
        this.accel = 0.2;
        this.vy = 0;
        this.player = player;
        if (player === 1) {
            this.x = 0;
        } else if (player === 2) {
            this.x = width - w;
        }
        this.y = height / 2 - this.height / 2;
    }

    move() {
        if (this.player === 1) {
            if (keyIsDown(87) && !keyIsDown(83)) {
                this.vy -= this.accel;
            } else if (keyIsDown(83) && !keyIsDown(87)) {
                this.vy += this.accel;
            } else if ((!keyIsDown(87) && !keyIsDown(83)) || (keyIsDown(87) && keyIsDown(83))) {
                this.vy /= 1.03;
            }
        } else if (this.player === 2) {
            if (keyIsDown(38) && !keyIsDown(40)) {
                this.vy -= this.accel;
            } else if (keyIsDown(40) && !keyIsDown(38)) {
                this.vy += this.accel;
            } else if (!keyIsDown(40) && !keyIsDown(38) || (keyIsDown(40) && keyIsDown(38))) {
                this.vy /= 1.03;
            }
        }
        if (this.y < 0) {
            this.y = 0;
            this.vy *= -1;

        } else if (this.y + this.height > height) {
            this.y = height - this.height;
            this.vy *= -1;
        }
        this.y += this.vy;
    }

    display() {
        push();
        if (this.player === 1) {
            fill(`CYAN`);
        } else if (this.player === 2) {
            fill(`RED`);
        }
        noStroke();
        rect(this.x, this.y, this.width, this.height);
        pop();
    }
}