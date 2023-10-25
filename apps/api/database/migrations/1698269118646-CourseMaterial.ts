import { MigrationInterface, QueryRunner } from "typeorm";

export class CourseMaterial1698269118646 implements MigrationInterface {
    name = 'CourseMaterial1698269118646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "CourseMaterials" ("courseId" uuid NOT NULL, "materialId" uuid NOT NULL, CONSTRAINT "PK_ff5632b1cca6a72871e08d18b11" PRIMARY KEY ("courseId", "materialId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8ecd4023bf13b60a2807093164" ON "CourseMaterials" ("courseId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e36196ae80c7f93028eeee7adf" ON "CourseMaterials" ("materialId") `);
        await queryRunner.query(`ALTER TABLE "Admin" ADD CONSTRAINT "FK_15722fa20bba43ec8833682e491" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "CourseMaterials" ADD CONSTRAINT "FK_8ecd4023bf13b60a2807093164a" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "CourseMaterials" ADD CONSTRAINT "FK_e36196ae80c7f93028eeee7adf0" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "CourseMaterials" DROP CONSTRAINT "FK_e36196ae80c7f93028eeee7adf0"`);
        await queryRunner.query(`ALTER TABLE "CourseMaterials" DROP CONSTRAINT "FK_8ecd4023bf13b60a2807093164a"`);
        await queryRunner.query(`ALTER TABLE "Admin" DROP CONSTRAINT "FK_15722fa20bba43ec8833682e491"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e36196ae80c7f93028eeee7adf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8ecd4023bf13b60a2807093164"`);
        await queryRunner.query(`DROP TABLE "CourseMaterials"`);
    }

}
