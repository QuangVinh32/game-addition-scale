export default class TrueScene extends Phaser.Scene {
    private buttonSound: Phaser.Sound.BaseSound | null = null;

    constructor() {
        super('TrueScene');
    }

    preload() {
        this.load.image('button_more','assets/images/button_more.png');
        this.load.audio('sound_initial', 'assets/audio/sound_initial.mp3');

    }
    
    create() {
        this.buttonSound = this.sound.add('sound_initial', {
            volume: 1,
        });

        this.add.text(this.scale.width / 2,
            430, 'Yes, you got it!', {
            fontSize: '20px Arial',
            color: 'black',
        }).setOrigin(0.5, 0.5).setResolution(2);

        let buttonImage = this.add.image(0, 0, 'button_more').setDisplaySize(150, 150);

        let buttonText = this.add.text(0, 0, 'More', {
            fontSize: '40px',
            fontStyle: 'bold',
            color: 'black',
        }).setOrigin(0.5, 0.5).setResolution(2);

        let buttonContainer = this.add.container(
            600,
            505,
            [buttonImage, buttonText]
        );

        buttonContainer
            .setSize(140, 140)
            .setInteractive();

        buttonContainer.on('pointerup', () => {
            if (this.buttonSound) {
                this.buttonSound.play();
            }

            this.tweens.add({
                targets: buttonContainer,
                scale: { from: 1, to: 1.1 }, 
                duration: 300,
                yoyo: true, 
                ease: 'Sine.easeInOut',
                onComplete: () => {
                    this.scene.start('LevelScene')
                    this.scene.stop('TrueScene')

                },
            });
        });
    }
}