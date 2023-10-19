import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Room } from "../entities/Room.entity";
import { IRoomRepository } from "../../domain/repositories/roomRepository.interface";
import { RoomM } from "../../domain/models/room";
import { Place } from "../entities/Place.entity";
import { IMaterialRepository } from "../../domain/repositories/materialRepository.interface";
import { MaterialM } from "../../domain/models/material";
import { Material } from "../entities/Material.entity";


@Injectable()
export class MaterialRepository implements IMaterialRepository {
    constructor(
        @InjectRepository(Material)
        private readonly materialRepository: Repository<Material>
    ) {}
    async deleteMaterial(id: string) {
        await this.materialRepository.delete({id : id})
    }
    async getMaterial(id: string): Promise<MaterialM> {
        return await this.materialRepository.findOneBy({id : id})
    }
    async getAllMaterial(): Promise<MaterialM[]> {
        return await this.materialRepository.find();
    }
    async updateMaterial(room: Material) {
        await this.materialRepository.update(room.id, room)
    }
   
   async insertMaterial(roomM:MaterialM) {
        const room=this.toMaterialEntity(roomM);
        console.log(room);
        await this.materialRepository.save(room);
    
   }

   toMaterialEntity(materialM:MaterialM) : Material {
    return{
        id: materialM.id,
        name: materialM.name,
        useMaterialRoom:materialM.useMaterialRoom,
    }
   }
}