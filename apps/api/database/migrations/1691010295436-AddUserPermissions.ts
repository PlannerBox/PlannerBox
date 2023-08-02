import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserPermissions1691010295436 implements MigrationInterface {
    name = 'AddUserPermissions1691010295436'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Account_permissions_enum" AS ENUM('add', 'update', 'desactivate', 'delete', 'read', 'readAll', 'admin')`);
        await queryRunner.query(`ALTER TABLE "Account" ADD "permissions" "public"."Account_permissions_enum" array NOT NULL DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Account" DROP COLUMN "permissions"`);
        await queryRunner.query(`DROP TYPE "public"."Account_permissions_enum"`);
    }

}
