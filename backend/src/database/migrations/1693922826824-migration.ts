import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1693922826824 implements MigrationInterface {
    name = 'Migration1693922826824'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project_tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "project_id" uuid, "tag_id" uuid, CONSTRAINT "REL_1d0f9955e703904ce2245a2738" UNIQUE ("tag_id"), CONSTRAINT "PK_9c867fa530adf5a4fe96e19fa27" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "text_tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "text_id" uuid, "tag_id" uuid, CONSTRAINT "PK_4ec8615a4bc4d6ed32790709d07" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "texts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_ce044efbc0a1872f20feca7e19f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_texts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "project_id" uuid, "text_id" uuid, CONSTRAINT "REL_5f9106690ad5779009591d5a78" UNIQUE ("text_id"), CONSTRAINT "PK_8a7f6bf5fa2db02119b5d51c10a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "last_name" character varying NOT NULL, "first_name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_members" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "project_id" uuid, "member_id" uuid, CONSTRAINT "PK_0b2f46f804be4aea9234c78bcc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "project_tags" ADD CONSTRAINT "FK_bc13802855877d708af05b585ad" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_tags" ADD CONSTRAINT "FK_1d0f9955e703904ce2245a2738a" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "text_tags" ADD CONSTRAINT "FK_122715bf484439ec1fa8dc0f4ab" FOREIGN KEY ("text_id") REFERENCES "texts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "text_tags" ADD CONSTRAINT "FK_4b51e9a877a92ff57fdbde55c6f" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_texts" ADD CONSTRAINT "FK_1029cb042148b1d76051ae50dc6" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_texts" ADD CONSTRAINT "FK_5f9106690ad5779009591d5a789" FOREIGN KEY ("text_id") REFERENCES "texts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_members" ADD CONSTRAINT "FK_b5729113570c20c7e214cf3f58d" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_members" ADD CONSTRAINT "FK_0fe49d1dbe3867d97de555f675b" FOREIGN KEY ("member_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_members" DROP CONSTRAINT "FK_0fe49d1dbe3867d97de555f675b"`);
        await queryRunner.query(`ALTER TABLE "project_members" DROP CONSTRAINT "FK_b5729113570c20c7e214cf3f58d"`);
        await queryRunner.query(`ALTER TABLE "project_texts" DROP CONSTRAINT "FK_5f9106690ad5779009591d5a789"`);
        await queryRunner.query(`ALTER TABLE "project_texts" DROP CONSTRAINT "FK_1029cb042148b1d76051ae50dc6"`);
        await queryRunner.query(`ALTER TABLE "text_tags" DROP CONSTRAINT "FK_4b51e9a877a92ff57fdbde55c6f"`);
        await queryRunner.query(`ALTER TABLE "text_tags" DROP CONSTRAINT "FK_122715bf484439ec1fa8dc0f4ab"`);
        await queryRunner.query(`ALTER TABLE "project_tags" DROP CONSTRAINT "FK_1d0f9955e703904ce2245a2738a"`);
        await queryRunner.query(`ALTER TABLE "project_tags" DROP CONSTRAINT "FK_bc13802855877d708af05b585ad"`);
        await queryRunner.query(`DROP TABLE "project_members"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TABLE "project_texts"`);
        await queryRunner.query(`DROP TABLE "texts"`);
        await queryRunner.query(`DROP TABLE "text_tags"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "project_tags"`);
    }

}
