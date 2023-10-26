import { Course } from "../../infrastructure/entities/Course.entity";
import { UseMaterialRoom } from "../../infrastructure/entities/UseMaterialRoom.entity";


export class MaterialM{
    id? : string;
    name : string;
    useMaterialRoom?: UseMaterialRoom[];
    courses?: Course[];
}