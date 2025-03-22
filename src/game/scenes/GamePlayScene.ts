
export default class GamePlayScene extends Phaser.Scene {
    private buttonSound: Phaser.Sound.BaseSound | null = null;
    private isGameStarted: boolean = false;
    private progressBar: any;
    constructor() {
        super('GamePlayScene');
    }

    preload() {
        this.load.image('button', 'assets/images/button_more.png');
        this.load.audio('sound_initial', 'assets/audio/sound_initial.mp3');
    }

    create() {


        this.scene.launch('UIScene'); 
        this.scene.launch('LevelScene'); 

        


        this.buttonSound = this.sound.add('sound_initial', {
            volume: 1,
        });

        let buttonStart = this.add.image(0, 0, 'button').setDisplaySize(
            215,
            215
        );

        let startText = this.add.text(0, 0, 'Start', {
            fontSize: '55px Arial',
            fontStyle: 'bold',
            color: 'black',
        }).setOrigin(0.5, 0.5).setResolution(2);

        let buttonContainer = this.add.container(
            this.scale.width / 2,
            this.scale.height / 2.5,
            [buttonStart, startText]
        );

        buttonContainer.setSize(150, 150).setInteractive();

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
                    this.events.emit('gameStarted');
                    this.scene.stop('GamePlayScene');
                },
            });
        });
    }
}