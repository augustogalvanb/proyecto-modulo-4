import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAdmin1739393137162 implements MigrationInterface {
    name = 'AddAdmin1739393137162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_administrator_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "administrator" "public"."users_administrator_enum" NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "administrator"`);
        await queryRunner.query(`DROP TYPE "public"."users_administrator_enum"`);
    }

}
