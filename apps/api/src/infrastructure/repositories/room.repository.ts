import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Room } from "../entities/Room.entity";
import { IRoomRepository } from "../../domain/repositories/roomRepository.interface";
import { RoomM } from "../../domain/models/room";
import { Place } from "../entities/Place.entity";
import { PaginateQuery, Paginated, paginate } from "nestjs-paginate";


@Injectable()
export class RoomRepository implements IRoomRepository {
    constructor(
        @InjectRepository(Place)
        private readonly placeRepository: Repository<Place>,
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>
    ) {}
    async deleteRoom(id: string) : Promise<any>{
        return await this.roomRepository.delete({id : id})
    }
    async getRoom(id: string): Promise<RoomM> {
        return await this.roomRepository.findOneBy({id : id})
    }
    async getAllRoom(query: PaginateQuery) : Promise<Paginated<Room>> {
        console.log(query);
        const queryBuilder = this.roomRepository.createQueryBuilder('room');
        // queryBuilder.leftJoinAndSelect("room.place", "place");
        console.log(queryBuilder);
        return await paginate<Room>(query, queryBuilder, {
            loadEagerRelations: true,
            sortableColumns: ['id', 'name'],
            nullSort: 'last',
            defaultSortBy: [['name', 'ASC']],
            searchableColumns: ['id', 'name'],
            filterableColumns: { id: true ,name: true },
            
        });
    }
    async updateRoom(room: Room) : Promise<any>{
        return await this.roomRepository.update(room.id, room)
    }
   
   async insertRoom(room:Room, place: Place) : Promise<any> {
 
        room.place=place;
        return await this.roomRepository.save(room);
    
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