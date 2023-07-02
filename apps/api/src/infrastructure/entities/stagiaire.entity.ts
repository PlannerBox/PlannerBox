import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('statigaire')
export class Stagiaire {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
