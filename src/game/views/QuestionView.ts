import { QuestionDTO } from "../dtos/QuestionDTO";
import BaseView from "./BaseView";

export default class QuestionView extends BaseView {
  
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
        // Create the text object
        this.calculationText = this.scene.add.text(0, 0, "", {
            fontSize: "70px Arial",
            color: "black",
            fontStyle: "bold",
        }).setResolution(2);
    
        // Create a container and add the text object to it
        const container = this.scene.add.container(0, 0, [this.calculationText]);
    
        // Adjust the origin of the calculationText instead
        this.calculationText.setOrigin(0.5, 0.5); // This adjusts the origin of the text within the container
    
        this.add([container]);
    }
    
    

    // public getAnswerText(): Phaser.GameObjects.Text {
    //     return this.answerText;
    // }

    public getCalculationText(): Phaser.GameObjects.Text {
        return this.calculationText;
    }
}
