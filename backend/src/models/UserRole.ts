import { Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from "sequelize-typescript";
import { User } from "./user";
import { Role } from "./role";

@Table({
    tableName: 'users_roles'
})
export class UserRole extends Model {
    @ForeignKey(() => User)
    @Column({
        field: 'id_user'
    })
    userId!: number;

    @ForeignKey(() => Role)
    @Column({
        field: 'id_role'
    })
    roleId!: number;

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