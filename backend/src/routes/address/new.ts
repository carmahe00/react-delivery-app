import passport from 'passport'
import { DatabaseError } from '../../common/errors/database-error';
import sequelize from '../../db/connection';
import { Address } from '../../models/address';
import express, { Request, Response } from 'express';


const router = express.Router();

router.post("/", [
    passport.authenticate('jwt', { session: false })
],
    async (req: Request, res: Response) => {
        try {

            const ipAddress = req.header('x-forwarded-for') ||
                req.socket.remoteAddress;
            const address = req.body
            await sequelize.transaction(async (t) => {
                
                const addressCreated = await Address.create(address, {
                    transaction: t
                })
                address.id = addressCreated.id
            })

            res.status(201).json({
                success: true,
                message: 'Addresss created',
                data: address,
                from: ipAddress
            });
        } catch (error) {
            console.log(error)
            throw new DatabaseError()
        }

    });

export { router as addressNewRouter };