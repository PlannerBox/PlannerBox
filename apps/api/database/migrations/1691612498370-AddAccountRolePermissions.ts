import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAccountRolePermissions1691612498370 implements MigrationInterface {
    name = 'AddAccountRolePermissions1691612498370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Account_role_enum" AS ENUM('user', 'admin', 'student', 'teacher', 'internTeacher')`);
        await queryRunner.query(`ALTER TABLE "Account" ADD "role" "public"."Account_role_enum" NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`CREATE TYPE "public"."Account_permissions_enum" AS ENUM('add', 'update', 'desactivate', 'delete', 'read', 'readAll')`);
        await queryRunner.query(`ALTER TABLE "Account" ADD "permissions" "public"."Account_permissions_enum" array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "Student" ADD "intern" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Student" DROP COLUMN "intern"`);
        await queryRunner.query(`ALTER TABLE "Account" DROP COLUMN "permissions"`);
        await queryRunner.query(`DROP TYPE "public"."Account_permissions_enum"`);
        await queryRunner.query(`ALTER TABLE "Account" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."Account_role_enum"`);
    }

}
