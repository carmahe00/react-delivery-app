import { BelongsToMany, Column, DataType, Model, PrimaryKey, Table, CreatedAt, UpdatedAt } from "sequelize-typescript";
import { User } from "./user";
import { UserRole } from "./UserRole";

@Table({
    tableName: 'roles',
    modelName: 'Role'
})
export class Role extends Model<Role>{
    @PrimaryKey
    @Column({
        autoIncrement: true,
        type: DataType.INTEGER
    })
    public id!: number;
    @Column({
        type: DataType.ENUM('CLIENT', 'ADMIN', 'DELIVERY'),
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
    public route!: string;
    @BelongsToMany(() => User, () => UserRole)
    users?: User[];

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