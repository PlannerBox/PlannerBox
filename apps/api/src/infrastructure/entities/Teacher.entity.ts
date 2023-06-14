import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./Account.entity";

@Index("Teacher_pkey", ["id"], { unique: true })
@Entity("Teacher", { schema: "public" })
export class Teacher {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string;

  @ManyToOne(() => Account, (account) => account.teachers)
  @JoinColumn([{ name: "accountId", referencedColumnName: "id" }])
  account: Account;
}
