import OpitionDTO from "../dtos/OptionDTO";
import BaseView from "./BaseView";

export default class OptionView extends BaseView {
    public optionData: OpitionDTO;
    public buttonOption: Phaser.GameObjects.Image;
    public textQuestion: Phaser.GameObjects.Text;
    public container: Phaser.GameObjects.Container;

    constructor(scene: Phaser.Scene, optionData: OpitionDTO) {
        super(scene);
        this.optionData = optionData;

        // Tạo container
        this.container = this.scene.add.container(optionData.positionX, optionData.positionY);
        this.updateContainerSize(optionData.width, optionData.height);
        this.createOption();
    }

    private createOption(): void {
        // Tạo button
        this.buttonOption = this.scene.add.image(0, 0, 'button_option')
            .setDisplaySize(this.optionData.width, this.optionData.height)
            .setOrigin(0.5, 0.5)
            // .setInteractive();
            ;

        // Tạo text
        this.textQuestion = this.scene.add.text(0, 0, Number(this.optionData.value).toFixed(0).toString(), 
        {
            fontSize: '50px',
            color: 'black',
            fontStyle: 'bold'
        }).setOrigin(0.5, 0.5).setResolution(2);

        // Thêm vào container
        this.container.add([this.buttonOption, this.textQuestion]);
    }
}
