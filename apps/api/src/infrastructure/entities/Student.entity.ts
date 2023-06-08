import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Account } from "./Account.entity";

@Index("Student_pkey", ["id"], { unique: true })
@Entity("Student", { schema: "public" })
export class Student {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @ManyToOne(() => Account, (account) => account.students)
  @JoinColumn([{ name: "accountId", referencedColumnName: "id" }])
  account: Account;
}
