import { QuestionDTO } from "../dtos/QuestionDTO";
import BaseView from "./BaseView";

export default class QuestionView extends BaseView {
    setOrigin(arg0: number, arg1: number) {
        throw new Error("Method not implemented.");
    }
    public questionData: QuestionDTO;
    private answerText: Phaser.GameObjects.Text;
    private calculationText: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, questionData: QuestionDTO) {
        super(scene);
        this.questionData = questionData;
        this.createQuestion();
        this.setViewPosition(questionData.positionX, questionData.positionY);
    }

    public createQuestion(): void {
        
        // this.answerText = this.scene.add.text(0, 100, "Đáp án: ...", {
        //     fontSize: "20px Arial",
        //     color: "black",
        //     fontStyle: "bold",
        // }).setResolution(2);
    
        this.calculationText = this.scene.add.text(0, 0, "", {
            fontSize: "70px Arial",
            color: "black",
            fontStyle: "bold",
        }).setResolution(2);
    
        this.add([
            // this.answerText, 
            this.calculationText]);
    }

    // public getAnswerText(): Phaser.GameObjects.Text {
    //     return this.answerText;
    // }

    public getCalculationText(): Phaser.GameObjects.Text {
        return this.calculationText;
    }
}
