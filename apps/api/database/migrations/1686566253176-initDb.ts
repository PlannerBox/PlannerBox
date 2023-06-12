import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDb1686566253176 implements MigrationInterface {
    name = 'InitDb1686566253176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Admin" ("id" character varying(50) NOT NULL, "accountId" character varying(255), CONSTRAINT "PK_3a489f4a44372ff150d7924dc3d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "Admin_pkey" ON "Admin" ("id") `);
        await queryRunner.query(`CREATE TABLE "Teacher" ("id" character varying(50) NOT NULL, "accountId" character varying(255), CONSTRAINT "PK_c089345af0160b3fd7b44f59e61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "Teacher_pkey" ON "Teacher" ("id") `);
        await queryRunner.query(`CREATE TABLE "Account" ("id" character varying(255) NOT NULL, "username" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "firstname" character varying(50), "lastname" character varying(50), "email" character varying(255) NOT NULL, "birth" date, "birthPlace" character varying(50), "lastLogin" TIMESTAMP, "hashRefreshToken" character varying, CONSTRAINT "PK_bf68fd30f1adeede9c72a5cac09" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "Account_pkey" ON "Account" ("id") `);
        await queryRunner.query(`CREATE TABLE "Student" ("id" SERIAL NOT NULL, "accountId" character varying(255), CONSTRAINT "PK_dc3573f6f2de5aa3aefca0c1f1a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "Student_pkey" ON "Student" ("id") `);
        await queryRunner.query(`ALTER TABLE "Admin" ADD CONSTRAINT "FK_15722fa20bba43ec8833682e491" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Teacher" ADD CONSTRAINT "FK_fe5a48edca5c765ec1820567c4a" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Student" ADD CONSTRAINT "FK_3497a8bbf572bc7267563c094b0" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Student" DROP CONSTRAINT "FK_3497a8bbf572bc7267563c094b0"`);
        await queryRunner.query(`ALTER TABLE "Teacher" DROP CONSTRAINT "FK_fe5a48edca5c765ec1820567c4a"`);
        await queryRunner.query(`ALTER TABLE "Admin" DROP CONSTRAINT "FK_15722fa20bba43ec8833682e491"`);
        await queryRunner.query(`DROP INDEX "public"."Student_pkey"`);
        await queryRunner.query(`DROP TABLE "Student"`);
        await queryRunner.query(`DROP INDEX "public"."Account_pkey"`);
        await queryRunner.query(`DROP TABLE "Account"`);
        await queryRunner.query(`DROP INDEX "public"."Teacher_pkey"`);
        await queryRunner.query(`DROP TABLE "Teacher"`);
        await queryRunner.query(`DROP INDEX "public"."Admin_pkey"`);
        await queryRunner.query(`DROP TABLE "Admin"`);
    }

}
