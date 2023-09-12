import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1694501405770 implements MigrationInterface {
  name = "Migration1694501405770";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "last_name" character varying NOT NULL, "first_name" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "project_members" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" "public"."project_members_role_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "project_id" uuid, "member_id" uuid, CONSTRAINT "PK_0b2f46f804be4aea9234c78bcc9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "text_contents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "text_master_id" uuid, "language_id" uuid, CONSTRAINT "PK_ad7edc59b69ea9fc16ae9db7044" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "languages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "project_id" uuid, CONSTRAINT "PK_b517f827ca496b29f4d549c631d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "text_masters" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "alias" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "project_id" uuid, CONSTRAINT "PK_a8229bd65472846b35c47132d31" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "text_tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "text_master_id" uuid, "tag_id" uuid, CONSTRAINT "PK_4ec8615a4bc4d6ed32790709d07" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "project_id" uuid, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "bookmarks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "text_master_id" uuid, "project_member_id" uuid, CONSTRAINT "PK_7f976ef6cecd37a53bd11685f32" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_members" ADD CONSTRAINT "FK_b5729113570c20c7e214cf3f58d" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_members" ADD CONSTRAINT "FK_0fe49d1dbe3867d97de555f675b" FOREIGN KEY ("member_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "text_contents" ADD CONSTRAINT "FK_6d77cce3eb6761263c89c5bf201" FOREIGN KEY ("text_master_id") REFERENCES "text_masters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "text_contents" ADD CONSTRAINT "FK_82ad31e1947ddf058c37062aa00" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "languages" ADD CONSTRAINT "FK_df927a65a54f70a73645f151dcb" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "text_masters" ADD CONSTRAINT "FK_bff1ff0633aee04485cb4664854" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "text_tags" ADD CONSTRAINT "FK_0c4390323123037a07aec51e96f" FOREIGN KEY ("text_master_id") REFERENCES "text_masters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "text_tags" ADD CONSTRAINT "FK_4b51e9a877a92ff57fdbde55c6f" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tags" ADD CONSTRAINT "FK_7ab852bb0ada09a0fc3adb7e5de" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarks" ADD CONSTRAINT "FK_825821fcd8ec08e29093a475e10" FOREIGN KEY ("text_master_id") REFERENCES "text_masters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarks" ADD CONSTRAINT "FK_d49e031f6a7321f5c3befaa5bfa" FOREIGN KEY ("project_member_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bookmarks" DROP CONSTRAINT "FK_d49e031f6a7321f5c3befaa5bfa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarks" DROP CONSTRAINT "FK_825821fcd8ec08e29093a475e10"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tags" DROP CONSTRAINT "FK_7ab852bb0ada09a0fc3adb7e5de"`,
    );
    await queryRunner.query(
      `ALTER TABLE "text_tags" DROP CONSTRAINT "FK_4b51e9a877a92ff57fdbde55c6f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "text_tags" DROP CONSTRAINT "FK_0c4390323123037a07aec51e96f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "text_masters" DROP CONSTRAINT "FK_bff1ff0633aee04485cb4664854"`,
    );
    await queryRunner.query(
      `ALTER TABLE "languages" DROP CONSTRAINT "FK_df927a65a54f70a73645f151dcb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "text_contents" DROP CONSTRAINT "FK_82ad31e1947ddf058c37062aa00"`,
    );
    await queryRunner.query(
      `ALTER TABLE "text_contents" DROP CONSTRAINT "FK_6d77cce3eb6761263c89c5bf201"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_members" DROP CONSTRAINT "FK_0fe49d1dbe3867d97de555f675b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "project_members" DROP CONSTRAINT "FK_b5729113570c20c7e214cf3f58d"`,
    );
    await queryRunner.query(`DROP TABLE "bookmarks"`);
    await queryRunner.query(`DROP TABLE "tags"`);
    await queryRunner.query(`DROP TABLE "text_tags"`);
    await queryRunner.query(`DROP TABLE "text_masters"`);
    await queryRunner.query(`DROP TABLE "projects"`);
    await queryRunner.query(`DROP TABLE "languages"`);
    await queryRunner.query(`DROP TABLE "text_contents"`);
    await queryRunner.query(`DROP TABLE "project_members"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
