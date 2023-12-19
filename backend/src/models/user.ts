import { Column, PrimaryKey, Table, Model, DataType, BelongsToMany, BeforeCreate, BeforeUpdate, CreatedAt, UpdatedAt, HasMany } from 'sequelize-typescript'
import bcrypt from 'bcrypt'
import { Role } from "./role";
import { UserRole } from './UserRole';
import { Address } from './address';

@Table({
    tableName: 'users',
    modelName: 'User'
})
export class User extends Model<User>{
    @PrimaryKey
    @Column({
        autoIncrement: true,
        type: DataType.INTEGER
    })
    public id!: number;
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i
        }
    })
    public email!: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: 'last_name'
    })
    public lastName!: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    public phone!: string;
    @Column({
        type: DataType.CHAR
    })
    public image!: string;
    @Column({
        type: DataType.CHAR,
        allowNull: false
    })
    public password!: string;
    @Column({
        type: DataType.CHAR,
        field: 'session_token'
    })
    public sessionToken!: string;

    @Column({
        type: DataType.CHAR,
        field: 'notification_token'
    })
    public notificationToken?: string;

    @BelongsToMany(() => Role, () => UserRole)
    roles?: Role[];

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

    @HasMany(() => Address, {
        onDelete: "CASCADE"
    })
    addresses!: Address[];

    public comparePassword(candidatePassword: string) {
        return bcrypt.compareSync(candidatePassword, this.password)
    }

    @BeforeCreate
    @BeforeUpdate
    static async hashMethod(record: User) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(record.dataValues.password, saltRounds);
        record.dataValues.password = hashedPassword;
    }

    toJSON(){
        const values = { ...this.get() };
        // @ts-ignore
        delete values.password
        return values;
    }
}