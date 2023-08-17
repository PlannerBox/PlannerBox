import { Column, Entity, Index, OneToOne } from "typeorm";
import { Admin } from "./Admin";
import { Student } from "./Student";
import { Teacher } from "./Teacher";

@Index("Account_pkey", ["id"], { unique: true })
@Index("UQ_c8782447aa50983c50fa634d9ce", ["username"], { unique: true })
@Entity("Account", { schema: "public" })
export class Account {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("character varying", { name: "username", unique: true, length: 255 })
  username: string;

  @Column("character varying", { name: "password", length: 255 })
  password: string;

  @Column("character varying", {
    name: "firstname",
    nullable: true,
    length: 50,
  })
  firstname: string | null;

  @Column("character varying", { name: "lastname", nullable: true, length: 50 })
  lastname: string | null;

  @Column("date", { name: "birth", nullable: true })
  birth: string | null;

  @Column("character varying", {
    name: "birthPlace",
    nullable: true,
    length: 50,
  })
  birthPlace: string | null;

  @Column("timestamp without time zone", { name: "lastLogin", nullable: true })
  lastLogin: Date | null;

  @Column("character varying", { name: "hashRefreshToken", nullable: true })
  hashRefreshToken: string | null;

  @OneToOne(() => Admin, (admin) => admin.account)
  admin: Admin;

  @OneToOne(() => Student, (student) => student.account)
  student: Student;

  @OneToOne(() => Teacher, (teacher) => teacher.account)
  teacher: Teacher;
}
