import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1687804746029 implements MigrationInterface {
    name = 'Init1687804746029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rutines_assignment" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "routine_id" integer, "user_id" integer, CONSTRAINT "PK_05a1cacdb577cc8df7b81cc9128" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "routines" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "instructor_id" integer, CONSTRAINT "PK_6847e8f0f74e65a6f10409dee9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('', 'INSTRUCTOR', 'STUDENT')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "instructor_code" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "code" character varying NOT NULL, "user_id" integer, CONSTRAINT "UQ_16489e1c98a7afaf567f8731cbd" UNIQUE ("code"), CONSTRAINT "REL_d188c10cde83818cd7f03b7cbf" UNIQUE ("user_id"), CONSTRAINT "PK_b1f51f3d703153bd47d42d22205" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "settings" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "font_family" character varying NOT NULL, "font_size" character varying NOT NULL, "color" character varying NOT NULL, "color_mode" character varying NOT NULL, "user_id" integer, CONSTRAINT "REL_a2883eaa72b3b2e8c98e744609" UNIQUE ("user_id"), CONSTRAINT "PK_0669fe20e252eb692bf4d344975" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rutines_assignment" ADD CONSTRAINT "FK_15f5c52c5f6ea4dc334e2ab56e5" FOREIGN KEY ("routine_id") REFERENCES "routines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rutines_assignment" ADD CONSTRAINT "FK_997bde8d79222663a71a3458bcd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "routines" ADD CONSTRAINT "FK_1c2aa0c7f04f6b448435e9cf248" FOREIGN KEY ("instructor_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "instructor_code" ADD CONSTRAINT "FK_d188c10cde83818cd7f03b7cbf1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "settings" ADD CONSTRAINT "FK_a2883eaa72b3b2e8c98e7446098" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "settings" DROP CONSTRAINT "FK_a2883eaa72b3b2e8c98e7446098"`);
        await queryRunner.query(`ALTER TABLE "instructor_code" DROP CONSTRAINT "FK_d188c10cde83818cd7f03b7cbf1"`);
        await queryRunner.query(`ALTER TABLE "routines" DROP CONSTRAINT "FK_1c2aa0c7f04f6b448435e9cf248"`);
        await queryRunner.query(`ALTER TABLE "rutines_assignment" DROP CONSTRAINT "FK_997bde8d79222663a71a3458bcd"`);
        await queryRunner.query(`ALTER TABLE "rutines_assignment" DROP CONSTRAINT "FK_15f5c52c5f6ea4dc334e2ab56e5"`);
        await queryRunner.query(`DROP TABLE "settings"`);
        await queryRunner.query(`DROP TABLE "instructor_code"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "routines"`);
        await queryRunner.query(`DROP TABLE "rutines_assignment"`);
    }

}
