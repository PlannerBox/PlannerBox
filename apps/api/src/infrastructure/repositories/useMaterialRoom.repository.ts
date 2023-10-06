import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Room } from "../entities/Room.entity";
import { IRoomRepository } from "../../domain/repositories/roomRepository.interface";
import { RoomM } from "../../domain/models/room";
import { Place } from "../entities/Place.entity";
import { IUseMaterialRoomRepository } from "../../domain/repositories/useMaterialRoomRepository.interface";
import { UseMaterialRoom } from "../entities/UseMaterialRoom.entity";
import { UseMaterialRoomM } from "../../domain/models/useMaterialRoom";


@Injectable()
export class UseMaterialRoomRepository implements IUseMaterialRoomRepository {
    constructor(

        @InjectRepository(UseMaterialRoom)
        private readonly useMaterialRoomRepository: Repository<UseMaterialRoom>
    ) {}

    async delete(id: string) {
        await this.useMaterialRoomRepository.delete({id : id})
    }
    async get(id: string): Promise<UseMaterialRoomM> {
        return await this.useMaterialRoomRepository.findOneBy({id : id})
    }
    async getAll(): Promise<UseMaterialRoomM[]> {
        return await this.useMaterialRoomRepository.find();
    }
    async update(useMaterialRoom: UseMaterialRoom) {
        await this.useMaterialRoomRepository.update(useMaterialRoom.id, useMaterialRoom)
    }
   
   async insert(useMaterialRoomM: UseMaterialRoomM) {
        const useMaterialRoom=this.toUseMaterialRoomEntity(useMaterialRoomM);
        await this.useMaterialRoomRepository.save(useMaterialRoom);
    
   }

   toUseMaterialRoomEntity(useMaterialRoomM:UseMaterialRoomM) : UseMaterialRoom {
    return{
        id: useMaterialRoomM.id,
        number: useMaterialRoomM.number,
        material: useMaterialRoomM.material,
        room:useMaterialRoomM.room,
    }
   }
}