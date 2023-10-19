import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IUseMaterialRoomRepository } from "../../domain/repositories/useMaterialRoomRepository.interface";
import { UseMaterialRoom } from "../entities/UseMaterialRoom.entity";
import { UseMaterialRoomM } from "../../domain/models/useMaterialRoom";
import { Room } from "../entities/Room.entity";
import { Material } from "../entities/Material.entity";


@Injectable()
export class UseMaterialRoomRepository implements IUseMaterialRoomRepository {
    constructor(

        @InjectRepository(UseMaterialRoom)
        private readonly useMaterialRoomRepository: Repository<UseMaterialRoom>
    ) {}

    async delete(roomId: string, materialId: string) : Promise<any>{
        return await this.useMaterialRoomRepository.delete({roomId : roomId, materialId : materialId})
    }
    async get(roomId: string, materialId: string): Promise<UseMaterialRoomM> {
        return await this.useMaterialRoomRepository.findOne({where: { roomId: roomId, materialId: materialId }})
    }
    async getAll(): Promise<UseMaterialRoomM[]> {
        return await this.useMaterialRoomRepository.find();
    }
    async update(useMaterialRoom: UseMaterialRoom) : Promise<any>{
        return await this.useMaterialRoomRepository.save({
            materialId: useMaterialRoom.materialId,
            roomId: useMaterialRoom.roomId,
            number :useMaterialRoom.number
        })
    }
   
   async insert(useMaterialRoomM: UseMaterialRoomM, room: Room, material: Material) : Promise<any>{
        useMaterialRoomM.material=material;
        useMaterialRoomM.room=room;
        const useMaterialRoom=this.toUseMaterialRoomEntity(useMaterialRoomM);
        return await this.useMaterialRoomRepository.save(useMaterialRoom);
    
   }

   toUseMaterialRoomEntity(useMaterialRoomM:UseMaterialRoomM) : UseMaterialRoom {
    return{
        roomId: useMaterialRoomM.room.id,
        materialId: useMaterialRoomM.material.id,
        number: useMaterialRoomM.number,
        material: useMaterialRoomM.material,
        room:useMaterialRoomM.room,
    }
   }
}