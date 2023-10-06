import { Place } from "../../infrastructure/entities/Place.entity";
import { UseMaterialRoom } from "../../infrastructure/entities/UseMaterialRoom.entity";


export class RoomM{
    id? : string;
    name : string;
    place : Place;
    useMaterialRoom: UseMaterialRoom[];
}