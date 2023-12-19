import express, { Request, Response } from 'express';
import {Op} from 'sequelize'
import { DatabaseError } from '../../common/errors/database-error';
import auth from '../../middleware/auth-passport';
import { User } from '../../models/user';
import { Role } from '../../models/role';
const router = express.Router();

router.get("/findDelivery", [
    auth,
], async (req: Request, res: Response) => {
    try {

        const data = await User.findAll({
            include: [
                {
                    model: Role,
                    where: { 
                        name: 'DELIVERY',
                    }, // Filter by role name
                    attributes: [], // Exclude role attributes from the result
                },
            ],
            where:{
                notificationToken: {
                    [Op.not]: ""
                }
            }
        });
        return res.status(200).send(data);
    } catch (error) {
        console.log(error)
        throw new DatabaseError()
    }
})

export { router as listDeliveryRoute }
