import OptionDTO from "../dtos/OptionDTO";
import OptionView from "../views/OptionView";
import GamePlayScene from "./GamePlayScene";

export class QuestionAndOptionScene extends Phaser.Scene {
    public successSound: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
    public failureSound: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound; 
    public placementSound: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound; 

    private levelId: number;
    private correct: number;
    private incorrect: number;
    private optionViews: OptionView[] = [];    
    private boundaryGraphics: Phaser.GameObjects.Graphics;
    private isGameStarted: boolean;



    
    constructor() {
        super('QuestionAndOptionScene');
    }

    init(data: {levelId: number, correct: number, incorrect: number}) {
        this.levelId = data.levelId;
        console.log(data.levelId);
        this.correct = data.correct || 1;
        this.incorrect = data.incorrect || 1;
    }

    preload() { 
        this.load.image('button_option', 'assets/images/button_option.png');
        this.load.audio('sound_success1', 'assets/audio/sound_success1.mp3');
        this.load.audio('sound_failure1', 'assets/audio/sound_failure1.mp3');
        this.load.audio('sound_placement', 'assets/audio/sound_placement.mp3')
        this.load.audio('sound_cheer', 'assets/audio/sound_cheer.mp3');
    }

    async create() {

        console.log('123456',this.isGameStarted)

        const gamePlayScene = this.scene.get('GamePlayScene') as GamePlayScene;
        gamePlayScene.events.once('gameStarted', () => {
            this.isGameStarted = true;
        });
        
        this.successSound = this.sound.add('sound_success1', { volume: 1 });
        this.failureSound = this.sound.add('sound_failure1', { volume: 1 });
        this.placementSound = this.sound.add('sound_placement', { volume: 1 });


        this.add.text(this.scale.width / 2, 425, "Place a number on the scale to balance it.", { fontSize: '20px Arial', color: 'black' }).setOrigin(0.5, 0).setResolution(2);

        const calculationString = this.registry.get('calculationString');
        const calculatedValue = this.registry.get('calculatedValue');

        console.log("Received calculation data:", calculationString, calculatedValue);
        
        const options = [];
        const max = 20;

        options.push(calculatedValue?.toFixed(0).toString());
        
        while (options.length < 5) {
            const randomValue = Phaser.Math.Between(0, max);
            if (!options.includes(randomValue)) {
                options.push(randomValue);
            }
        }

        Phaser.Utils.Array.Shuffle(options);

        options.forEach((value, index) => {
            const x = 90 + index * 130;
            const y = 520;              
            const width = 90;           
            const height = 120;          
            const isAnswer = value === calculatedValue; 

            const optionDTO = new OptionDTO(
                index,        
                isAnswer,    
                value,        
                this.levelId, 
                x,            
                y,            
                width,        
                height    
            );

            const optionView = new OptionView(this, optionDTO);
            optionView.setPosition(x, y);
            this.add.existing(optionView);

            this.optionViews.push(optionView);

            this.makeOptionDraggable(optionView);

        });
        
        // this.drawBoundary();

    }

    makeOptionDraggable(optionView: OptionView): void {
        const container = optionView.container;
        container.setSize(optionView.optionData.width, optionView.optionData.height);
        container.setInteractive();
        this.input.setDraggable(container);
    
        this.input.on('dragstart', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Container) => {
            if (!this.isGameStarted) return; 
            if (gameObject === container) {
                gameObject.setScale(1.1);
            }
        });
    
        this.input.on('drag', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Container, dragX: number, dragY: number) => {
            if (!this.isGameStarted) return;
            if (gameObject === container) {
                gameObject.x = dragX;
                gameObject.y = dragY;
            }
        });
    
        this.input.on('dragend', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Container) => {
            if (!this.isGameStarted) return; 
            if (gameObject === container) {
                gameObject.setScale(1);
    
                if (this.isCorrectDrop(gameObject.x, gameObject.y)) {
                    const isCorrect = this.checkAnswer(
                        this.registry.get('calculatedValue'),
                        optionView.optionData
                    );
    
                    if (isCorrect) {
                        this.successSound.play();
                        this.scene.launch('UIScene',{correct: this.correct})

                        this.scene.get('LevelScene').events.emit('updateLevel', { isCorrect: true });

                        gameObject.setVisible(false);
                        this.scene.launch('TrueScene')
                        this.scene.stop('QuestionAndOptionScene')

                    } else {
                        this.failureSound.play();
                        this.placementSound.play();
                        this.scene.launch('UIScene',{incorrect: this.incorrect})
                        this.scene.get('LevelScene').events.emit('updateLevel', { isCorrect: false });
 
                        // gameObject.setPosition(optionView.optionData.positionX, optionView.optionData.positionY);
                        gameObject.setVisible(false); 
                        this.scene.launch('FalseScene')
                        this.scene.stop('QuestionAndOptionScene')
                    }
                } else {
                    console.log('Không thả vào vùng hợp lệ.');
                    gameObject.setPosition(optionView.optionData.positionX, optionView.optionData.positionY);
                }
            }
        });
    }
    
    checkAnswer(currentCount: number, optionDTO: OptionDTO): boolean {
        console.log(`Đáp án đúng: ${currentCount}`);
        console.log(`Giá trị kéo thả: ${optionDTO.value}`);
    
        // So sánh với sai số nhỏ
        const tolerance = 0.5;
        const isCorrect = Math.abs(currentCount - optionDTO.value) < tolerance;
    
        if (isCorrect) {
            console.log('Đúng!');
        } else {
            console.log('Sai!');
        }
    
        return isCorrect;
    }
    
    isCorrectDrop(x: number, y: number): boolean {
        const screenHeight = this.scale.gameSize.height; 
        const upperBound = screenHeight / 2.5;
        return y < upperBound; 
    }    
    drawBoundary() {
        const screenHeight = this.scale.gameSize.height;
        const upperBound = screenHeight / 2.5;

        this.boundaryGraphics = this.add.graphics();
        this.boundaryGraphics.lineStyle(2, 0xFF0000, 1); 
        this.boundaryGraphics.strokeRect(0, 0, this.scale.width, upperBound);
    }  
}
