class Simulation {
    constructor(state) {
        this.state = state;
    }

    draw() {
        if (this.state === `title`) {
            this.title();
        } else if (this.state === `simulation`) {
            this.simulation();
        } else if (this.state === `waiting`) {
            this.waiting();
        } else if (this.state === `endGame`) {
            this.endGame();
        }
    }

    title() {
        background(0);
        fill("white");
        textAlign(CENTER, CENTER);
        text(`Clong\n2 Player game\nClick to start`, width / 2, height / 4);
        fill("cyan");
        textAlign(LEFT, CENTER);
        text(`Player 1:\nW - Up\nS - Down`, width * 0.02, height / 2);
        fill("red");
        textAlign(RIGHT, CENTER);
        text(`Player 2:\nUp arrow\nDown arrow`, width * 0.98, height / 2);
        ball.display();
        for (let paddle of paddles) {
            paddle.move();
            paddle.display();
        }
        if (mouseIsPressed) {
            this.state = `simulation`;
        }
    }

    simulation() {
        background(0);
        for (let paddle of paddles) {
            paddle.move();
            paddle.display();
        }
        ball.move();
        for (let paddle of paddles) {
            ball.bounce(paddle);
        }
        ball.display();
        this.displayScores();
    }
    /** displays the state of the game after a player scored 3 points */
    endGame() {
        background(0);
        // reset ball & paddles if not done yet
        if (roundEnded) {
            this.resetForNextRound();
            roundEnded = false;
        }
        // display the game's winner & option to rematch
        textAlign(CENTER, CENTER);
        if (lastRoundWinner === 1) {
            fill('cyan')
            text(`Player 1 won the game\n${wins1} : ${wins2}\nClick to rematch`, width / 2, height / 4);
        } else if (lastRoundWinner === 2) {
            fill('red');
            text(`Player 2 won the game\n${wins1} : ${wins2}\nClick to rematch`, width / 2, height / 4);
        }
        // display paddles & ball, allow paddle movement for fun
        for (let paddle of paddles) {
            paddle.move();
            paddle.display();
        }
        ball.display();
        if (mouseIsPressed) {
            this.state = `simulation`;
        }
    }

    /** waiting state inbetween rounds */
    waiting() {
        background(0);
        // reset ball & paddles if not done yet
        if (roundEnded) {
            this.resetForNextRound();
            roundEnded = false;
        }
        // display paddles & ball, allow paddle movement for fun
        for (let paddle of paddles) {
            paddle.display();
            paddle.move();
        }
        ball.display();
        // display scores and text according to last round's winner 
        this.displayScores();
        textAlign(CENTER, CENTER);
        if (lastRoundWinner === 1) {
            fill(`cyan`);
            text(`Player 1 won the round\nClick to continue`, width / 2, height / 4);
        } else if (lastRoundWinner === 2) {
            fill(`red`);
            text(`Player 2 won the round\nClick to continue`, width / 2, height / 4);
        }
        if (mouseIsPressed) {
            this.state = `simulation`;
        }
    }

    /** resets the paddle and the ball for the next round */
    resetForNextRound() {
        background(0);
        ball.x = width / 2;
        ball.y = height / 2;
        ball.vy = 0;
        if (lastRoundWinner === 1) {
            ball.vx = 3;
        } else if (lastRoundWinner === 2) {
            ball.vx = -3;
        }
        for (let paddle of paddles) {
            paddle.y = height / 2 - paddle.height / 2;
            paddle.vy = 0;
        }
    }

    /** displays the scores of the current game */
    displayScores() {
        textAlign(LEFT, TOP);
        fill(`Cyan`);
        text(score1, 0, 0);
        textAlign(RIGHT, TOP);
        fill(`Red`);
        text(score2, width, 0);
    }
} 