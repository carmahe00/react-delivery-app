import jwt from 'jsonwebtoken';
import { User } from '../../models/user';
import express, { Request, Response } from 'express';
import { DatabaseError } from '../../common/errors/database-error';
import { validationEmail } from '../../common/middlewares/emailExist';
import { validationRequest } from '../../common/middlewares/validation-request';
import storage from '../../utils/cloud-storage'
import { InvalidCredentialsError } from '../../common/errors/invalid-credentials-error';
import { variable } from '../../config/keys';
import upload from '../../config/multer';
import { UserRole } from '../../models/UserRole';
import { Role } from '../../models/role';
import sequelize from '../../db/connection';


const router = express.Router();

router.post("/", [
    validationEmail
],
    validationRequest,
    async (req: Request, res: Response) => {
        try {
            const ipAddress = req.header('x-forwarded-for') ||
                req.socket.remoteAddress;
            const user = req.body
            let userCreated = await sequelize.transaction(async (t) => {
                const retult = await User.create(user, {
                    transaction: t
                });
                retult && await UserRole.create({
                    userId: retult.id,
                    roleId: 1
                }, {
                    transaction: t
                })
                return retult
            })
            if (userCreated == null)
                throw new InvalidCredentialsError()

            res.status(201).json({
                success: true,
                message: 'User created',
                data: userCreated,
                from: ipAddress
            });
        } catch (error) {
            throw new DatabaseError()
        }

    });

router.post("/register-with-image", [
    upload.array('image', 1)
],
    validationRequest,
    async (req: Request, res: Response) => {
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
                        url = await storage(files[0], path)
                    if (url !== '')
                        user.image = url
                }
                const userCreated = await User.create(user)
                userCreated && await UserRole.create({
                    userId: userCreated.id,
                    roleId: 1
                }, {
                    transaction: t
                })
                user.id = userCreated.id
            })
            const token = jwt.sign({ id: user.id, email: user.email }, variable.secretKey, {})
            user.session_token = token
            res.status(201).json({
                success: true,
                message: 'User created',
                data: user,
                from: ipAddress
            });
        } catch (error) {
            console.log(error)
            throw new DatabaseError()
        }

    });

router.post("/login",
    async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: {
                    email: email
                },
                include: { model: Role, as: 'roles', through: { attributes: [] } }
            })
            if (!user || !user.comparePassword(password))
                throw new InvalidCredentialsError()
            const { id, email: emailDatabase, name, phone, image, lastName, roles, notificationToken } = user
            const token = jwt.sign({ id, email: emailDatabase }, variable.secretKey, {})
            const data = {
                id,
                email,
                name,
                phone,
                image,
                lastName,
                session_token: token,
                notification_token: notificationToken,
                roles
            }
            return res.json({
                success: true,
                message: 'Log-in success',
                data
            })
        } catch (error) {
            console.log(error)
            throw new InvalidCredentialsError()
        }

    })
export { router as userNewRouter };