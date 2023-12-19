import passport from 'passport'
import { DatabaseError } from '../../common/errors/database-error';
import sequelize from '../../db/connection';
import storage from '../../utils/cloud-storage'
import express, { Request, Response } from 'express';
import upload from '../../config/multer';
import { Product } from '../../models/product';
import asyncForEach from '../../utils/async-foreach';
import cloudDelete from '../../utils/cloud-delete';


const router = express.Router();

router.put("/", [
    passport.authenticate('jwt', { session: false }),
],
    async (req: Request, res: Response) => {
        try {

            const ipAddress = req.header('x-forwarded-for') ||
                req.socket.remoteAddress;
            const product = req.body
            let data = await sequelize.transaction(async (t) => {
                await Product.update({
                    name: product.name,
                    description: product.description,
                    price: product.price
                }, {
                    where: {
                        id: product.id
                    },
                    transaction: t
                });

                const productReducer = await Product.findByPk(product.id);
                if (!productReducer)
                    throw new DatabaseError()

                return productReducer
            })


            res.status(200).json({
                success: true,
                message: 'Product updated',
                data,
                from: ipAddress
            });
        } catch (error) {
            console.error(error)
            throw new DatabaseError()
        }

    });


router.put("/update-with-image", [
    passport.authenticate('jwt', { session: false }),
    upload.array('image', 3)
],
    async (req: Request, res: Response) => {
        try {

            const ipAddress = req.header('x-forwarded-for') ||
                req.socket.remoteAddress;
            const product = JSON.parse(req.body.product)
            const files = req.files
            if (!files?.length) {
                return res.status(400).json({
                    success: true,
                    message: 'Product do not have images',
                    data: product,
                    from: ipAddress
                });
            }
            let inserts = 0
            let path = ''
            let url = ''
            let productUpdated: Product | null = null;
            await sequelize.transaction(async (t) => {

                productUpdated = await Product.findByPk(product.id)
                if (productUpdated !== null) {
                    productUpdated.description = product.description
                    productUpdated.name = product.name
                    productUpdated.price = product.price
                    product.id = productUpdated.id
                    await cloudDelete([productUpdated.image1, productUpdated.image2, productUpdated.image3])
                    const start = async () => {
                        await asyncForEach(files, async (file: Express.Multer.File) => {
                            path = `image_${Date.now()}`
                            if (Array.isArray(files))
                                url = await storage(file, path)
                            if (url !== '') {// Image Created

                                switch (inserts) {
                                    case 0:
                                        productUpdated!.image1 = url
                                        break;
                                    case 1:
                                        productUpdated!.image2 = url
                                        break;
                                    case 2:
                                        productUpdated!.image3 = url
                                        break;
                                    default:
                                        break;
                                }
                                productUpdated = await productUpdated!.save()
                                inserts++
                            }
                        })
                    }
                    start()
                }
            })
            if (productUpdated == null)
                throw new DatabaseError()

            res.status(201).json({
                success: true,
                message: 'Product created',
                data: productUpdated,
                from: ipAddress
            });
        } catch (error) {
            console.log(error)
            throw new DatabaseError()
        }

    });

export { router as productUpdateRouter };