import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsers1599611404022 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(new Table({
      name: "users",
      columns: [
        {
          name: "id",
          type: "integer",
          isPrimary: true,
        },
        {
          name: "name",
          type: "varchar",
          isNullable: false,
        },
        {
          name: "email",
          type: "varchar",
          isNullable: false,
          isUnique: true,
        },
        {
          name: "password",
          type: "varchar",
          isNullable: false,
        },
      ]
    }))
  }
  async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable("users")
  }
}
