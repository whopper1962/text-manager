import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1694254802326 implements MigrationInterface {
    name = 'Migration1694254802326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bookmarks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "text_master_id" uuid, "project_member_id" uuid, CONSTRAINT "PK_7f976ef6cecd37a53bd11685f32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "text_masters" ADD "alias" character varying`);
        await queryRunner.query(`ALTER TABLE "bookmarks" ADD CONSTRAINT "FK_825821fcd8ec08e29093a475e10" FOREIGN KEY ("text_master_id") REFERENCES "text_masters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookmarks" ADD CONSTRAINT "FK_d49e031f6a7321f5c3befaa5bfa" FOREIGN KEY ("project_member_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookmarks" DROP CONSTRAINT "FK_d49e031f6a7321f5c3befaa5bfa"`);
        await queryRunner.query(`ALTER TABLE "bookmarks" DROP CONSTRAINT "FK_825821fcd8ec08e29093a475e10"`);
        await queryRunner.query(`ALTER TABLE "text_masters" DROP COLUMN "alias"`);
        await queryRunner.query(`DROP TABLE "bookmarks"`);
    }

}
