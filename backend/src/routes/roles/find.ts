import express, { Request, Response } from 'express';
import {Role} from '../../models/role';
import { DatabaseError } from '../../common/errors/database-error';
const router = express.Router();

router.post("/",
    async (req: Request, res: Response) => {
        try {
            const roles = await Role.findAll()
            res.json({
                success: true,
                message: 'List Roles',
                data: roles
            });
        } catch (error) {
            throw new DatabaseError()
        }

    });

export { router as roleNewRouter };