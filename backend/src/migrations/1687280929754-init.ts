import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1687280929754 implements MigrationInterface {
    name = 'Init1687280929754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rutines_assignment" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "rutines_assignment" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "rutines_assignment" DROP CONSTRAINT "FK_551dcd82ca31991b2e6ab8d1409"`);
        await queryRunner.query(`ALTER TABLE "routines" DROP CONSTRAINT "FK_80be15466f497db36051edbbae7"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "rutines_assignment" DROP CONSTRAINT "FK_8011c71037e99eea0c18ea5fd76"`);
        await queryRunner.query(`ALTER TABLE "rutines_assignment" DROP CONSTRAINT "PK_05a1cacdb577cc8df7b81cc9128"`);
        await queryRunner.query(`ALTER TABLE "rutines_assignment" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "rutines_assignment" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rutines_assignment" ADD CONSTRAINT "PK_05a1cacdb577cc8df7b81cc9128" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "rutines_assignment" DROP COLUMN "routineId"`);
        await queryRunner.query(`ALTER TABLE "rutines_assignment" ADD "routineId" integer`);
        await queryRunner.query(`ALTER TABLE "rutines_assignment" DROP COLUMN "studentId"`);
        await queryRunner.query(`ALTER TABLE "rutines_assignment" ADD "studentId" integer`);
        await queryRunner.query(`ALTER TABLE "routines" DROP CONSTRAINT "PK_6847e8f0f74e65a6f10409dee9f"`);
        await queryRunner.query(`ALTER TABLE "routines" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "routines" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "routines" ADD CONSTRAINT "PK_6847e8f0f74e65a6f10409dee9f" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "routines" DROP COLUMN "instructorId"`);
        await queryRunner.query(`ALTER TABLE "routines" ADD "instructorId" integer`);
        await queryRunner.query(`ALTER TABLE "rutines_assignment" ADD CONSTRAINT "FK_8011c71037e99eea0c18ea5fd76" FOREIGN KEY ("routineId") REFERENCES "routines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rutines_assignment" ADD CONSTRAINT "FK_551dcd82ca31991b2e6ab8d1409" FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "routines" ADD CONSTRAINT "FK_80be15466f497db36051edbbae7" FOREIGN KEY ("instructorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "routines" DROP CONSTRAINT "FK_80be15466f497db36051edbbae7"`);
        await queryRunner.query(`ALTER TABLE "rutines_assignment" DROP CONSTRAINT "FK_551dcd82ca31991b2e6ab8d1409"`);
        await queryRunner.query(`ALTER TABLE "rutines_assignment" DROP CONSTRAINT "FK_8011c71037e99eea0c18ea5fd76"`);
        await queryRunner.query(`ALTER TABLE "routines" DROP COLUMN "instructorId"`);
        await queryRunner.query(`ALTER TABLE "routines" ADD "instructorId" uuid`);
        await queryRunner.query(`ALTER TABLE "routines" DROP CONSTRAINT "PK_6847e8f0f74e65a6f10409dee9f"`);
        await queryRunner.query(`ALTER TABLE "routines" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "routines" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "routines" ADD CONSTRAINT "PK_6847e8f0f74e65a6f10409dee9f" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "rutines_assignment" DROP COLUMN "studentId"`);
        await queryRunner.query(`ALTER TABLE "rutines_assignment" ADD "studentId" uuid`);
        await queryRunner.query(`ALTER TABLE "rutines_assignment" DROP COLUMN "routineId"`);
        await queryRunner.query(`ALTER TABLE "rutines_assignment" ADD "routineId" uuid`);
        await queryRunner.query(`ALTER TABLE "rutines_assignment" DROP CONSTRAINT "PK_05a1cacdb577cc8df7b81cc9128"`);
        await queryRunner.query(`ALTER TABLE "rutines_assignment" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "rutines_assignment" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "rutines_assignment" ADD CONSTRAINT "PK_05a1cacdb577cc8df7b81cc9128" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "rutines_assignment" ADD CONSTRAINT "FK_8011c71037e99eea0c18ea5fd76" FOREIGN KEY ("routineId") REFERENCES "routines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "routines" ADD CONSTRAINT "FK_80be15466f497db36051edbbae7" FOREIGN KEY ("instructorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rutines_assignment" ADD CONSTRAINT "FK_551dcd82ca31991b2e6ab8d1409" FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rutines_assignment" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "rutines_assignment" DROP COLUMN "created_at"`);
    }

}
