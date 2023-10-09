import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1696854860323 implements MigrationInterface {
  name = "Migration1696854860323";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "text_masters" ADD "memo" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "text_masters" DROP COLUMN "memo"`);
  }
}
