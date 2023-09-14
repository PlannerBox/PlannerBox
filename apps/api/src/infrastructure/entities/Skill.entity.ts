import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index('Skill_pkey', ['id'], { unique: true })
@Entity('Skill', { schema: 'public' })
export class Skill {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ type: 'varchar', name: 'name', length: 100 })
    name: string;
}