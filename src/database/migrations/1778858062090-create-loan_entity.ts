import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLoanEntity1778858062090 implements MigrationInterface {
    name = 'CreateLoanEntity1778858062090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."loan_entity_status_enum" AS ENUM('active', 'returned', 'overdue', 'lost')`);
        await queryRunner.query(`CREATE TABLE "loan_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "loanedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "dueAt" TIMESTAMP WITH TIME ZONE NOT NULL, "returnedAt" TIMESTAMP WITH TIME ZONE, "status" "public"."loan_entity_status_enum" NOT NULL DEFAULT 'active', "fineAmount" numeric(10,2) NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "itemId" uuid, CONSTRAINT "PK_72bd9d3889f404a5377093d0984" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5b59f75eb1541fc5df9a83f95d" ON "loan_entity" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e53fcb604d57c089c6d97694a6" ON "loan_entity" ("itemId") `);
        await queryRunner.query(`ALTER TABLE "item_entity" ADD CONSTRAINT "FK_312bc8629bb0d68cf96ffab683e" FOREIGN KEY ("loanId") REFERENCES "loan_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loan_entity" ADD CONSTRAINT "FK_5b59f75eb1541fc5df9a83f95dc" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "loan_entity" ADD CONSTRAINT "FK_e53fcb604d57c089c6d97694a66" FOREIGN KEY ("itemId") REFERENCES "item_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loan_entity" DROP CONSTRAINT "FK_e53fcb604d57c089c6d97694a66"`);
        await queryRunner.query(`ALTER TABLE "loan_entity" DROP CONSTRAINT "FK_5b59f75eb1541fc5df9a83f95dc"`);
        await queryRunner.query(`ALTER TABLE "item_entity" DROP CONSTRAINT "FK_312bc8629bb0d68cf96ffab683e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e53fcb604d57c089c6d97694a6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5b59f75eb1541fc5df9a83f95d"`);
        await queryRunner.query(`DROP TABLE "loan_entity"`);
        await queryRunner.query(`DROP TYPE "public"."loan_entity_status_enum"`);
    }

}
