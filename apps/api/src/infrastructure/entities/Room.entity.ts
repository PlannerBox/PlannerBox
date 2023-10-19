import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Place } from "./Place.entity";
import { UseMaterialRoom } from "./UseMaterialRoom.entity";


@Index('Room_pkey', ['id'], { unique: true })
@Entity('Room', { schema: 'public' })
export class Room {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id?: string;

    @Column('character varying', { name: 'name', length: 255 })
    name: string;

    @ManyToOne(() => Place, (place) => place,{ cascade: true, eager: true })
    @JoinColumn([{ name: 'placeId', referencedColumnName: 'id' }])
    place: Place;

    @OneToMany(() => UseMaterialRoom, (useMaterialRoom) => useMaterialRoom)
    @JoinColumn([{ name: 'useMaterialRoomId', referencedColumnName: 'id' }])
    useMaterialRoom?: UseMaterialRoom[];
}