import passport from 'passport'
import { DatabaseError } from '../../common/errors/database-error';
import sequelize from '../../db/connection';
import express, { Request, Response } from 'express';
import { Order } from '../../models/order';
import { User } from '../../models/user';
import admin from '../../firebase/firebaseAdmin';


const router = express.Router();
router.put("/update-to-dispatched", [
    passport.authenticate('jwt', { session: false }),
],
    async (req: Request, res: Response) => {
        try {

            const ipAddress = req.header('x-forwarded-for') ||
                req.socket.remoteAddress;
            const order = req.body

            await sequelize.transaction(async (t) => {
                await Order.update({
                    status: "DISPATCH",
                    updateAt: new Date(),
                    idDelivery: order.idDelivery.id
                }, {
                    where: {
                        id: order.id
                    },
                    transaction: t
                });


            })
            const orderTmp = await Order.findOne({
                where: {
                    id: order.id
                },
                include: [
                    {
                        model: User, // Include the User model for idClient
                        as: 'client',
                      },
                      {
                        model: User, // Include the User model for idClient
                        as: 'delivery',
                      },
                ],
            });

            const deliveryMan = await User.findByPk(order.idDelivery.id)
            if (!orderTmp && !deliveryMan)
                throw new DatabaseError()

            
                deliveryMan && order.client.notificationToken && await admin.messaging().sendEachForMulticast({
                tokens: [deliveryMan.notificationToken, order.client.notificationToken],
                data:{},
                notification:{
                    body: `New order for ${order.address.address}`,
                    title: "NEW ORDER FOR YOU",
                }
            })

            res.status(200).json({
                success: true,
                message: 'Order updated',
                data: orderTmp,
                from: ipAddress
            });
        } catch (error) {
            console.error(error)
            throw new DatabaseError()
        }

    });

router.put("/update-to-on-the-way", [
    passport.authenticate('jwt', { session: false }),
],
    async (req: Request, res: Response) => {
        try {

            const ipAddress = req.header('x-forwarded-for') ||
                req.socket.remoteAddress;
            const order = req.body

            let data = await sequelize.transaction(async (t) => {
                await Order.update({
                    status: "ON-THE-WAY",
                    updateAt: new Date(),
                    idDelivery: order.idDelivery.id
                }, {
                    where: {
                        id: order.id
                    },
                    transaction: t
                });

                const orderTmp = await Order.findByPk(order.id);
                if (!orderTmp)
                    throw new DatabaseError()

                return orderTmp
            })


            res.status(200).json({
                success: true,
                message: 'Order updated',
                data,
                from: ipAddress
            });
        } catch (error) {
            console.error(error)
            throw new DatabaseError()
        }

    });

router.put("/update-to-delivered", [
    passport.authenticate('jwt', { session: false }),
],
    async (req: Request, res: Response) => {
        try {

            const ipAddress = req.header('x-forwarded-for') ||
                req.socket.remoteAddress;
            const order = req.body

            let data = await sequelize.transaction(async (t) => {
                await Order.update({
                    status: "DELIVERED",
                    updateAt: new Date(),
                    idDelivery: order.idDelivery.id
                }, {
                    where: {
                        id: order.id
                    },
                    transaction: t
                });

                const orderTmp = await Order.findByPk(order.id);
                if (!orderTmp)
                    throw new DatabaseError()

                return orderTmp
            })


            res.status(200).json({
                success: true,
                message: 'Order Delivered',
                data,
                from: ipAddress
            });
        } catch (error) {
            console.error(error)
            throw new DatabaseError()
        }

    });

export { router as orderUpdateRouter };