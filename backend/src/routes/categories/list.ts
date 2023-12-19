import express, { Request, Response } from 'express';
import passport from 'passport';
import { DatabaseError } from '../../common/errors/database-error';
import { Category } from '../../models/category';
import auth from '../../middleware/auth-passport';
const router = express.Router();

router.get("/", [
    auth,
], async (req: Request, res: Response) => {
    try {
        const ipAddress = req.header('x-forwarded-for') ||
            req.socket.remoteAddress;
        const data = await Category.findAll();
        return res.status(200).json({
            success: true,
            message: 'Category created',
            data,
            from: ipAddress
        });
    } catch (error) {
        console.log(error)
        throw new DatabaseError()
    }
})

export { router as listCategoryRoute }
