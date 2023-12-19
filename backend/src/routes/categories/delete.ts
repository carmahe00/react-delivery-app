import express, { Request, Response } from 'express';
import passport from 'passport';
import { DatabaseError } from '../../common/errors/database-error';
import { Category } from '../../models/category';
import sequelize from '../../db/connection';
import cloudDelete from '../../utils/cloud-delete';
const router = express.Router();

router.delete("/:id", [
    passport.authenticate('jwt', { session: false }),
], async (req: Request, res: Response) => {
    try {
        const ipAddress = req.header('x-forwarded-for') ||
            req.socket.remoteAddress;
        const id = req.params.id
        const data = await sequelize.transaction(async (t) => {
            let categoryTmp = await Category.findByPk(id)
            if (categoryTmp)
                await cloudDelete([categoryTmp.image])
            await categoryTmp?.destroy({
                transaction:t
            })
            return categoryTmp

        })
        return res.status(200).json({
            success: true,
            message: 'Category deleted',
            data,
            from: ipAddress
        });
    } catch (error) {
        console.log(error)
        throw new DatabaseError()
    }
})

export { router as deleteCategoryRoute }
