import { Column, DataType, Model, PrimaryKey, Table, CreatedAt, UpdatedAt, ForeignKey, BelongsToMany, BelongsTo } from "sequelize-typescript";
import { Product } from "./product";
import { User } from "./user";
import { Address } from "./address";
import { OrderProduct } from "./orderProduct";

@Table({
    tableName: 'orders',
    modelName: 'Order',
    timestamps: true
})
export class Order extends Model<Order>{
    @PrimaryKey
    @Column({
        autoIncrement: true,
        type: DataType.INTEGER
    })
    public id!: number;

    @ForeignKey(() => User)
    @Column({
        field: 'id_client',
        allowNull: false
    })
    idClient!: number

    @ForeignKey(() => User)
    @Column({
        field: 'id_delivery',
        allowNull: true
    })
    idDelivery?: number

    @Column({
        type: DataType.ENUM('PAID', 'DISPATCH', 'ON-THE-WAY', 'DELIVERED'),
        allowNull: false,
    })
    public status!: string;

    @Column({
        type: DataType.DOUBLE,
        allowNull: true,
    })
    public lat?: number;
    @Column({
        type: DataType.DOUBLE,
        allowNull: true,
    })
    public lng?: number;

    @ForeignKey(() => Address)
    @Column({
        field: 'id_address',
        allowNull: false
    })
    idAddress!: number

    @BelongsTo(() => Address)
    address!: Address

    @BelongsTo(() => User)
    client!: User

    @BelongsTo(() => User)
    delivery!: User

    @BelongsToMany(() => Product, () => OrderProduct)
    products?: Product[];

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

    toJSON() {
        return { ...this.get(), id: this.id.toString() };
    }
}