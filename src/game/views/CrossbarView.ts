import { CrossbarDTO } from '../dtos/CrossbarDTO';
import BaseView from './BaseView';

export default class CrossbarView extends BaseView {
    public crossbarData: CrossbarDTO;
    private crossbar: Phaser.Physics.Arcade.Sprite;

    constructor(scene: Phaser.Scene, crossbarData: CrossbarDTO) {
        super(scene);
        this.crossbarData = crossbarData;
        this.createCrossbar();
        this.setViewPosition(crossbarData.positionX, crossbarData.positionY);
        // this.updateContainerSize(crossbarData.width, crossbarData.height);
    }

    private createCrossbar(): void {
        this.crossbar = this.scene.physics.add.sprite(
            0,
            0,
            this.crossbarData.texture
        )
        .setDisplaySize(this.crossbarData.width, this.crossbarData.height)
        .setOrigin(0.5, 0.5);
        this.add(this.crossbar);
    } 
}
