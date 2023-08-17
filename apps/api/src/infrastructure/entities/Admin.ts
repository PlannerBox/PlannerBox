import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { Account } from "./Account";

@Index("Admin_pkey", ["id"], { unique: true })
@Entity("Admin", { schema: "public" })
export class Admin {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @OneToOne(() => Account, (account) => account.admin)
  @JoinColumn([{ name: "accountId", referencedColumnName: "id" }])
  account: Account;
}
