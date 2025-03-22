import { BaseService } from 'mct-common';
import { MountainController } from '../controllers/MountainController';
import { MountainDTO } from '../dtos/MountainDTO';
import MountainView from '../views/MountainView';

export class MountainService extends BaseService<MountainDTO> {
    private controller: MountainController;
    private mountainViews: MountainView[] = [];

    constructor(scene: Phaser.Scene, jsonPath: string) {
        super(scene, jsonPath);
        this.controller = new MountainController();
    }

    public mapMountains(data: any): MountainDTO[] {
        const mountains = Array.isArray(data.mountains) ? data.mountains : [];
        if (!mountains.length) {
            console.error('Invalid or missing mountains data:', data.mountains);
        }

        return mountains.map((mountainData: any) => new MountainDTO(
            mountainData.mountainId,
            mountainData.positionX,
            mountainData.positionY,
            mountainData.width,
            mountainData.height,
            mountainData.frame,
            mountainData.levelId
        ));
    }

    public async initialize(levelId: number): Promise<void> {
        const data = await this.loadData();
        const mountains = this.mapMountains(data); 
        mountains.forEach(mountain => this.controller.addItem(mountain)); 
        const levelMountains = mountains.filter(mountain => mountain.levelId === levelId); 
        if (levelMountains.length === 0) {
            console.warn(`No mountains found for levelId: ${levelId}`); 
        } else {
            levelMountains.forEach(mountain => this.createMountainView(mountain)); 
        }
    }

    public async initializeNoView(levelId: number): Promise<void> {
        const data = await this.loadData();
        const mountains = this.mapMountains(data); 
        mountains.forEach(mountain => this.controller.addItem(mountain)); 
        const levelMountains = mountains.filter(mountain => mountain.levelId === levelId); 
        if (levelMountains.length === 0) {
            console.warn(`No mountains found for levelId: ${levelId}`); 
        } 
    }

    public getMountainDTOById(mountainId: number): MountainDTO | undefined {
        return this.controller.getItemByProperty('mountainId', mountainId); 
    }

    public getMountainsByLevelId(levelId: number): MountainDTO[] {
        return this.controller.getAllItems().filter(mountain => mountain.levelId === levelId);
    }

    public getAllMountainDTOs(): MountainDTO[] {
        return this.controller.getAllItems();
    }

    public createMountainView(mountainData: MountainDTO): void {
        const mountainView = new MountainView(this.scene, mountainData); 
        this.mountainViews.push(mountainView);
    }

    public getAllMountainViews(): MountainView[] { 
        return this.mountainViews; 
    }

    public getMountainViewById(mountainId: number): MountainView | undefined {
        const mountainView = this.mountainViews.find(view => view.mountainData.mountainId === mountainId);
        return mountainView || undefined;
    }

}
