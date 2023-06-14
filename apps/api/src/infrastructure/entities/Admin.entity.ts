import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./Account.entity";

@Index("Admin_pkey", ["id"], { unique: true })
@Entity("Admin", { schema: "public" })
export class Admin {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string;

  @ManyToOne(() => Account, (account) => account.admins)
  @JoinColumn([{ name: "accountId", referencedColumnName: "id" }])
  account: Account;
}
