import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './Account.entity';
import { Skill } from './Skill.entity';

@Index('Teacher_pkey', ['id'], { unique: true })
@Entity('Teacher', { schema: 'public' })
export class Teacher {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column("boolean", { name: 'intern', default: () => 'true' })
  intern: boolean;

  @OneToOne(() => Account, { eager: true, cascade: true, onDelete:"CASCADE"})
  @JoinColumn([{ name: 'accountId', referencedColumnName: 'id' }])
  account: Account;

  @ManyToMany(() => Skill, (skill) => skill.teachers, { eager: true, cascade: true })
  @JoinTable()
  skills: Skill[];
}
