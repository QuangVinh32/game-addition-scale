import { BaseView } from "mct-common";
import { QuestionDTO } from "../dtos/QuestionDTO";

export default class QuestionView extends BaseView {
  
    public questionData: QuestionDTO;
    private calculationText: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, questionData: QuestionDTO) {
        super(scene);
        this.questionData = questionData;
        this.createQuestion();
        this.setViewPosition(questionData.positionX, questionData.positionY);
    }

    public createQuestion(): void {

        this.calculationText = this.scene.add.text(0, 0, "", {
            fontSize: "70px Arial",
            color: "black",
            fontStyle: "bold",
        }).setResolution(2);
    
        const container = this.scene.add.container(0, 0, [this.calculationText]);
    
        this.calculationText.setOrigin(0.5, 0.5);
    
        this.add([container]);
    }

    public getCalculationText(): Phaser.GameObjects.Text {
        return this.calculationText;
    }
}
