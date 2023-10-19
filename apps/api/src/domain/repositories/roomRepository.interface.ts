
import { Room } from "../../infrastructure/entities/Room.entity";
import { PlaceM } from "../models/place";
import { RoomM } from "../models/room";

export interface IRoomRepository{
    deleteRoom(id: string): Promise<any>;
    getRoom(id: string): Promise<RoomM>;
    getAllRoom(): Promise<RoomM[]>;
    updateRoom(room: Room): Promise<any>;
    insertRoom(room: RoomM, place: PlaceM): Promise<any>;
}