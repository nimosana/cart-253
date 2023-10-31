class Paddle {

    constructor(w, h) {
        this.width = w;
        this.height = h;
        this.x = width / 2;
        this.y = height - this.height / 2;
    }

    move() {
        if (keyIsDown(37) || keyIsDown(65)) {
            this.x -= 3;
        } else if (keyIsDown(39) || keyIsDown(68)) {
            this.x += 3;
        }
    }

    display() {
        push();
        fill(255);
        noStroke();
        rectMode(CENTER);
        rect(this.x, this.y, this.width, this.height);
        pop();
    }

}