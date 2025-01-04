import { QuestionDTO } from "../dtos/QuestionDTO";
import { CrossbarService } from "../services/CrossbarService";
import { MountainService } from "../services/MountainService";
import QuestionView from "../views/QuestionView";

export default class LevelScene extends Phaser.Scene {
    private levelId: number;
    private mountainService: MountainService | null;
    private crossbarService: CrossbarService | null;
    private crossbarView: any;
    private mountainView: any;
    private questionView: QuestionView | null;
    private isCorrect: boolean | null;
    private container1: Phaser.GameObjects.Container | null;
    private calculationString: any;
    private calculatedValue : any;



    constructor() {
        super('LevelScene');
        this.levelId = 1;
        this.mountainService = null;
        this.crossbarService = null;
        this.crossbarView = null;
        this.mountainView = null;
        this.questionView = null;
        this.isCorrect = null;
        this.container1 = null;
        


    }

    preload() {
        this.load.image('frame0', 'assets/images/frame0.png');
        this.load.image('frame1', 'assets/images/frame1.png');
        this.load.image('frame2', 'assets/images/frame2.png');
        this.load.image('crossbar', 'assets/images/crossbar.png');
    }

    async create() {
        
        this.events.on('updateLevel', (data: { isCorrect: boolean }) => {
            this.isCorrect = data.isCorrect;
            console.log('Received data in LevelScene:', data);
            this.updateMountainView();
        });

        await this.initializeServices();
        this.initializeViews();
        // this.updateMountainView();
        this.displayQuestion();
    }

    private async initializeServices() {
        this.mountainService = new MountainService(this, 'assets/data/mountain.json');
        await this.mountainService.initialize(this.levelId);

        this.crossbarService = new CrossbarService(this, 'assets/data/crossbar.json');
        await this.crossbarService.initialize(this.levelId);
    }

    private initializeViews() {
        if (!this.mountainService || !this.crossbarService) {
            console.warn('Services are not initialized.');
            return;
        }

        const mountainDTO = this.mountainService.getMountainViewById(this.levelId);
        if (mountainDTO) {
            this.mountainView = mountainDTO
        }

        const crossbarDTO = this.crossbarService.getCrossbarViewById(this.levelId);
        if (crossbarDTO) {
            this.crossbarView = crossbarDTO;
        }
    }

    private updateMountainView() {
        if (!this.mountainView) {
            console.warn('Mountain view is not initialized.');
            return;
        }

        if (this.isCorrect === true) {
            this.mountainView.changeFrame('frame1');
            this.container1?.setAngle(0); 
    
            if (this.questionView) {
                const calculationString = this.registry.get('calculationString') || '';
                const calculatedValue = this.registry.get('calculatedValue') || 0;
    
                const updatedCalculationString = calculationString.replace('?', calculatedValue.toString());
                this.questionView.getCalculationText().setText(updatedCalculationString);
                
            }
        }else if (this.isCorrect === false) {
            this.mountainView.changeFrame('frame2');
            const angle = Phaser.Math.Between(0, 1) === 0 ? -10 : 10;
            this.container1?.setAngle(angle);
        
            if (this.questionView) {
                const calculationString = this.registry.get('calculationString') || '';
                const calculatedValue = this.registry.get('calculatedValue') || 0;
        
                const updatedCalculationString = calculationString.replace('?', calculatedValue.toString());
                this.questionView.getCalculationText().setText(updatedCalculationString);
        
                let targetX = this.questionView.x; 
        
                if (angle === -10) {
                    targetX -= 650; 
                } else if (angle === 10) {
                    targetX += 650; 
                }
        
                this.tweens.add({
                    targets: this.questionView,
                    x: targetX, 
                    duration: 1100, 
                    ease: 'Power1', 
                    yoyo: false,
                    onComplete: () => {

                    },
                });
            }
        }     
    }
    

