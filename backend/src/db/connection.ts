import { Sequelize } from 'sequelize-typescript';
import { Role } from '../models/role';
import { User } from '../models/user';
import { UserRole } from '../models/UserRole';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { Address } from '../models/address';
import { Order } from '../models/order';
import { OrderProduct } from '../models/orderProduct';
const sequelize = new Sequelize('delivery', 'root', 'sufi1234', {
  host: 'localhost',
  dialect: 'mysql',
  logQueryParameters: true,
  port: 3306,
  logging: (...msg) => console.log(msg),
  sync: {force: true, alter:true},
});

sequelize.addModels([Role, User, UserRole, Category, Product, Address, Order, OrderProduct])

export default sequelize;