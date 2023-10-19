import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEntityPlaceRoomMaterial1697736288022 implements MigrationInterface {
    name = 'AddEntityPlaceRoomMaterial1697736288022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Group" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" character varying(100) NOT NULL, "color" character varying(50) NOT NULL, CONSTRAINT "PK_d064bd160defed65823032ee547" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "Group_pkey" ON "Group" ("id") `);
        await queryRunner.query(`CREATE TABLE "GroupMembers" ("groupId" uuid NOT NULL, "accountId" uuid NOT NULL, "isOwner" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_17f2957262fcab1d41c6d055422" PRIMARY KEY ("groupId", "accountId"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "GroupMembers_pkey" ON "GroupMembers" ("groupId", "accountId") `);
        await queryRunner.query(`CREATE TABLE "Place" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "city" character varying(255) NOT NULL, "street" character varying(255) NOT NULL, "streetNumber" character varying(255) NOT NULL, CONSTRAINT "PK_c641fab266f2f508c7fbcb8a28d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "Place_pkey" ON "Place" ("id") `);
        await queryRunner.query(`CREATE TABLE "Room" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" character varying(255) NOT NULL, "placeId" uuid, CONSTRAINT "PK_867d589be92524f89375e2e086d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "Room_pkey" ON "Room" ("id") `);
        await queryRunner.query(`CREATE TABLE "UseMaterialRoom" ("roomId" uuid NOT NULL, "materialId" uuid NOT NULL, "number" integer NOT NULL, CONSTRAINT "PK_8f99186efa881158013474c77a2" PRIMARY KEY ("roomId", "materialId"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "UseMaterialRoom_pkey" ON "UseMaterialRoom" ("roomId", "materialId") `);
        await queryRunner.query(`CREATE TABLE "Material" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" character varying(255) NOT NULL, CONSTRAINT "PK_7ff3dea531ca6a1c58099e81bb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "Material_pkey" ON "Material" ("id") `);
        await queryRunner.query(`ALTER TABLE "GroupMembers" ADD CONSTRAINT "FK_620c0c144747b4a30137427ffd9" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "GroupMembers" ADD CONSTRAINT "FK_5f096d2c348d8a2b05ac099a9f6" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Room" ADD CONSTRAINT "FK_fd6ed294c6575775bfe2d93ee82" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UseMaterialRoom" ADD CONSTRAINT "FK_f74fcb4aa5af614fa0a26d45a82" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UseMaterialRoom" ADD CONSTRAINT "FK_677f52746dfb715d413c010480c" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Admin" ADD CONSTRAINT "FK_15722fa20bba43ec8833682e491" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Admin" DROP CONSTRAINT "FK_15722fa20bba43ec8833682e491"`);
        await queryRunner.query(`ALTER TABLE "UseMaterialRoom" DROP CONSTRAINT "FK_677f52746dfb715d413c010480c"`);
        await queryRunner.query(`ALTER TABLE "UseMaterialRoom" DROP CONSTRAINT "FK_f74fcb4aa5af614fa0a26d45a82"`);
        await queryRunner.query(`ALTER TABLE "Room" DROP CONSTRAINT "FK_fd6ed294c6575775bfe2d93ee82"`);
        await queryRunner.query(`ALTER TABLE "GroupMembers" DROP CONSTRAINT "FK_5f096d2c348d8a2b05ac099a9f6"`);
        await queryRunner.query(`ALTER TABLE "GroupMembers" DROP CONSTRAINT "FK_620c0c144747b4a30137427ffd9"`);
        await queryRunner.query(`DROP INDEX "public"."Material_pkey"`);
        await queryRunner.query(`DROP TABLE "Material"`);
        await queryRunner.query(`DROP INDEX "public"."UseMaterialRoom_pkey"`);
        await queryRunner.query(`DROP TABLE "UseMaterialRoom"`);
        await queryRunner.query(`DROP INDEX "public"."Room_pkey"`);
        await queryRunner.query(`DROP TABLE "Room"`);
        await queryRunner.query(`DROP INDEX "public"."Place_pkey"`);
        await queryRunner.query(`DROP TABLE "Place"`);
        await queryRunner.query(`DROP INDEX "public"."GroupMembers_pkey"`);
        await queryRunner.query(`DROP TABLE "GroupMembers"`);
        await queryRunner.query(`DROP INDEX "public"."Group_pkey"`);
        await queryRunner.query(`DROP TABLE "Group"`);
    }

}
