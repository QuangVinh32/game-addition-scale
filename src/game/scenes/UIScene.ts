export default class UIScene extends Phaser.Scene {
    private levelId: number = 0;
    private correct: number = 0;
    private totalCorrect: number = 0;
    private incorrect: number = 0;
    private totalIncorrect: number = 0;

    private readonly SCORE_FONT_SIZE = '17px Arial';

    constructor() {
        super("UIScene");
    }

    init(data: { levelId: number, correct: number, incorrect: number }) {
        this.levelId = data.levelId || 0;
        this.correct = data.correct || 0; 
        this.incorrect = data.incorrect || 0
        console.log("correct,incorrect",this.correct,this.incorrect)

         if (this.levelId === 1) {
            this.correct = 0;
            this.incorrect = 0;
        }

        if (!isNaN(this.correct)) {
            this.totalCorrect += this.correct;
        } else {
            console.error("Score is invalid: ", this.correct);
        }

        if (!isNaN(this.incorrect)) {
            this.totalIncorrect += this.incorrect;
        } else {
            console.error("Score is invalid: ", this.incorrect);
        }
    }

    create() {

        this.add.text(
            480,
            15, 
            `Correct: ${this.totalCorrect}`, { 
                fontSize: this.SCORE_FONT_SIZE, 
                color: 'black',
            }
        ).setResolution(2);
        
        this.add.text(
            580,
            15, 
            `Incorrect: ${this.totalIncorrect}`, { 
                fontSize: this.SCORE_FONT_SIZE, 
                color: 'black',
            }
        ).setResolution(2);
    }
}
