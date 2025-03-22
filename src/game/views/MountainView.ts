import { BaseView } from 'mct-common';
import { MountainDTO } from '../dtos/MountainDTO';

export default class MountainView extends BaseView {
    public mountainData: MountainDTO;
    private mountain: Phaser.Physics.Arcade.Sprite;

    constructor(scene: Phaser.Scene, mountainData: MountainDTO) {
        super(scene);
        this.mountainData = mountainData;
        this.createMountain();
        this.setViewPosition(mountainData.positionX, mountainData.positionY);
        this.updateContainerSize(mountainData.width, mountainData.height);
    }

    private createMountain(): void {
        this.mountain = this.scene.physics.add.sprite(
            0,
            0,
            this.mountainData.frame
        )
        
        .setDisplaySize(this.mountainData.width, this.mountainData.height)
        .setOrigin(0.5, 0.5);
        console.log("Monkey created at:", this.mountainData.frame);

        this.add(this.mountain);
    }

    public changeFrame(newFrame: string): void {
        if (this.scene.textures.exists(newFrame)) {
            this.mountain.setTexture(newFrame);
            console.log(`Frame changed to: ${newFrame}`);
        } else {
            console.error(`Texture "${newFrame}" does not exist.`);
        }
    }
}
