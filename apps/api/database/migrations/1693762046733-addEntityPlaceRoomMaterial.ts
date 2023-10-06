import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEntityPlaceRoomMaterial1693762046733 implements MigrationInterface {
    name = 'AddEntityPlaceRoomMaterial1693762046733'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Admin" DROP CONSTRAINT "FK_15722fa20bba43ec8833682e491"`);
        await queryRunner.query(`ALTER TABLE "Student" DROP CONSTRAINT "FK_3497a8bbf572bc7267563c094b0"`);
        await queryRunner.query(`ALTER TABLE "Teacher" DROP CONSTRAINT "FK_fe5a48edca5c765ec1820567c4a"`);
        await queryRunner.query(`CREATE TABLE "Material" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" character varying(255) NOT NULL, CONSTRAINT "PK_7ff3dea531ca6a1c58099e81bb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "Material_pkey" ON "Material" ("id") `);
        await queryRunner.query(`CREATE TABLE "UseMaterialRoom" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "number" integer NOT NULL, "roomId" uuid, "materialId" uuid, CONSTRAINT "PK_33b021ae38f7ff18aaa278af76a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "UseMaterialRoom_pkey" ON "UseMaterialRoom" ("id") `);
        await queryRunner.query(`CREATE TABLE "Room" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" character varying(255) NOT NULL, "placeId" uuid, CONSTRAINT "PK_867d589be92524f89375e2e086d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "Room_pkey" ON "Room" ("id") `);
        await queryRunner.query(`CREATE TABLE "Place" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "city" character varying(255) NOT NULL, "street" character varying(255) NOT NULL, "streetNumber" character varying(255) NOT NULL, CONSTRAINT "UQ_a8178595c356f80588e4acaecfc" UNIQUE ("city"), CONSTRAINT "PK_c641fab266f2f508c7fbcb8a28d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "Place_pkey" ON "Place" ("id") `);
        await queryRunner.query(`ALTER TYPE "public"."RolePermissions_permissions_enum" RENAME TO "RolePermissions_permissions_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."RolePermissions_permissions_enum" AS ENUM('add', 'update', 'updateAll', 'delete', 'read', 'readAll')`);
        await queryRunner.query(`ALTER TABLE "RolePermissions" ALTER COLUMN "permissions" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "RolePermissions" ALTER COLUMN "permissions" TYPE "public"."RolePermissions_permissions_enum"[] USING "permissions"::"text"::"public"."RolePermissions_permissions_enum"[]`);
        await queryRunner.query(`ALTER TABLE "RolePermissions" ALTER COLUMN "permissions" SET DEFAULT '{}'`);
        await queryRunner.query(`DROP TYPE "public"."RolePermissions_permissions_enum_old"`);
        await queryRunner.query(`ALTER TABLE "UseMaterialRoom" ADD CONSTRAINT "FK_f74fcb4aa5af614fa0a26d45a82" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UseMaterialRoom" ADD CONSTRAINT "FK_677f52746dfb715d413c010480c" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Room" ADD CONSTRAINT "FK_fd6ed294c6575775bfe2d93ee82" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Admin" ADD CONSTRAINT "FK_15722fa20bba43ec8833682e491" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Student" ADD CONSTRAINT "FK_3497a8bbf572bc7267563c094b0" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Teacher" ADD CONSTRAINT "FK_fe5a48edca5c765ec1820567c4a" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Teacher" DROP CONSTRAINT "FK_fe5a48edca5c765ec1820567c4a"`);
        await queryRunner.query(`ALTER TABLE "Student" DROP CONSTRAINT "FK_3497a8bbf572bc7267563c094b0"`);
        await queryRunner.query(`ALTER TABLE "Admin" DROP CONSTRAINT "FK_15722fa20bba43ec8833682e491"`);
        await queryRunner.query(`ALTER TABLE "Room" DROP CONSTRAINT "FK_fd6ed294c6575775bfe2d93ee82"`);
        await queryRunner.query(`ALTER TABLE "UseMaterialRoom" DROP CONSTRAINT "FK_677f52746dfb715d413c010480c"`);
        await queryRunner.query(`ALTER TABLE "UseMaterialRoom" DROP CONSTRAINT "FK_f74fcb4aa5af614fa0a26d45a82"`);
        await queryRunner.query(`CREATE TYPE "public"."RolePermissions_permissions_enum_old" AS ENUM('add', 'update', 'delete', 'read', 'readAll')`);
        await queryRunner.query(`ALTER TABLE "RolePermissions" ALTER COLUMN "permissions" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "RolePermissions" ALTER COLUMN "permissions" TYPE "public"."RolePermissions_permissions_enum_old"[] USING "permissions"::"text"::"public"."RolePermissions_permissions_enum_old"[]`);
        await queryRunner.query(`ALTER TABLE "RolePermissions" ALTER COLUMN "permissions" SET DEFAULT '{}'`);
        await queryRunner.query(`DROP TYPE "public"."RolePermissions_permissions_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."RolePermissions_permissions_enum_old" RENAME TO "RolePermissions_permissions_enum"`);
        await queryRunner.query(`DROP INDEX "public"."Place_pkey"`);
        await queryRunner.query(`DROP TABLE "Place"`);
        await queryRunner.query(`DROP INDEX "public"."Room_pkey"`);
        await queryRunner.query(`DROP TABLE "Room"`);
        await queryRunner.query(`DROP INDEX "public"."UseMaterialRoom_pkey"`);
        await queryRunner.query(`DROP TABLE "UseMaterialRoom"`);
        await queryRunner.query(`DROP INDEX "public"."Material_pkey"`);
        await queryRunner.query(`DROP TABLE "Material"`);
        await queryRunner.query(`ALTER TABLE "Teacher" ADD CONSTRAINT "FK_fe5a48edca5c765ec1820567c4a" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Student" ADD CONSTRAINT "FK_3497a8bbf572bc7267563c094b0" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Admin" ADD CONSTRAINT "FK_15722fa20bba43ec8833682e491" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
