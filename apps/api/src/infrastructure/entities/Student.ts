import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { Account } from "./Account";

@Index("Student_pkey", ["id"], { unique: true })
@Entity("Student", { schema: "public" })
export class Student {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @OneToOne(() => Account, (account) => account.student)
  @JoinColumn([{ name: "accountId", referencedColumnName: "id" }])
  account: Account;
}
