import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { Order } from "./order";
import { Product } from "./product";

@Table({
    tableName: 'order_has_products'
})
export class OrderProduct extends Model {
    @PrimaryKey
    @ForeignKey(() => Order)
    @Column({
        field: 'id_order'
    })
    idOrder!: number;

    @PrimaryKey
    @ForeignKey(() => Product)
    @Column({
        field: 'id_product'
    })
    idProduct!: number;

    @BelongsTo(() => Order)
    order!: Order;

    @BelongsTo(() => Product)
    product!: Product;

    @Column({
        type: DataType.DOUBLE,
    })
    quantity!: number;

    @CreatedAt
    @Column({
        allowNull: false,
        type: DataType.DATE,
        field: 'created_at'
    })
    createdAt?: Date;

    @UpdatedAt
    @Column({
        allowNull: true,
        type: DataType.DATE,
        field: 'update_at'
    })
    updateAt?: Date;
}