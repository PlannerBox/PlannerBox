import { UseMaterialRoom } from "../../infrastructure/entities/UseMaterialRoom.entity";
import { UseMaterialRoomM } from "../models/useMaterialRoom";

export interface IUseMaterialRoomRepository{
    delete(id: string);
    get(id: string): Promise<UseMaterialRoomM>;
    getAll(): Promise<UseMaterialRoomM[]>;
    update(useMaterialRoomM: UseMaterialRoom);
    insert(useMaterialRoom: UseMaterialRoomM)
}