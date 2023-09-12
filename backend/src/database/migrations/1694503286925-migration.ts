import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1694503286925 implements MigrationInterface {
  name = "Migration1694503286925";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "profile_image" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profile_image"`);
  }
}
