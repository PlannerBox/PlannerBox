import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './Account.entity';

@Index('Student_pkey', ['id'], { unique: true })
@Entity('Student', { schema: 'public' })
export class Student {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @OneToOne(() => Account, { eager: true, cascade: true })
  @JoinColumn([{ name: 'accountId', referencedColumnName: 'id' }])
  account: Account;
}
