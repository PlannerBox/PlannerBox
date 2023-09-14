import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSkillTeacherLink1694719915713 implements MigrationInterface {
    name = 'AddSkillTeacherLink1694719915713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "teacher_skills_skill" ("teacherId" uuid NOT NULL, "skillId" uuid NOT NULL, CONSTRAINT "PK_26a385aa7a420f1f521ff408961" PRIMARY KEY ("teacherId", "skillId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_57f03e00d00f108a507ea8e409" ON "teacher_skills_skill" ("teacherId") `);
        await queryRunner.query(`CREATE INDEX "IDX_266093fdc95756dcb3cf0ec590" ON "teacher_skills_skill" ("skillId") `);
        await queryRunner.query(`ALTER TABLE "teacher_skills_skill" ADD CONSTRAINT "FK_57f03e00d00f108a507ea8e409a" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "teacher_skills_skill" ADD CONSTRAINT "FK_266093fdc95756dcb3cf0ec5901" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher_skills_skill" DROP CONSTRAINT "FK_266093fdc95756dcb3cf0ec5901"`);
        await queryRunner.query(`ALTER TABLE "teacher_skills_skill" DROP CONSTRAINT "FK_57f03e00d00f108a507ea8e409a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_266093fdc95756dcb3cf0ec590"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_57f03e00d00f108a507ea8e409"`);
        await queryRunner.query(`DROP TABLE "teacher_skills_skill"`);
    }

}
