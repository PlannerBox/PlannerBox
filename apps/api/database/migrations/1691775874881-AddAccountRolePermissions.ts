import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAccountRolePermissions1691775874881 implements MigrationInterface {
    name = 'AddAccountRolePermissions1691775874881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."RolePermissions_role_enum" AS ENUM('user', 'admin', 'student', 'teacher', 'internTeacher')`);
        await queryRunner.query(`CREATE TYPE "public"."RolePermissions_permissions_enum" AS ENUM('add', 'update', 'desactivate', 'delete', 'read', 'readAll')`);
        await queryRunner.query(`CREATE TABLE "RolePermissions" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "role" "public"."RolePermissions_role_enum" NOT NULL DEFAULT 'user', "permissions" "public"."RolePermissions_permissions_enum" array NOT NULL DEFAULT '{}', CONSTRAINT "PK_29cf5edaa365f1e090b95eb6708" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "RolePermissions_pkey" ON "RolePermissions" ("id") `);
        await queryRunner.query(`ALTER TABLE "Account" ADD "roleId" uuid`);
        await queryRunner.query(`ALTER TABLE "Account" ADD CONSTRAINT "UQ_a9738c411d54f010029fa60104d" UNIQUE ("roleId")`);
        await queryRunner.query(`ALTER TABLE "Student" ADD "intern" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "Account" ADD CONSTRAINT "FK_a9738c411d54f010029fa60104d" FOREIGN KEY ("roleId") REFERENCES "RolePermissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Account" DROP CONSTRAINT "FK_a9738c411d54f010029fa60104d"`);
        await queryRunner.query(`ALTER TABLE "Student" DROP COLUMN "intern"`);
        await queryRunner.query(`ALTER TABLE "Account" DROP CONSTRAINT "UQ_a9738c411d54f010029fa60104d"`);
        await queryRunner.query(`ALTER TABLE "Account" DROP COLUMN "roleId"`);
        await queryRunner.query(`DROP INDEX "public"."RolePermissions_pkey"`);
        await queryRunner.query(`DROP TABLE "RolePermissions"`);
        await queryRunner.query(`DROP TYPE "public"."RolePermissions_permissions_enum"`);
        await queryRunner.query(`DROP TYPE "public"."RolePermissions_role_enum"`);
    }

}
