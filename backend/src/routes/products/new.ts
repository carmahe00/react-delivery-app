import passport from 'passport'
import { DatabaseError } from '../../common/errors/database-error';
import sequelize from '../../db/connection';
import storage from '../../utils/cloud-storage'
import express, { Request, Response } from 'express';
import upload from '../../config/multer';
import { Product } from '../../models/product';
import asyncForEach from '../../utils/async-foreach';


const router = express.Router();

router.post("/", [
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
            let productCreated: Product | undefined;
            await sequelize.transaction(async (t) => {

                productCreated = await Product.create(product, {
                    transaction: t
                })
                product.id = productCreated.id
                if (productCreated !== undefined) {

                    const start = async () => {
                        await asyncForEach(files, async (file: Express.Multer.File) => {
                            path = `image_${Date.now()}`
                            if (Array.isArray(files))
                                url = await storage(file, path)
                            if (url !== '') {// Image Created

                                switch (inserts) {
                                    case 0:
                                        productCreated!.image1 = url
                                        break;
                                    case 1:
                                        productCreated!.image2 = url
                                        break;
                                    case 2:
                                        productCreated!.image3 = url
                                        break;
                                    default:
                                        break;
                                }
                                productCreated = await productCreated!.save()
                                inserts++
                            }
                        })
                    }
                    start()
                }
            })
            if (!productCreated)
                throw new DatabaseError()

            res.status(201).json({
                success: true,
                message: 'Product created',
                data: productCreated,
                from: ipAddress
            });
        } catch (error) {
            console.log(error)
            throw new DatabaseError()
        }

    });

export { router as productNewRouter };