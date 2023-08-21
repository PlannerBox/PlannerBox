import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStudentFormationMode1692192921468 implements MigrationInterface {
    name = 'AddStudentFormationMode1692192921468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Student_formationmode_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`ALTER TABLE "Student" ADD "formationMode" "public"."Student_formationmode_enum" NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Student" DROP COLUMN "formationMode"`);
        await queryRunner.query(`DROP TYPE "public"."Student_formationmode_enum"`);
    }

}
