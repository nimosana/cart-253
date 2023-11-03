class States {

    static title() {
        background(0);
        fill("white");
        text("Clong", width / 2, height / 2);
        if (mouseIsPressed) {
            state = `simulation`;
        }
    }

    static simulation() {
        background(0);
        for (let paddle of paddles) {
            paddle.move();
            paddle.display();
        }

        if (ball.active) {
            ball.move();
            ball.constrainToWindow();
            for (let paddle of paddles) {
                if (ball.bounce(paddle)) {
                    score++;
                }
            }
            ball.display();
        } else {
            balls.splice(i, 1);
        }
        if (!ball.active) {
            state = `loss`;
        }
    }

    static loss() {
        background(0);
        text("haha loser", width / 2, height / 2);
    }
}