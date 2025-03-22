import { BaseDTO } from "mct-common";

export class MountainDTO extends BaseDTO{
    private _mountainId: number;
    private _width: number;
    private _height: number;
    private _frame: string;
    private _levelId: number;

	constructor(
        mountainId: number,
        positionX: number,
        positionY: number, 
        width: number,
        height: number,
        frame: string,
 
        levelId: number
    ) { 
        super(positionX, positionY); 
		this._mountainId = mountainId;
		this._width = width;
		this._height = height;
        this._frame = frame;
        this._levelId = levelId;
	}

    /**
     * Getter frame
     * @return {string}
     */
	public get frame(): string {
		return this._frame;
	}

    /**
     * Setter frame
     * @param {string} value
     */
	public set frame(value: string) {
		this._frame = value;
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
     * Getter mountainId
     * @return {number}
     */
	public get mountainId(): number {
		return this._mountainId;
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
     * Setter mountainId
     * @param {number} value
     */
	public set mountainId(value: number) {
		this._mountainId = value;
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