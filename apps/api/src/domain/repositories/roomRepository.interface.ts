import { Room } from "../../infrastructure/entities/Room.entity";
import { RoomM } from "../models/room";

export interface IRoomRepository{
    deleteRoom(id: string);
    getRoom(id: string): Promise<RoomM>;
    getAllRoom(): Promise<RoomM[]>;
    updateRoom(room: Room);
    insertRoom(room: RoomM)
}