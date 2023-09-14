import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSkillEntity1694714341607 implements MigrationInterface {
    name = 'AddSkillEntity1694714341607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Skill" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" character varying(100) NOT NULL, CONSTRAINT "PK_566c22ec29ed0c9cab8eb36ffbd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "Skill_pkey" ON "Skill" ("id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."Skill_pkey"`);
        await queryRunner.query(`DROP TABLE "Skill"`);
    }

}
