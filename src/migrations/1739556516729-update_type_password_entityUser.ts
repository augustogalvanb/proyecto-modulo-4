import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTypePasswordEntityUser1739556516729 implements MigrationInterface {
    name = 'UpdateTypePasswordEntityUser1739556516729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" TYPE character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" TYPE character varying(20)`);
    }

}
