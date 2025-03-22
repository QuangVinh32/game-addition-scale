import { BaseDTO } from "mct-common";

export class QuestionDTO extends BaseDTO {
    private _questionId: number;
    private _levelId: number;
    private _text: string;
    private _number1: number;
    private _number2: number;
    private _number3: number;

    constructor(
        questionId: number,
        positionX: number,
        positionY: number,
        levelId: number,
        text: string,
        number1: number,
        number2: number,
        number3: number,
    ) {
        super(positionX, positionY);
        this._questionId = questionId;
        this._levelId = levelId;
        this._text = text;
        this._number1 = number1;
        this._number2 = number2;
        this._number3 = number3;
    }

    // Phương thức static để tạo QuestionDTO ngẫu nhiên
    public static createRandomQuestion(
        questionId: number,
        positionX: number,
        positionY: number,
        levelId: number
    ): QuestionDTO {
        const randomNumber = () => {
            // Tạo số ngẫu nhiên từ 1 đến 20 để tránh số 0 cho phép nhân và chia
            return Math.floor(Math.random() * 20) + 1; 
        };

        return new QuestionDTO(
            questionId,
            positionX,
            positionY,
            levelId,
            '?', 
            randomNumber(),
            randomNumber(),
            randomNumber()
        );
    }

    /**
     * Getter number1
     * @return {number}
     */
    public get number1(): number {
        return this._number1;
    }

    /**
     * Getter number2
     * @return {number}
     */
    public get number2(): number {
        return this._number2;
    }

    /**
     * Getter number3
     * @return {number}
     */
    public get number3(): number {
        return this._number3;
    }

    /**
     * Setter number1
     * @param {number} value
     */
    public set number1(value: number) {
        this._number1 = value;
    }

    /**
     * Setter number2
     * @param {number} value
     */
    public set number2(value: number) {
        this._number2 = value;
    }

    /**
     * Setter number3
     * @param {number} value
     */
    public set number3(value: number) {
        this._number3 = value;
    }

    /**
     * Getter questionId
     * @return {number}
     */
    public get questionId(): number {
        return this._questionId;
    }

    /**
     * Setter questionId
     * @param {number} value
     */
    public set questionId(value: number) {
        this._questionId = value;
    }

    /**
     * Getter levelId
     * @return {number}
     */
    public get levelId(): number {
        return this._levelId;
    }

    /**
     * Setter levelId
     * @param {number} value
     */
    public set levelId(value: number) {
        this._levelId = value;
    }

    /**
     * Getter text
     * @return {string}
     */
    public get text(): string {
        return this._text;
    }

    /**
     * Setter text
     * @param {string} value
     */
    public set text(value: string) {
        this._text = value;
    }
}
