import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1693919963306 implements MigrationInterface {
    name = 'Migration1693919963306'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_texts" DROP CONSTRAINT "FK_5f9106690ad5779009591d5a789"`);
        await queryRunner.query(`ALTER TABLE "project_texts" RENAME COLUMN "text_id" TO "_id"`);
        await queryRunner.query(`ALTER TABLE "project_texts" RENAME CONSTRAINT "UQ_5f9106690ad5779009591d5a789" TO "UQ_46fc2ceccbeed1c8b67d32acddd"`);
        await queryRunner.query(`ALTER TABLE "texts" DROP COLUMN "text"`);
        await queryRunner.query(`ALTER TABLE "texts" DROP COLUMN "tag"`);
        await queryRunner.query(`ALTER TABLE "texts" ADD "content" character varying`);
        await queryRunner.query(`ALTER TABLE "project_texts" ADD CONSTRAINT "FK_46fc2ceccbeed1c8b67d32acddd" FOREIGN KEY ("_id") REFERENCES "texts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_texts" DROP CONSTRAINT "FK_46fc2ceccbeed1c8b67d32acddd"`);
        await queryRunner.query(`ALTER TABLE "texts" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "texts" ADD "tag" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "texts" ADD "text" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project_texts" RENAME CONSTRAINT "UQ_46fc2ceccbeed1c8b67d32acddd" TO "UQ_5f9106690ad5779009591d5a789"`);
        await queryRunner.query(`ALTER TABLE "project_texts" RENAME COLUMN "_id" TO "text_id"`);
        await queryRunner.query(`ALTER TABLE "project_texts" ADD CONSTRAINT "FK_5f9106690ad5779009591d5a789" FOREIGN KEY ("text_id") REFERENCES "texts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
