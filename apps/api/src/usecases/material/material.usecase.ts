import { ILogger } from "../../domain/logger/logger.interface";
import { IMaterialRepository } from "../../domain/repositories/materialRepository.interface";
import { MaterialM } from "../../domain/models/material";
import { Material } from "../../infrastructure/entities/Material.entity";
import { MaterialDto } from "../../infrastructure/controllers/MaterialManagement/materialDto.class";


export class MaterialUseCase {
    constructor(
        private readonly materialRepository: IMaterialRepository,
        ) { }
        
    async insertMaterial(material: MaterialDto) {
        await this.materialRepository.insertMaterial(material);
    }
        
    async deleteMaterial(id: string) {
        await this.materialRepository.deleteMaterial(id);
    }

    async getMaterial(id: string): Promise<MaterialM>{
        return await this.materialRepository.getMaterial(id);
    }

    async getAllMaterial() : Promise<MaterialM[]> {
        return await this.materialRepository.getAllMaterial();     
    }

    async updateMaterial(materialM:MaterialM) {
        const place = this.toMaterial(materialM);
        await this.materialRepository.updateMaterial(materialM);
    }

    toMaterial(materialM : MaterialM) : Material{
    return{
        id:materialM.id,
        name: materialM.name,
        useMaterialRoom: materialM.useMaterialRoom,
    }
   }
}