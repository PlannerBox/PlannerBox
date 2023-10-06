import { ILogger } from "../../domain/logger/logger.interface";
import { PlaceM } from "../../domain/models/place";
import { Place } from "../../infrastructure/entities/Place.entity";
import { IRoomRepository } from "../../domain/repositories/roomRepository.interface";
import { IPlaceRepository } from "../../domain/repositories/placeRepository.interface";
import { PlaceDto } from "../../infrastructure/controllers/placeManagement/placeDto.class";
import { IMaterialRepository } from "../../domain/repositories/materialRepository.interface";
import { MaterialM } from "../../domain/models/material";
import { Material } from "../../infrastructure/entities/Material.entity";
import { MaterialDto } from "../../infrastructure/controllers/MaterialManagement/materialDto.class";
import { IUseMaterialRoomRepository } from "../../domain/repositories/useMaterialRoomRepository.interface";
import { UseMaterialRoomM } from "../../domain/models/useMaterialRoom";
import { UseMaterialRoom } from "../../infrastructure/entities/UseMaterialRoom.entity";


export class UseMaterialRoomUseCase {
    constructor(
        private readonly materialRepository: IUseMaterialRoomRepository,
        ) { }
        
    async insert(useMaterialRoomM: UseMaterialRoomM) {
        await this.materialRepository.insert(useMaterialRoomM);
    }
        
    async delete(id: string) {
        await this.materialRepository.delete(id);
    }

    async get(id: string): Promise<UseMaterialRoomM>{
        return await this.materialRepository.get(id);
    }

    async getAll() : Promise<UseMaterialRoomM[]> {
        return await this.materialRepository.getAll();     
    }

    async update(useMaterialRoomM:UseMaterialRoomM) {
        const useMaterialRoom = this.toUseMaterialRoomM(useMaterialRoomM);
        await this.materialRepository.update(useMaterialRoom);
    }

    toUseMaterialRoomM(useMaterialRoomM : UseMaterialRoomM) : UseMaterialRoom{
    return{
        id: useMaterialRoomM.id,
        number: useMaterialRoomM.number,
        room: useMaterialRoomM.room,
        material: useMaterialRoomM.material,

    }
   }
}