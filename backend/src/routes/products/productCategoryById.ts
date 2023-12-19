import express, { Request, Response } from 'express';
import passport from 'passport'
import { DatabaseError } from '../../common/errors/database-error';
import { Product } from '../../models/product';
const router = express.Router();
router.get('/findByCategory/:id_category',
    [
        passport.authenticate('jwt', { session: false }),
    ],
    async (req: Request, res: Response) => {
        try {
            const ipAddress = req.header('x-forwarded-for') ||
                req.socket.remoteAddress;
            const idCategory = req.params.id_category
            const products = await Product.findAll({
                where: {
                    idCategory
                },
                include: []
            })
            res.status(200).json({
                success: true,
                message: 'User created',
                data: products,
                from: ipAddress
            });
        } catch (error) {
            console.log(error)
            throw new DatabaseError()
        }
    })
export { router as productCategoryByIdRouter };