import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGuestGroup1729013757299 implements MigrationInterface {
  name = 'AddGuestGroup1729013757299';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."users_group_enum" RENAME TO "users_group_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_group_enum" AS ENUM('Alegria', 'Rebanho Ahavá', 'Plenitude', 'Convidado')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "group" TYPE "public"."users_group_enum" USING "group"::"text"::"public"."users_group_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."users_group_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_group_enum_old" AS ENUM('Alegria', 'Rebanho Ahavá', 'Plenitude')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "group" TYPE "public"."users_group_enum_old" USING "group"::"text"::"public"."users_group_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."users_group_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."users_group_enum_old" RENAME TO "users_group_enum"`,
    );
  }
}
