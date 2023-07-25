import { MigrationInterface, QueryRunner } from "typeorm";

export class AccountActiveProperty1690316429544 implements MigrationInterface {
    name = 'AccountActiveProperty1690316429544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Account" ADD "active" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Account" DROP COLUMN "active"`);
    }

}
