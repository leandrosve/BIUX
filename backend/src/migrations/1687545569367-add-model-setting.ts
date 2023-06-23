import { MigrationInterface, QueryRunner } from "typeorm";

export class AddModelSetting1687545569367 implements MigrationInterface {
    name = 'AddModelSetting1687545569367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "settings" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "font_family" character varying NOT NULL, "font_size" character varying NOT NULL, "color" character varying NOT NULL, "color_mode" character varying NOT NULL, "user_id" integer, CONSTRAINT "REL_a2883eaa72b3b2e8c98e744609" UNIQUE ("user_id"), CONSTRAINT "PK_0669fe20e252eb692bf4d344975" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "settings" ADD CONSTRAINT "FK_a2883eaa72b3b2e8c98e7446098" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "settings" DROP CONSTRAINT "FK_a2883eaa72b3b2e8c98e7446098"`);
        await queryRunner.query(`DROP TABLE "settings"`);
    }

}
