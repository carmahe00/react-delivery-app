import passport from 'passport';
import express, { Request, Response } from 'express';
import { Payment, MercadoPagoConfig } from 'mercadopago';
import Stripe from 'stripe';

import { Order } from '../../models/order';
import sequelize from '../../db/connection';
import { OrderProduct } from '../../models/orderProduct';
import { Items } from 'mercadopago/dist/clients/commonTypes';
import { ErrorMercadoPago } from '../../common/errors/error-mercado-pago';
import { PaymentRequest } from '../../common/interfaces/PaymentRequest';
import { ErrorStripe } from '../../common/errors/error-stripe';
const router = express.Router();

const stripe = new Stripe(process.env.SECRET_KEY_STRIPE!);
const client = new MercadoPagoConfig({
    accessToken: process.env.ACCESS_TOKEN!, options: {
        timeout: 5000,
    }
});
router.post("/create/mercado-pago", [
    passport.authenticate('jwt', { session: false })
],
    async (req: Request, res: Response) => {
        try {

            const payment = new Payment(client);
            const ipAddress = req.header('x-forwarded-for') ||
                req.socket.remoteAddress;
            let paymentBody = req.body as PaymentRequest
            let items: Items[] = paymentBody.order.products.map(p => ({
                id: p.id,
                title: p.description,
                description: p.description,
                picture_url: p.image1,
                category_id: p.idCategory.toString(),
                quantity: p.quantity,
                unit_price: Number(p.price),

            }))
            const result = await payment.create({
                body: {
                    transaction_amount: Number(paymentBody.transaction_amount),
                    token: paymentBody.token,
                    description: paymentBody.description || "Descriprion of product",
                    installments: Number(paymentBody.installments),
                    payment_method_id: paymentBody.payment_method_id,
                    issuer_id: Number(paymentBody.issuer_id),
                    payer: {
                        email: paymentBody.payer.email,
                        identification: {
                            type: paymentBody.payer.identification.type,
                            number: paymentBody.payer.identification.number
                        },
                        first_name: paymentBody.payer.name,
                        last_name: paymentBody.payer.last_name
                    },
                    additional_info: {
                        payer: {

                            address: {
                                street_name: paymentBody.order.idClient.address.neighborhood,
                                street_number: Number(paymentBody.order.idClient.address.id) || 0,
                                zip_code: paymentBody.order.idClient.address.refPoint
                            },
                            first_name: paymentBody.payer.name,
                            last_name: paymentBody.payer.last_name,

                        },
                        ip_address: ipAddress,
                        items
                    }
                }
            })
            if (result !== undefined && result !== null) {
                console.log(`Client's data: ${JSON.stringify(result, null, 3)}`)
                if (result !== undefined && result.status == "approved") {
                    const order = paymentBody.order
                    await sequelize.transaction(async (t) => {

                        const orderCreated = await Order.create({
                            idClient: order.idClient.id,
                            idAddress: parseInt(order.idAddress),
                            status: "PAID"
                        } as Order, {
                            transaction: t
                        })
                        order.idClient.id = orderCreated.id
                        const products = order.products
                        products.forEach(async (product, index) => {
                            await OrderProduct.create({
                                idOrder: orderCreated.id,
                                idProduct: product.id,
                                quantity: order.products[index].quantity
                            })
                        })
                    })

                    return res.status(201).json({
                        success: true,
                        message: 'Order created',
                        data: result,
                        from: ipAddress
                    });
                }

            } else {
                return res.status(501).json({
                    success: false,
                    message: 'Error to proccess payment',
                    from: ipAddress
                });
            }
        } catch (error) {
            console.log(error)
            throw new ErrorMercadoPago()
        }

    });

router.post("/create/intents", async (req, res) => {
    try {
        const ipAddress = req.header('x-forwarded-for') ||
            req.socket.remoteAddress;
        let paymentBody = req.body as PaymentRequest
        let amount = 0
        // let items: Items[] = paymentBody.order.products.map(p => {
        //     amount = amount+Number(p.price)
        //     return ({
        //         id: p.id,
        //         title: p.description,
        //         description: p.description,
        //         picture_url: p.image1,
        //         category_id: p.idCategory.toString(),
        //         quantity: p.quantity,
        //         unit_price: Number(p.price),

        //     })
        // })
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 500000, // Adjust the amount to meet the minimum requirement (e.g., 50 cents or equivalent in your currency)
            currency: "COP",
            automatic_payment_methods: {
                enabled: true
            },
            
        });


        return res.status(201).json({
            success: true,
            message: 'Payment Intetent success',
            data: paymentIntent.client_secret,
            from: ipAddress
        });
    } catch (error) {
        console.log(error)
        throw new ErrorStripe()
    }
})

export { router as paymentMercadoPago };