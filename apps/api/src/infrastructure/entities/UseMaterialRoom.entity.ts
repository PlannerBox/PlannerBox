import { Column, Entity, Index, IntegerType, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Place } from "./Place.entity";
import { Material } from "./Material.entity";
import { Room } from "./Room.entity";


@Index('UseMaterialRoom_pkey', ['id'], { unique: true })
@Entity('UseMaterialRoom', { schema: 'public' })
export class UseMaterialRoom {

    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column('integer')
    number: IntegerType;

    @ManyToOne(() => Room, (room) => room, { cascade: true, eager: true },)
    @JoinColumn([{ name: 'roomId', referencedColumnName: 'id' }])
    room: Room;

    @ManyToOne(() => Material, (place) => place, { cascade: true, eager: true },)
    @JoinColumn([{ name: 'materialId', referencedColumnName: 'id' }])
    material: Material;
}