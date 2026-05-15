import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateItemsEntity1778857440961 implements MigrationInterface {
    name = 'CreateItemsEntity1778857440961'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."item_entity_type_enum" AS ENUM('book', 'magazine', 'equipment')`);
        await queryRunner.query(`CREATE TABLE "item_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying(32) NOT NULL, "title" character varying(255) NOT NULL, "type" "public"."item_entity_type_enum" NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "loanId" uuid, CONSTRAINT "UQ_81e86c32d2389eaa20ca1e52f12" UNIQUE ("code"), CONSTRAINT "PK_f8a329b22f66835df041692589d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_81e86c32d2389eaa20ca1e52f1" ON "item_entity" ("code") `);
        await queryRunner.query(`ALTER TABLE "item_entity" ADD CONSTRAINT "FK_312bc8629bb0d68cf96ffab683e" FOREIGN KEY ("loanId") REFERENCES "loan_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item_entity" DROP CONSTRAINT "FK_312bc8629bb0d68cf96ffab683e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_81e86c32d2389eaa20ca1e52f1"`);
        await queryRunner.query(`DROP TABLE "item_entity"`);
        await queryRunner.query(`DROP TYPE "public"."item_entity_type_enum"`);
    }

}
