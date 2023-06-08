import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Account } from "./Account.entity";

@Index("Teacher_pkey", ["id"], { unique: true })
@Entity("Teacher", { schema: "public" })
export class Teacher {
  @Column("character varying", { primary: true, name: "id", length: 50 })
  id: string;

  @ManyToOne(() => Account, (account) => account.teachers)
  @JoinColumn([{ name: "accountId", referencedColumnName: "id" }])
  account: Account;
}
