import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1694503385586 implements MigrationInterface {
  name = "Migration1694503385586";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_name"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "first_name"`);
    await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "first_name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "last_name" character varying NOT NULL`,
    );
  }
}
