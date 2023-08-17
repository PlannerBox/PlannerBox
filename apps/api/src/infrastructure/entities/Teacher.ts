import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { Account } from "./Account";

@Index("Teacher_pkey", ["id"], { unique: true })
@Entity("Teacher", { schema: "public" })
export class Teacher {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @OneToOne(() => Account, (account) => account.teacher)
  @JoinColumn([{ name: "accountId", referencedColumnName: "id" }])
  account: Account;
}
