import express, { Request, Response } from 'express';
import passport from 'passport'
import sequelize from '../../db/connection';
import { DatabaseError } from '../../common/errors/database-error';
import { Product } from '../../models/product';
import cloudDelete from '../../utils/cloud-delete';
const router = express.Router();
router.delete('/:id',
    [
        passport.authenticate('jwt', { session: false }),
    ],
    async (req: Request, res: Response) => {
        try {
            const ipAddress = req.header('x-forwarded-for') ||
                req.socket.remoteAddress;
            const id = req.params.id
            
            await sequelize.transaction(async (t) => {
                let productTmp = await Product.findByPk(id)
                if (productTmp)
                    await cloudDelete([productTmp.image1, productTmp.image2, productTmp.image3])
                await productTmp?.destroy({
                    transaction: t
                })
                return productTmp
    
            })
            res.status(200).json({
                success: true,
                message: 'User created',
                data: id,
                from: ipAddress
            });
        } catch (error) {
            console.log(error)
            throw new DatabaseError()
        }
    })
export { router as productDeleteRouter };