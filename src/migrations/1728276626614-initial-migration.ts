import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1728276626614 implements MigrationInterface {
  name = 'InitialMigration1728276626614';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "books" ("id" SERIAL NOT NULL, "title" character varying(50) NOT NULL, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "chapters" ("id" SERIAL NOT NULL, "number" integer NOT NULL, "completed" boolean NOT NULL DEFAULT false, "book_id" integer, "block_id" integer, CONSTRAINT "PK_a2bbdbb4bdc786fe0cb0fcfc4a0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "blocks" ("id" SERIAL NOT NULL, "title" character varying(50) NOT NULL, "user_id" uuid, CONSTRAINT "PK_8244fa1495c4e9222a01059244b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_group_enum" AS ENUM('Alegria', 'Rebanho Ahavá', 'Plenitude')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "password" character varying(150) NOT NULL, "group" "public"."users_group_enum" NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "seeds" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, CONSTRAINT "UQ_9978f4e4f60d7f1fc1af7c7ff9c" UNIQUE ("name"), CONSTRAINT "PK_3ac799e4ece18bc838823bb6a4b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "chapters" ADD CONSTRAINT "FK_23af8ea9e68fef63d07b189e8d1" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "chapters" ADD CONSTRAINT "FK_d502ddcbfb96be6790d3b6d3e06" FOREIGN KEY ("block_id") REFERENCES "blocks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "blocks" ADD CONSTRAINT "FK_91d7d715d368c9d4ff34cc7160e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blocks" DROP CONSTRAINT "FK_91d7d715d368c9d4ff34cc7160e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "chapters" DROP CONSTRAINT "FK_d502ddcbfb96be6790d3b6d3e06"`,
    );
    await queryRunner.query(
      `ALTER TABLE "chapters" DROP CONSTRAINT "FK_23af8ea9e68fef63d07b189e8d1"`,
    );
    await queryRunner.query(`DROP TABLE "seeds"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_group_enum"`);
    await queryRunner.query(`DROP TABLE "blocks"`);
    await queryRunner.query(`DROP TABLE "chapters"`);
    await queryRunner.query(`DROP TABLE "books"`);
  }
}
