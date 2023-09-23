import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695432175097 implements MigrationInterface {
  name = "Migration1695432175097";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "text_masters" ADD "updater_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "text_masters" ADD CONSTRAINT "FK_fca24ebd29fb1c782de79459db4" FOREIGN KEY ("updater_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "text_masters" DROP CONSTRAINT "FK_fca24ebd29fb1c782de79459db4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "text_masters" DROP COLUMN "updater_id"`,
    );
  }
}
