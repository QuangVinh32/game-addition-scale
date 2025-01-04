import { BaseDTO } from "./BaseDTO";

export class CrossbarDTO extends BaseDTO{
    private _crossbarId: number;
    private _width: number;
    private _height: number;
    private _texture: string;
    private _levelId: number;

    constructor(
        crossbarId: number,
        positionX: number,
        positionY: number, 
        width: number, 
        height: number,
        texture: string,
        levelId: number
    ) {
        super(positionX, positionY); 
		this._crossbarId = crossbarId;
		this._width = width;
		this._height = height;
        this._texture = texture;
        this._levelId = levelId;

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
     * Getter texture
     * @return {string}
     */
	public get texture(): string {
		return this._texture;
	}

    /**
     * Setter texture
     * @param {string} value
     */
	public set texture(value: string) {
		this._texture = value;
	}


    /**
     * Getter crossbarId
     * @return {number}
     */
	public get crossbarId(): number {
		return this._crossbarId;
	}

    /**
     * Getter width
     * @return {number}
     */
	public get width(): number {
		return this._width;
	}

    /**
     * Getter height
     * @return {number}
     */
	public get height(): number {
		return this._height;
	}

    /**
     * Setter crossbarId
     * @param {number} value
     */
	public set crossbarId(value: number) {
		this._crossbarId = value;
	}

    /**
     * Setter width
     * @param {number} value
     */
	public set width(value: number) {
		this._width = value;
	}

    /**
     * Setter height
     * @param {number} value
     */
	public set height(value: number) {
		this._height = value;
	}

}
