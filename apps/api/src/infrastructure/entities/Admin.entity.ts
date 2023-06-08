import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Account } from "./Account.entity";

@Index("Admin_pkey", ["id"], { unique: true })
@Entity("Admin", { schema: "public" })
export class Admin {
  @Column("character varying", { primary: true, name: "id", length: 50 })
  id: string;

  @ManyToOne(() => Account, (account) => account.admins)
  @JoinColumn([{ name: "accountId", referencedColumnName: "id" }])
  account: Account;
}
