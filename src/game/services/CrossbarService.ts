import { CrossbarController } from '../controllers/CrossbarController';
import { CrossbarDTO } from '../dtos/CrossbarDTO';
import CrossbarView from '../views/CrossbarView';
import BaseService from './BaseService';

export class CrossbarService extends BaseService<CrossbarDTO> {
    private controller: CrossbarController;
    private crossbarViews: CrossbarView[] = [];

    constructor(scene: Phaser.Scene, jsonPath: string) {
        super(scene, jsonPath);
        this.controller = new CrossbarController();
    }

    private mapCrossbars(data: any): CrossbarDTO[] {
        const crossbars = Array.isArray(data.crossbars) ? data.crossbars : [];
        if (!crossbars.length) {
            console.error('Invalid or missing crossbars data:', data.crossbars);
        }

        return crossbars.map((crossbarData: any) => new CrossbarDTO(
            crossbarData.crossbarId,
            crossbarData.positionX,
            crossbarData.positionY,
            crossbarData.width,
            crossbarData.height,
            crossbarData.texture,
            crossbarData.levelId
   
        ));
    }

    public async initialize(levelId: number): Promise<void> {
        const data = await this.loadData();
        const crossbars = this.mapCrossbars(data); 
        crossbars.forEach(crossbar => this.controller.addItem(crossbar)); 
        const levelCrossbars = crossbars.filter(crossbar => crossbar.levelId === levelId); 
        if (levelCrossbars.length === 0) {
            console.warn(`No crossbars found for levelId: ${levelId}`); 
        } else {
            levelCrossbars.forEach(crossbar => this.createCrossbarView(crossbar)); 
        }
    }

    public async initializeNoView(levelId: number): Promise<void> {
        const data = await this.loadData();
        const crossbars = this.mapCrossbars(data); 
        crossbars.forEach(crossbar => this.controller.addItem(crossbar)); 
        const levelCrossbars = crossbars.filter(crossbar => crossbar.levelId === levelId); 
        if (levelCrossbars.length === 0) {
            console.warn(`No crossbars found for levelId: ${levelId}`); 
        } 
    }

    public getCrossbarDTOById(crossbarId: number): CrossbarDTO | undefined {
        return this.controller.getItemByProperty('crossbarId', crossbarId); 
    }

    public getCrossbarsByLevelId(levelId: number): CrossbarDTO[] {
        return this.controller.getAllItems().filter(crossbar => crossbar.levelId === levelId);
    }

    public getAllCrossbarDTOs(): CrossbarDTO[] {
        return this.controller.getAllItems();
    }

    public createCrossbarView(crossbarData: CrossbarDTO): void {
        const crossbarView = new CrossbarView(this.scene, crossbarData); 
        this.crossbarViews.push(crossbarView);
    }

    public getAllCrossbarViews(): CrossbarView[] { 
        return this.crossbarViews; 
    }

    public getCrossbarViewById(crossbarId: number): CrossbarView | undefined {
        const crossbarView = this.crossbarViews.find(view => view.crossbarData.crossbarId === crossbarId);
        return crossbarView || undefined;
    }
}
