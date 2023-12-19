import { Column, DataType, Model, PrimaryKey, Table, CreatedAt, UpdatedAt, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./user";

@Table({
    tableName: 'addresses',
    modelName: 'address'
})
export class Address extends Model<Address>{
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
    public address!: string;
    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    public neighborhood!: string;
    @Column({
        type: DataType.TEXT,
        allowNull: true,
        field: 'ref_point',
    })
    public refPoint?: string;
    @Column({
        type: DataType.DOUBLE,
        allowNull: false,
    })
    public lat!: number;
    @Column({
        type: DataType.DOUBLE,
        allowNull: false,
    })
    public lng!: number;

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

    @ForeignKey(() => User)
    @Column({
        field: 'id_user',
        allowNull: false
    })
    userId!: number

    @BelongsTo(() => User)
    user!: User;

    toJSON() {
        return { ...this.get(), id: this.id.toString() };
    }
}