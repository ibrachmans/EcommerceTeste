import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddProductDiscount1627484858229 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "products",
            new TableColumn({
                name: "discount",
                type: "number",
                isNullable: true,
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("products", "discount");
    }

}
