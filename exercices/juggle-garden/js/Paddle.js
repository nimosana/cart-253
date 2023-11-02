class Paddle {

    constructor(w, h, player) {
        this.width = w;
        this.height = h;
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
            if (keyIsDown(87)) {
                this.y -= 3;
            } else if (keyIsDown(83)) {
                this.y += 3;
            }
        } else if (this.player === 2) {
            if (keyIsDown(38)) {
                this.y -= 3;
            } else if (keyIsDown(40)) {
                this.y += 3;
            }
        }
    }

    display() {
        push();
        fill(255);
        noStroke();
        rect(this.x, this.y, this.width, this.height);
        pop();
    }

}