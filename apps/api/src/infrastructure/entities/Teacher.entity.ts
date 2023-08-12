import {
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './Account.entity';

@Index('Teacher_pkey', ['id'], { unique: true })
@Entity('Teacher', { schema: 'public' })
export class Teacher {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @OneToOne(() => Account, { eager: true, cascade: true})
  @JoinColumn([{ name: 'accountId', referencedColumnName: 'id' }])
  account: Account;
}
