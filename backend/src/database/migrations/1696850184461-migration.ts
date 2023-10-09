import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1696850184461 implements MigrationInterface {
  name = "Migration1696850184461";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bookmarks" DROP CONSTRAINT "FK_d49e031f6a7321f5c3befaa5bfa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarks" ADD CONSTRAINT "FK_d49e031f6a7321f5c3befaa5bfa" FOREIGN KEY ("project_member_id") REFERENCES "project_members"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bookmarks" DROP CONSTRAINT "FK_d49e031f6a7321f5c3befaa5bfa"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarks" ADD CONSTRAINT "FK_d49e031f6a7321f5c3befaa5bfa" FOREIGN KEY ("project_member_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
