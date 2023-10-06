import { MaterialM } from "../models/material";


export interface IMaterialRepository {
    getMaterial(id: string): Promise<MaterialM>;
    deleteMaterial(id: string);
    insertMaterial(place: MaterialM);
    getAllMaterial(): Promise<MaterialM[]>;
    updateMaterial(placeM:MaterialM);
}