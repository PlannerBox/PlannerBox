import {
  Column,
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

  @Column("boolean", { name: 'intern', default: () => 'true' })
  intern: boolean;

  @OneToOne(() => Account, { eager: true, cascade: true})
  @JoinColumn([{ name: 'accountId', referencedColumnName: 'id' }])
  account: Account;
}
