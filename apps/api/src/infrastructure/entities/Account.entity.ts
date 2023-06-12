import { Column, Entity, Index, OneToMany } from "typeorm";
import { Admin } from "./Admin.entity";
import { Student } from "./Student.entity";
import { Teacher } from "./Teacher.entity";

@Index("Account_pkey", ["id"], { unique: true })
@Entity("Account", { schema: "public" })
export class Account {
  @Column("character varying", { primary: true, name: "id", length: 255 })
  id: string;

  @Column("character varying", { name: "username", length: 255 })
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

  @Column("character varying", { name: "email", length: 255 })
  email: string;

  @Column("date", { name: "birth", nullable: true })
  birthDate: Date | null;

  @Column("character varying", {
    name: "birthPlace",
    nullable: true,
    length: 50,
  })
  birthPlace: string | null;

  @Column({ nullable: true })
  lastLogin?: Date;

  @Column('varchar', { nullable: true })
  hashRefreshToken: string;

  @OneToMany(() => Admin, (admin) => admin.account)
  admins: Admin[];

  @OneToMany(() => Student, (student) => student.account)
  students: Student[];

  @OneToMany(() => Teacher, (teacher) => teacher.account)
  teachers: Teacher[];
}
