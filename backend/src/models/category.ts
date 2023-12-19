import { Column, DataType, Model, PrimaryKey, Table, CreatedAt, UpdatedAt, HasMany } from "sequelize-typescript";
import { Product } from "./product";

@Table({
    tableName: 'categories',
    modelName: 'Category'
})
export class Category extends Model<Category>{
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
    })
    public image!: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public description!: string;

    @HasMany(() => Product, {
        onDelete: "CASCADE"
    })
    products!: Product[];

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