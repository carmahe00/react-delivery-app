import passport from 'passport'
import { DatabaseError } from '../../common/errors/database-error';
import express, { Request, Response } from 'express';
import { User } from '../../models/user';
import storage from '../../utils/cloud-storage';
import jwt from 'jsonwebtoken';

const router = express.Router();

import upload from '../../config/multer';
import { variable } from '../../config/keys';
import sequelize from '../../db/connection';
router.put("/update-with-image", [
    passport.authenticate('jwt', { session: false }),
    upload.array('image', 1)
], async (req: Request, res: Response) => {

    try {
        const ipAddress = req.header('x-forwarded-for') ||
            req.socket.remoteAddress;
        const user = JSON.parse(req.body.user)
        const files = req.files
        let path = ''
        let url = ''
        await sequelize.transaction(async (t) => {
            if (files && files?.length) {
                path = `image_${Date.now()}`
                if (Array.isArray(files))
                    url = await storage(files[0], path, user.newSate.image)
                if (url !== '')
                    user.image = url
            }

            return await User.update(user, {
                where: {
                    id: user.newSate.id
                },
                transaction: t
            })

        })

        const token = jwt.sign({ id: user.id, email: user.email }, variable.secretKey, {})
        user.session_token = token
        res.json({
            success: true,
            message: 'User updated',
            data: user,
            from: ipAddress
        });

    } catch (error) {
        console.log(error)
        throw new DatabaseError()
    }
})

router.put("/", [
    passport.authenticate('jwt', { session: false }),
],
    async (req: Request, res: Response) => {
        try {

            const ipAddress = req.header('x-forwarded-for') ||
                req.socket.remoteAddress;
            const user = req.body

            let data = await sequelize.transaction(async (t) => {
                await User.update({
                    name: user.name,
                    phone: user.phone,
                    lastName: user.lastName
                }, {
                    where: {
                        id: user.newSate.id
                    },
                    transaction: t
                });

                const updatedUser = await User.findByPk(user.newSate.id);
                if (!updatedUser)
                    throw new DatabaseError()
                let token = null
                token = updatedUser && jwt.sign({ id: updatedUser.id, email: updatedUser.email }, variable.secretKey, {})
                const { id, email, name, phone, image, lastName, roles } = updatedUser
                return {
                    id,
                    email,
                    name,
                    phone,
                    image,
                    lastName,
                    session_token: token,
                    roles
                }
            })


            res.status(200).json({
                success: true,
                message: 'User created',
                data,
                from: ipAddress
            });
        } catch (error) {
            console.error(error)
            throw new DatabaseError()
        }

    });
router.put("/update-notification-token", [
    passport.authenticate('jwt', { session: false }),
], async (req: Request, res: Response) => {
    try {
        const ipAddress = req.header('x-forwarded-for') ||
            req.socket.remoteAddress;
        const user = req.body

        let data = await sequelize.transaction(async (t) => {
            await User.update({
                notificationToken: user.token,

            }, {
                where: {
                    id: user.id
                },
                transaction: t
            });

            const updatedUser = await User.findByPk(user.id);
            if (!updatedUser)
                throw new DatabaseError()
            
            return updatedUser
        })


        res.status(200).json({
            success: true,
            message: 'Token User updated',
            data,
            from: ipAddress
        });
    } catch (error) {
        console.error(error)
        throw new DatabaseError()
    }
})
export { router as userUpdateRouter };