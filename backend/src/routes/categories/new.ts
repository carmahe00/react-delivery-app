import passport from 'passport'
import { DatabaseError } from '../../common/errors/database-error';
import sequelize from '../../db/connection';
import { Category } from '../../models/category';
import storage from '../../utils/cloud-storage'
import express, { Request, Response } from 'express';
import upload from '../../config/multer';


const router = express.Router();

router.post("/", [
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
                if (files && files?.length) {
                    path = `image_${Date.now()}`
                    if (Array.isArray(files))
                        url = await storage(files[0], path)
                    if (url !== '')
                        category.image = url
                }
                const categoryCreated = await Category.create(category)
                category.id = categoryCreated.id
            })

            res.status(201).json({
                success: true,
                message: 'Category created',
                data: category,
                from: ipAddress
            });
        } catch (error) {
            console.log(error)
            throw new DatabaseError()
        }

    });

export { router as categoryNewRouter };