    private displayQuestion() {
        const questionDTO = QuestionDTO.createRandomQuestion(1, 500, 500, 1);
        this.questionView = new QuestionView(this, questionDTO);
    
        if (this.crossbarView && this.mountainView && this.questionView) {
            this.container1 = this.add.container(350, 242, [this.crossbarView, this.questionView]);
            this.container1?.setAngle(Phaser.Math.Between(0, 1) === 0 ? -10 : 10); 

            this.crossbarView.setPosition(-this.crossbarView.width / 2, -this.crossbarView.height / 2);
            this.questionView.setPosition(-200, -80);
    
            const container2 = this.add.container(0, 0, [this.container1, this.mountainView]);
            this.mountainView.setPosition(350, 330);

            container2.setPosition(this.cameras.main.width + 200, this.cameras.main.centerY - 300);
    
            this.tweens.add({
                targets: container2,
                x: 0,
                duration: 1500,
                ease: 'Power1',
                yoyo: false,
                onComplete: () => {
                    console.log('Tween complete. Emitting calculation data:', this.calculationString, 'and', this.calculatedValue);
            
                    // this.registry.set('calculationString', this.calculationString);
                    // this.registry.set('calculatedValue', this.calculatedValue);
            
                    this.scene.launch('QuestionAndOptionScene', {
                        levelId: this.levelId,
                        calculatedValue: this.calculatedValue,
                        calculationString: this.calculationString,
                    });
                },
            });
            
             
       
        } else {
            console.warn('Either crossbarView, mountainView, or questionView is missing');
        }
    
        this.calculateAndDisplayText(questionDTO);
    }
    

    private calculateAndDisplayText(questionData: QuestionDTO) {
        try {
            if (!this.questionView) {
                console.warn('questionView is not initialized.');
                return;
            }
    
            const operations = ['+', '-'];
            const randomOperation = operations[Phaser.Math.Between(0, operations.length - 1)];
            const randomPosition = Phaser.Math.Between(1, 4);
    
            const a = questionData.number1;
            const b = questionData.number2;
            const c = questionData.number3;
    
            switch (randomOperation) {
                case '+':
                    this.calculatedValue = this.calculateAddition(randomPosition, a, b, c);
                    this.calculationString = this.getAdditionString(randomPosition, a, b, c);
                    break;
                case '-':
                    this.calculatedValue = this.calculateSubtraction(randomPosition, a, b, c);
                    this.calculationString = this.getSubtractionString(randomPosition, a, b, c);
                    break;
            }
    
            console.log('Emitting calculation data:', this.calculationString, 'and', this.calculatedValue);
            this.registry.set('calculationString', this.calculationString);
            this.registry.set('calculatedValue', this.calculatedValue);
    
            // this.questionView.getAnswerText().setText(`Đáp án: ${this.calculatedValue.toFixed(0)}`);
            this.questionView.getCalculationText().setText(this.calculationString);
        } catch (error) {
            console.error('Error calculating text:', error);
        }
    }
    

    private calculateAddition(position: number, a: number, b: number, c: number): number {
        switch (position) {
            case 1: return c + a - b;
            case 2: return c + b - a;
            case 3: return a + b - c;
            case 4: return a + b - c;
        }
        return 0;
    }

    private calculateSubtraction(position: number, a: number, b: number, c: number): number {
        switch (position) {
            case 1: return c - a + b;
            case 2: return -(c - b - a);
            case 3: return a - b + c;
            case 4: return c - (a - b);
        }
        return 0;
    }

    private getAdditionString(position: number, a: number, b: number, c: number): string {
        switch (position) {
            case 1: return `? + ${b} = ${c} + ${a}`;
            case 2: return `${a} + ? = ${c} + ${b}`;
            case 3: return `${a} + ${b} = ? + ${c}`;
            case 4: return `${a} + ${b} = ${c} + ?`;
        }
        return '';
    }

    private getSubtractionString(position: number, a: number, b: number, c: number): string {
        switch (position) {
            case 1: return `? - ${b} = ${c} - ${a}`;
            case 2: return `${a} - ? = ${c} - ${b}`;
            case 3: return `${a} - ${b} = ? - ${c}`;
            case 4: return `${a} - ${b} = ${c} - ?`;
        }
        return '';
    }
}
