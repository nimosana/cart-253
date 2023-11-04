/** Clong class
 * @author Nicolas Morales-Sanabria
 * Allows the creation of simulations/instances of the clong game,
 * contains every function necessary to run the game*/
class Clong {
    /** Allows the creation of a simulation/instance of  clong;
     * @param state the initial state of the simulation */
    constructor(state) {
        this.state = state;
        this.score1 = 0;
        this.score2 = 0;
        this.wins1 = 0;
        this.wins2 = 0;
        this.lastRoundWinner;
        this.roundEnded = false;
        this.ball = new Ball(width / 2, height / 2);
        this.paddles = [new Paddle(20, 200, 1), new Paddle(20, 200, 2)];
    }

    /** runs the correct part of clong according to the state of the instance*/
    run() {
        if (this.state === `title`) {
            this.title();
        } else if (this.state === `gameplay`) {
            this.gameplay();
        } else if (this.state === `waiting`) {
            this.waiting();
        } else if (this.state === `endGame`) {
            this.endGame();
        }
    }

    /** displays the title of the game, instructions,ball & paddles, allows the movement of paddles */
    title() {
        background(0);
        //display text
        fill("white");
        textAlign(CENTER, CENTER);
        text(`Clong\n2 Player game\nClick to start`, width / 2, height / 4);
        fill("cyan");
        textAlign(LEFT, CENTER);
        text(`Player 1:\nW - Up\nS - Down`, width * 0.02, height / 2);
        fill("red");
        textAlign(RIGHT, CENTER);
        text(`Player 2:\nUp arrow\nDown arrow`, width * 0.98, height / 2);
        //display ball/paddles and move paddles
        this.ball.display();
        for (let paddle of this.paddles) {
            paddle.move();
            paddle.display();
        }
        if (mouseIsPressed) {
            this.state = `gameplay`;
        }
    }
    /** displays the gameplay,score and handles the movement/display of the ball & paddles*/
    gameplay() {
        background(0);
        for (let paddle of this.paddles) {
            paddle.move();
            paddle.display();
        }
        this.ball.move();
        for (let paddle of this.paddles) {
            this.ball.bounce(paddle);
        }
        this.ball.display();
        this.displayScores();
    }
    /** displays the state of the game after a player scored 3 points */
    endGame() {
        background(0);
        // reset ball & paddles if not done yet
        if (this.roundEnded) {
            this.resetForNextRound();
            this.roundEnded = false;
        }
        // display the game's winner & option to rematch
        textAlign(CENTER, CENTER);
        if (this.lastRoundWinner === 1) {
            fill('cyan')
            text(`Player 1 won the game\n${this.wins1} : ${this.wins2}\nClick to rematch`, width / 2, height / 4);
        } else if (this.lastRoundWinner === 2) {
            fill('red');
            text(`Player 2 won the game\n${this.wins1} : ${this.wins2}\nClick to rematch`, width / 2, height / 4);
        }
        // display paddles & ball, allow paddle movement for fun
        for (let paddle of this.paddles) {
            paddle.move();
            paddle.display();
        }
        this.ball.display();
        if (mouseIsPressed) {
            this.state = `gameplay`;
        }
    }

    /** waiting/end state between rounds */
    waiting() {
        background(0);
        // reset ball & paddles if not done yet
        if (this.roundEnded) {
            this.resetForNextRound();
            this.roundEnded = false;
        }
        // display paddles & ball, allow paddle movement for fun
        for (let paddle of this.paddles) {
            paddle.display();
            paddle.move();
        }
        this.ball.display();
        // display scores and text according to last round's winner 
        this.displayScores();
        textAlign(CENTER, CENTER);
        if (this.lastRoundWinner === 1) {
            fill(`cyan`);
            text(`Player 1 won the round\nClick to continue`, width / 2, height / 4);
        } else if (this.lastRoundWinner === 2) {
            fill(`red`);
            text(`Player 2 won the round\nClick to continue`, width / 2, height / 4);
        }
        if (mouseIsPressed) {
            this.state = `gameplay`;
        }
    }

    /** resets the paddle and the ball for the next round */
    resetForNextRound() {
        background(0);
        this.ball.x = width / 2;
        this.ball.y = height / 2;
        this.ball.vy = 0;
        if (this.lastRoundWinner === 1) {
            this.ball.vx = 3;
        } else if (this.lastRoundWinner === 2) {
            this.ball.vx = -3;
        }
        for (let paddle of this.paddles) {
            paddle.y = height / 2 - paddle.height / 2;
            paddle.vy = 0;
        }
    }

    /** displays the scores of the current game */
    displayScores() {
        textAlign(LEFT, TOP);
        fill(`Cyan`);
        text(this.score1, 0, 0);
        textAlign(RIGHT, TOP);
        fill(`Red`);
        text(this.score2, width, 0);
    }
} 