import { BaseProgressBarModel, colorMap, LinearProgressBarModelView, LinearProgressBarView, Orientation } from "mct-common";

export default class UIScene extends Phaser.Scene {
    private levelId: number = 0;
    private correct: number = 0;
    private totalCorrect: number = 0;
    private incorrect: number = 0;
    private totalIncorrect: number = 0;
    private progressBar: any;
    private total: number = 0; // Biến tổng động


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
            this.total = this.total + this.correct * 10;
            
        } else {
            console.error("Score is invalid: ", this.correct);
        }

        if (!isNaN(this.incorrect)) {
            this.totalIncorrect += this.incorrect;
            this.total = this.total - this.incorrect * 10;
        } else {
            console.error("Score is invalid: ", this.incorrect);
        }
    }

    create() {

            const progressBarWidth = this.scale.width - 100;
            const progressBarHeight = 14;

            const progressBarModel = new BaseProgressBarModel(0, 100, this.total);
            console.log("Value",progressBarModel.value);


            const progressBarX = this.cameras.main.centerX - progressBarWidth / 2; // Trừ một nửa width
            const progressBarY = 70;
            
            this.progressBar = new LinearProgressBarView(
                this,
                progressBarModel,
                new LinearProgressBarModelView(
                    progressBarX, progressBarY,  // Căn giữa theo X
                    progressBarWidth, progressBarHeight,
                    colorMap.grayLight,        
                    colorMap.greenBright,
                    8,        
                    5000,      
                    0,        
                    Orientation.HORIZONTAL 
                )
            );
            console.log("tính",this.total)
            this.progressBar.setProgress(this.total);

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
