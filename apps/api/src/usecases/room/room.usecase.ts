import { ILogger } from "../../domain/logger/logger.interface";
import { PlaceM } from "../../domain/models/place";
import { Place } from "../../infrastructure/entities/Place.entity";
import { IRoomRepository } from "../../domain/repositories/roomRepository.interface";
import { IPlaceRepository } from "../../domain/repositories/placeRepository.interface";
import { Room } from "../../infrastructure/entities/Room.entity";
import { RoomM } from "../../domain/models/room";
import { InsertRoomDTO, RoomDto } from "../../infrastructure/controllers/roomManagement/roomDto.class";
import { NotFoundException } from "@nestjs/common";
import { PaginateQuery, Paginated } from "nestjs-paginate";
import { UUID } from "crypto";
import { IUseMaterialRoomRepository } from "../../domain/repositories/useMaterialRoomRepository.interface";
import { IMaterialRepository } from "../../domain/repositories/materialRepository.interface";
import { UseMaterialRoom } from "../../infrastructure/entities/UseMaterialRoom.entity";
import { Material } from "../../infrastructure/entities/Material.entity";


export class RoomUseCase {
    constructor(
        private readonly placeRepository: IPlaceRepository,
        private readonly roomRepository: IRoomRepository,
        private readonly useMaterialRoomRepository: IUseMaterialRoomRepository,
        private readonly materialRepository: IMaterialRepository,
        ) { }
        
    async insertRoom(roomM: RoomDto): Promise<any>{
    
        const useMaterialRooms = roomM.useMaterialRoom;
        const idPlace=roomM.place.id;
        let place = await this.placeRepository.getPlace(idPlace);
        if (!place) {
            throw new NotFoundException('No place found');
        }
        
        if (roomM.id) {
            const newRoom =this.toRoom(roomM);
            console.log("if");
            this.useMaterialRoomRepository.deleteByIdRoom(newRoom.id);
            this.roomRepository.insertRoom(newRoom);
            useMaterialRooms.forEach(async materialRoom => {
                const material= await this.materialRepository.getMaterial(materialRoom.materialId);
                if (material) {
                    await this.useMaterialRoomRepository.insert(materialRoom, newRoom, material);
                }
               });

        }
        else{
            console.log("else");

            const roomAfterInsert= await this.roomRepository.insertRoom(roomM);
            console.log(roomAfterInsert);
            const room = await this.roomRepository.getRoom(roomAfterInsert.id);
            useMaterialRooms.forEach(async materialRoom => {
             const material= await this.materialRepository.getMaterial(materialRoom.materialId);
             if (material) {
                 await this.useMaterialRoomRepository.insert(materialRoom, room, material);
             }
            });
        }
       
       return "Room successfully added";
    }
    async updateRoom(roomM: RoomM) : Promise<any>{
        const room=this.toRoom(roomM);
        return await this.roomRepository.updateRoom(room);
    }
    async getAllRoom(query: PaginateQuery) : Promise<Paginated<Room>> {
        return await this.roomRepository.getAllRoom(query);

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
        useMaterialRoom: roomM.useMaterialRoom,
        courses: roomM.courses
    }
   }
}