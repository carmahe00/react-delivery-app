import passport from 'passport'
import { DatabaseError } from '../../common/errors/database-error';
import sequelize from '../../db/connection';
import { Category } from '../../models/category';
import storage from '../../utils/cloud-storage'
import express, { Request, Response } from 'express';
import upload from '../../config/multer';


const router = express.Router();

router.put("/update-with-image", [
    passport.authenticate('jwt', { session: false }),
    upload.array('image', 1)
],
    async (req: Request, res: Response) => {
        try {

            const ipAddress = req.header('x-forwarded-for') ||
                req.socket.remoteAddress;
            const category = JSON.parse(req.body.category)
            const files = req.files
            let path = ''
            let url = ''
            await sequelize.transaction(async (t) => {
                let categoryTmp = await Category.findByPk(category.id)
                if (files && files?.length && categoryTmp) {
                    path = `image_${Date.now()}`
                    if (Array.isArray(files))
                        url = await storage(files[0], path, categoryTmp.image)
                    if (url !== '')
                        category.image = url
                }

                return await Category.update(category, {
                    where: {
                        id: category.id
                    },
                    transaction: t
                })

            })
            res.json({
                success: true,
                message: 'Category updated',
                data: category,
                from: ipAddress
            });
        } catch (error) {
            console.log(error)
            throw new DatabaseError()
        }

    });
router.put("/", [
    passport.authenticate('jwt', { session: false }),
],
    async (req: Request, res: Response) => {
        try {

            const ipAddress = req.header('x-forwarded-for') ||
                req.socket.remoteAddress;
            const category = req.body

            let data = await sequelize.transaction(async (t) => {
                await Category.update({
                    name: category.name,
                    description: category.description
                }, {
                    where: {
                        id: category.id
                    },
                    transaction: t
                });

                const categoryReducer = await Category.findByPk(category.id);
                if (!categoryReducer)
                    throw new DatabaseError()

                return categoryReducer
            })


            res.status(200).json({
                success: true,
                message: 'Category updated',
                data,
                from: ipAddress
            });
        } catch (error) {
            console.error(error)
            throw new DatabaseError()
        }

    });
export { router as categoryUpdateRouter };