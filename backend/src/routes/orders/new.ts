import passport from 'passport'
import express, { Request, Response } from 'express';

import { Order } from '../../models/order';
import sequelize from '../../db/connection';
import { Product } from '../../models/product';
import { OrderProduct } from '../../models/orderProduct';
import { DatabaseError } from '../../common/errors/database-error';


const router = express.Router();

router.post("/", [
    passport.authenticate('jwt', { session: false })
],
    async (req: Request, res: Response) => {
        try {

            const ipAddress = req.header('x-forwarded-for') ||
                req.socket.remoteAddress;
            const order = req.body
            await sequelize.transaction(async (t) => {
                
                const orderCreated = await Order.create({
                    idClient: order.idClient.id,
                    idAddress: parseInt(order.idAddress)
                } as Order, {
                    transaction: t
                })
                order.id = orderCreated.id
                const products = order.products as Product[]
                products.forEach(async(product, index) =>{
                    await OrderProduct.create({
                        idOrder: orderCreated.id,
                        idProduct: product.id,
                        quantity: order.products[index].quantity
                    })
                })
            })

            res.status(201).json({
                success: true,
                message: 'Order created',
                data: order,
                from: ipAddress
            });
        } catch (error) {
            console.log(error)
            throw new DatabaseError()
        }

    });

export { router as orderNewRouter };