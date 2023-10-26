import { PaginateQuery, Paginated } from "nestjs-paginate";
import { MaterialM } from "../models/material";
import { Material } from "../../infrastructure/entities/Material.entity";


export interface IMaterialRepository {
    getMaterial(id: string): Promise<MaterialM>;
    deleteMaterial(id: string);
    insertMaterial(place: MaterialM);
    getAllMaterial(query: PaginateQuery) : Promise<Paginated<MaterialM>>;
    updateMaterial(placeM:MaterialM);
    findMaterialByIds(materialIds: string[]): Promise<Material[]>;
}