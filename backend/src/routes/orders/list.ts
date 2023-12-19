import express, { Request, Response } from 'express';
import { DatabaseError } from '../../common/errors/database-error';
import { Address } from '../../models/address';
import auth from '../../middleware/auth-passport';
import { Order } from '../../models/order';
import { User } from '../../models/user';
import { OrderProduct } from '../../models/orderProduct';
import { Product } from '../../models/product';
const router = express.Router();

router.get("/:status", [
  auth,
], async (req: Request, res: Response) => {
  try {
    const ipAddress = req.header('x-forwarded-for') ||
      req.socket.remoteAddress;
    const status = req.params.status

    if (!req.user)
      return res.status(404).json({
        success: false,
        message: 'User not found',
        data: {},
        from: ipAddress
      });

    const allowedStatusValues = ['PAID', 'DISPATCH', 'ON-THE-WAY', 'DELIVERED'];
    if (status && !allowedStatusValues.includes(status as string)) {
      return res.status(404).json({
        success: false,
        message: 'Invalid status value',
        data: {},
        from: ipAddress
      });
    }
    const data = await Order.findAll({
      where: {
        status
      },
      include: [
        {
          model: Address,
        },
        {
          model: User, // Include the User model for idClient
          as: 'client',
        },
        {
          model: User, // Include the User model for idClient
          as: 'delivery',
        },
        {
          model: Product, // Include the associated Product model through OrderProduct
          through: {
            as: "order"
          },
        },
      ],
    });
    return res.status(200).json({
      success: true,
      message: 'Order list',
      data,
      from: ipAddress
    });
  } catch (error) {
    console.log(error)
    throw new DatabaseError()
  }
})

router.get("/:id_delivery/:status", [
  auth,
], async (req: Request, res: Response) => {
  try {
    const ipAddress = req.header('x-forwarded-for') ||
      req.socket.remoteAddress;
    const status = req.params.status
    const idDelivery = req.params.id_delivery
    

    if (!req.user)
      return res.status(404).json({
        success: false,
        message: 'User not found',
        data: {},
        from: ipAddress
      });

    const allowedStatusValues = ['PAID', 'DISPATCH', 'ON-THE-WAY', 'DELIVERED'];
    if (status && !allowedStatusValues.includes(status as string)) {
      return res.status(404).json({
        success: false,
        message: 'Invalid status value',
        data: {},
        from: ipAddress
      });
    }
    const data = await Order.findAll({
      where: {
        status,
        idDelivery
      },
      include: [
        {
          model: Address,
        },
        {
          model: User, // Include the User model for idClient
          as: 'client',
        },
        {
          model: User, // Include the User model for idClient
          as: 'delivery',
        },
        {
          model: Product, // Include the associated Product model through OrderProduct
          through: {
            as: "order"
          },
        },
      ],
    });
    return res.status(200).json({
      success: true,
      message: 'Order list',
      data,
      from: ipAddress
    });
  } catch (error) {
    console.log(error)
    throw new DatabaseError()
  }
})

router.get("/find-by-client/:id_client/:status", [
  auth,
], async (req: Request, res: Response) => {
  try {
    const ipAddress = req.header('x-forwarded-for') ||
      req.socket.remoteAddress;
    const status = req.params.status
    const idClient = req.params.id_client
    

    if (!req.user)
      return res.status(404).json({
        success: false,
        message: 'Client not found',
        data: {},
        from: ipAddress
      });

    const allowedStatusValues = ['PAID', 'DISPATCH', 'ON-THE-WAY', 'DELIVERED'];
    if (status && !allowedStatusValues.includes(status as string)) {
      return res.status(404).json({
        success: false,
        message: 'Invalid status value',
        data: {},
        from: ipAddress
      });
    }
    const data = await Order.findAll({
      where: {
        status,
        idClient
      },
      include: [
        {
          model: Address,
        },
        {
          model: User, // Include the User model for idClient
          as: 'client',
        },
        {
          model: User, // Include the User model for idClient
          as: 'delivery',
        },
        {
          model: Product, // Include the associated Product model through OrderProduct
          through: {
            as: "order"
          },
        },
      ],
    });
    return res.status(200).json({
      success: true,
      message: 'Order list',
      data,
      from: ipAddress
    });
  } catch (error) {
    console.log(error)
    throw new DatabaseError()
  }
})

export { router as orderListRouter }
