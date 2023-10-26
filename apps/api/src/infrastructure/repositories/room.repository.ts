import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Room } from "../entities/Room.entity";
import { IRoomRepository } from "../../domain/repositories/roomRepository.interface";
import { RoomM } from "../../domain/models/room";
import { Place } from "../entities/Place.entity";
import { FilterOperator, PaginateQuery, Paginated, paginate } from "nestjs-paginate";
import { RoomEventFilterDto } from "../controllers/eventManagement/roomEventFilterDto.class";


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
        const queryBuilder = this.roomRepository.createQueryBuilder('room');
        queryBuilder.leftJoinAndSelect("room.place", "place");
        queryBuilder.leftJoinAndSelect("room.courses", "courses");
       
        return await paginate<Room>(query, queryBuilder, {
            loadEagerRelations: true,
            sortableColumns: ['id', 'name', 'place.city','place.street', 'place.streetNumber', 'courses.startDate', 'courses.endDate'],
            nullSort: 'last',
            defaultSortBy: [['name', 'ASC']],
            searchableColumns: ['id', 'name','place.city','place.street', 'place.streetNumber', 'courses.startDate', 'courses.endDate'],
            filterableColumns: { id: true ,name: true,'place.city': [FilterOperator.EQ, FilterOperator.ILIKE],
            'place.street': [FilterOperator.EQ, FilterOperator.ILIKE],
            'place.streetNumber': [FilterOperator.EQ, FilterOperator.ILIKE], 'courses.startDate': [FilterOperator.EQ, FilterOperator.ILIKE, FilterOperator.BTW], 'courses.endDate': [FilterOperator.EQ, FilterOperator.ILIKE, FilterOperator.BTW]},
            relations:['place', 'courses']
        });
    }
 
    async updateRoom(room: Room) : Promise<any>{
        return await this.roomRepository.update(room.id, room)
    }
   
   async insertRoom(room:Room, place: Place) : Promise<any> {
 
        room.place=place;
        return await this.roomRepository.save(room);
    
   }
   
   async findAvailableRooms(queryFilter: RoomEventFilterDto): Promise<Room[]> {
        const timeConflictqb = this.roomRepository.createQueryBuilder('r1');
        timeConflictqb.leftJoinAndSelect("r1.courses", "c1");

        timeConflictqb.select("r1.id");
        
        timeConflictqb.where("c1.startDate <= :startDate AND c1.endDate > :startDate", { startDate: queryFilter.startDate });
        timeConflictqb.orWhere("c1.startDate < :endDate AND c1.endDate >= :endDate", { endDate: queryFilter.endDate });
        timeConflictqb.orWhere("c1.startDate >= :startDate AND c1.startDate < :endDate", { startDate: queryFilter.startDate, endDate: queryFilter.endDate });
        timeConflictqb.orWhere("c1.endDate > :startDate AND c1.endDate <= :endDate", { startDate: queryFilter.startDate, endDate: queryFilter.endDate });
        
        const rooms = await timeConflictqb.getMany();

        const queryBuilder = this.roomRepository.createQueryBuilder('r');
        queryBuilder.leftJoinAndSelect("r.useMaterialRoom", "umr");        
        queryBuilder.select("r.id as roomId, array_agg(umr.materialId)");

        if (rooms.length > 0)
            queryBuilder.where("r.id NOT IN (:...rooms)", { rooms: rooms.map(r => r.id) });
        else
            queryBuilder.where("1 = 1");

        queryBuilder.andWhere("umr.materialId IN (:...materials)", { materials: queryFilter.materials });
        queryBuilder.groupBy("r.id");
        queryBuilder.having("count(DISTINCT umr.materialId) = :materialCount", { materialCount: queryFilter.materials.length });

        const result = await queryBuilder.getRawMany();

        let roomsResult = [];
        for (const row of result) {
            const room = await this.roomRepository.findOne({ where: { id: row.roomId }, relations: ['useMaterialRoom', 'useMaterialRoom.material'] });
            roomsResult.push(room);
        }

        return roomsResult;
   }

   toRoomEntity(roomM:RoomM) : Room {
    return{
        id: roomM.id,
        name: roomM.name,
        place: roomM.place,
        useMaterialRoom:roomM.useMaterialRoom,
        courses:roomM.courses
    }
   }
}