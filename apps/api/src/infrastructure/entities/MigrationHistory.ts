import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("_MigrationHistory", { schema: "public" })
export class MigrationHistory {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("bigint", { name: "timestamp" })
  timestamp: string;

  @Column("character varying", { name: "name" })
  name: string;
}
