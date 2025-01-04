export default class FalseScene extends Phaser.Scene {
    private buttonSound: Phaser.Sound.BaseSound | null = null;

    constructor() {
        super('FalseScene');
    }

    preload() {
        this.load.image('button_more', 'assets/images/button_more.png');
        this.load.audio('sound_initial', 'assets/audio/sound_initial.mp3');
    }

    create() {

        const calculationString = this.registry.get('calculationString');
        const calculatedValue = this.registry.get('calculatedValue');

        console.log("Received calculation data:", calculationString, calculatedValue);

        this.buttonSound = this.sound.add('sound_initial', {
            volume: 1,
        });

        this.add.text(this.scale.width / 2,
            430, 'No, try again.', {
            fontSize: '20px Arial',
            color: 'black',
       }).setOrigin(0.5, 0.5).setResolution(2);

       this.add.text(this.scale.width / 2,
            450, 'select "more" to continue.', {
            fontSize: '10px Arial',
            color: 'black',
        }).setOrigin(0.5, 0.5).setResolution(2);

        const updatedCalculationString = calculationString.replace('?', calculatedValue);

        this.add.text(this.scale.width / 2,
            470, updatedCalculationString, {
            fontSize: '25px Arial',
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
                    this.scene.stop('FalseScene')

                },
            });
        });
    }
}
