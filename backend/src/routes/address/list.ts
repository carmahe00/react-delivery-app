import express, { Request, Response } from 'express';
import { DatabaseError } from '../../common/errors/database-error';
import { Address } from '../../models/address';
import auth from '../../middleware/auth-passport';
const router = express.Router();

router.get("/", [
    auth,
], async (req: Request, res: Response) => {
    try {
        const ipAddress = req.header('x-forwarded-for') ||
            req.socket.remoteAddress;

        if (!req.user)
            return res.status(404).json({
                success: false,
                message: 'User not found',
                data: {},
                from: ipAddress
            });
        const user = req.user as any
        const data = await Address.findAll({
            where:{
                userId: user.dataValues.id
            }
        });
        return res.status(200).json({
            success: true,
            message: 'Address list',
            data,
            from: ipAddress
        });
    } catch (error) {
        console.log(error)
        throw new DatabaseError()
    }
})

export { router as listAddressyRoute }
