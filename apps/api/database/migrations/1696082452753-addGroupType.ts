import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGroupType1696082452753 implements MigrationInterface {
    name = 'AddGroupType1696082452753'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Group_type_enum" AS ENUM('0', '1')`);
        await queryRunner.query(`ALTER TABLE "Group" ADD "type" "public"."Group_type_enum" NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Group" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."Group_type_enum"`);
    }

}
