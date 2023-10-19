import { ILogger } from "../../domain/logger/logger.interface";
import { PlaceM } from "../../domain/models/place";
import { Place } from "../../infrastructure/entities/Place.entity";
import { IRoomRepository } from "../../domain/repositories/roomRepository.interface";
import { IPlaceRepository } from "../../domain/repositories/placeRepository.interface";
import { Room } from "../../infrastructure/entities/Room.entity";
import { RoomM } from "../../domain/models/room";
import { RoomDto } from "../../infrastructure/controllers/roomManagement/roomDto.class";
import { NotFoundException } from "@nestjs/common";


export class RoomUseCase {
    constructor(
        private readonly placeRepository: IPlaceRepository,
        private readonly roomRepository: IRoomRepository,
        ) { }
        
    async insertRoom(roomM: RoomM, idPlace: string): Promise<any>{
        let place = await this.placeRepository.getPlace(idPlace);
        if (!place) {
            throw new NotFoundException('No place found');
        }
       

       return await this.roomRepository.insertRoom(roomM, place);
    }
    async updateRoom(roomM: RoomM) : Promise<any>{
        const room=this.toRoom(roomM);
        return await this.roomRepository.updateRoom(room);
    }
    async getAllRoom(): Promise<RoomM[]> {
        return await this.roomRepository.getAllRoom();

    }
    async getRoom(id: string): Promise<RoomM> {
        return await this.roomRepository.getRoom(id);

    }
    async deleteRoom(id: string) : Promise<any>{
        return await this.roomRepository.deleteRoom(id);

    }
   private toRoom(roomM : RoomM) : Room{
    return{
        id:roomM.id,
        name: roomM.name,
        place: roomM.place,
        useMaterialRoom: roomM.useMaterialRoom
    }
   }
}