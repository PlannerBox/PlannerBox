import { MigrationInterface, QueryRunner } from "typeorm";

export class FixDB1698249751618 implements MigrationInterface {
    name = 'FixDB1698249751618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Course" ADD "roomId" uuid`);
        await queryRunner.query(`ALTER TABLE "Course" ADD CONSTRAINT "FK_d4d62528b9391d6d56992cd6cf2" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Course" DROP CONSTRAINT "FK_d4d62528b9391d6d56992cd6cf2"`);
        await queryRunner.query(`ALTER TABLE "Course" DROP COLUMN "roomId"`);
    }

}
