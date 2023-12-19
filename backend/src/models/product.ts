import { Column, DataType, Model, PrimaryKey, Table, CreatedAt, UpdatedAt, BelongsTo, ForeignKey, BelongsToMany } from "sequelize-typescript";
import { Category } from "./category";
import { OrderProduct } from "./orderProduct";
import { Order } from "./order";

@Table({
    tableName: 'products',
    modelName: 'Product'
})
export class Product extends Model<Product>{
    @PrimaryKey
    @Column({
        autoIncrement: true,
        type: DataType.INTEGER
    })
    public id!: number;
    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    public name!: string;
    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    public image1!: string;
    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    public image2!: string;
    @Column({
        type: DataType.TEXT,
        allowNull: true
    })
    public image3!: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public description!: string;
    @BelongsTo(() => Category)
    category?: Category;

    @Column({
        field: 'price',
        type: DataType.DECIMAL,
    })
    price!: number

    @ForeignKey(() => Category)
    @Column({
        field: 'id_category'
    })
    idCategory!: number

    @BelongsToMany(() => Order, () => OrderProduct)
    orders?: Order[];

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