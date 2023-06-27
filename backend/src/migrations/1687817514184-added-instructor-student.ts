import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedInstructorStudent1687817514184 implements MigrationInterface {
    name = 'AddedInstructorStudent1687817514184'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "instructor_student" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "instructor_id" integer, "student_id" integer, CONSTRAINT "REL_ac3ef436a08d9f41e793c66e50" UNIQUE ("student_id"), CONSTRAINT "PK_ca262f9ef74e6077a74bbd21692" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "instructor_student" ADD CONSTRAINT "FK_17a7aea6dd2d551fa0f0cdebad6" FOREIGN KEY ("instructor_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "instructor_student" ADD CONSTRAINT "FK_ac3ef436a08d9f41e793c66e506" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "instructor_student" DROP CONSTRAINT "FK_ac3ef436a08d9f41e793c66e506"`);
        await queryRunner.query(`ALTER TABLE "instructor_student" DROP CONSTRAINT "FK_17a7aea6dd2d551fa0f0cdebad6"`);
        await queryRunner.query(`DROP TABLE "instructor_student"`);
    }

}
