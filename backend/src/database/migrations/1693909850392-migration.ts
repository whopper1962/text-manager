import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1693909850392 implements MigrationInterface {
    name = 'Migration1693909850392'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_texts" DROP CONSTRAINT "FK_3d778bcfc34f670bf7195db96ed"`);
        await queryRunner.query(`CREATE TABLE "project_tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "project_id" uuid, "tag_id" uuid, CONSTRAINT "REL_1d0f9955e703904ce2245a2738" UNIQUE ("tag_id"), CONSTRAINT "PK_9c867fa530adf5a4fe96e19fa27" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "project_texts" DROP CONSTRAINT "UQ_3d778bcfc34f670bf7195db96ed"`);
        await queryRunner.query(`ALTER TABLE "project_texts" DROP COLUMN "tag_id"`);
        await queryRunner.query(`ALTER TABLE "project_tags" ADD CONSTRAINT "FK_bc13802855877d708af05b585ad" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_tags" ADD CONSTRAINT "FK_1d0f9955e703904ce2245a2738a" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_tags" DROP CONSTRAINT "FK_1d0f9955e703904ce2245a2738a"`);
        await queryRunner.query(`ALTER TABLE "project_tags" DROP CONSTRAINT "FK_bc13802855877d708af05b585ad"`);
        await queryRunner.query(`ALTER TABLE "project_texts" ADD "tag_id" uuid`);
        await queryRunner.query(`ALTER TABLE "project_texts" ADD CONSTRAINT "UQ_3d778bcfc34f670bf7195db96ed" UNIQUE ("tag_id")`);
        await queryRunner.query(`DROP TABLE "project_tags"`);
        await queryRunner.query(`ALTER TABLE "project_texts" ADD CONSTRAINT "FK_3d778bcfc34f670bf7195db96ed" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
