import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Room } from "../entities/Room.entity";
import { IRoomRepository } from "../../domain/repositories/roomRepository.interface";
import { RoomM } from "../../domain/models/room";
import { Place } from "../entities/Place.entity";


@Injectable()
export class RoomRepository implements IRoomRepository {
    constructor(
        @InjectRepository(Place)
        private readonly placeRepository: Repository<Place>,
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>
    ) {}
    async deleteRoom(id: string) {
        await this.roomRepository.delete({id : id})
    }
    async getRoom(id: string): Promise<RoomM> {
        return await this.roomRepository.findOneBy({id : id})
    }
    async getAllRoom(): Promise<RoomM[]> {
        return await this.roomRepository.find();
    }
    async updateRoom(room: Room) {
        await this.roomRepository.update(room.id, room)
    }
   
   async insertRoom(roomM:RoomM) {
        const room=this.toRoomEntity(roomM);
        console.log(room);
        await this.roomRepository.save(room);
    
   }

   toRoomEntity(roomM:RoomM) : Room {
    return{
        id: roomM.id,
        name: roomM.name,
        place: roomM.place,
        useMaterialRoom:roomM.useMaterialRoom,
    }
   }
}