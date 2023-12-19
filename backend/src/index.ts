import 'dotenv/config';
import morgan from 'morgan';
import 'express-async-errors';
import express from "express";
import passport from 'passport';
import { json, urlencoded } from "body-parser";

import sequelize from "./db/connection";
import { testRouter } from "./routes/test";
import { localStrategy } from "./config/passport";
import { userNewRouter } from "./routes/users/new";
import { NotFoundError } from "./common/errors/not-found-error";
import { errorsHandler } from "./common/middlewares/errorsHandler";
import { roleNewRouter } from './routes/roles/find';
import { userUpdateRouter } from './routes/users/update';
import { categoryNewRouter } from './routes/categories/new';
import { listCategoryRoute } from './routes/categories/list';
import { deleteCategoryRoute } from './routes/categories/delete';
import { categoryUpdateRouter } from './routes/categories/update';
import { productNewRouter } from './routes/products/new';
import { productCategoryByIdRouter } from './routes/products/productCategoryById';
import { productDeleteRouter } from './routes/products/delete';
import { productUpdateRouter } from './routes/products/update';
import { addressNewRouter } from './routes/address/new';
import { listAddressyRoute } from './routes/address/list';
import { orderNewRouter } from './routes/orders/new';
import { orderListRouter } from './routes/orders/list';
import { listDeliveryRoute } from './routes/users/list';
import { orderUpdateRouter } from './routes/orders/update';
import { Server } from "socket.io";
import { createServer } from 'http';
import OrderSocket from './sockets/OrderSockets';
import { paymentMercadoPago } from './routes/payments/new';




const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'))
passport.use(localStrategy)
app.use(passport.initialize())


const PORT = process.env.PORT || 3000;
app.use('/api', testRouter)
app.use('/api/categories', categoryNewRouter)
app.use('/api/categories', listCategoryRoute)
app.use('/api/categories', deleteCategoryRoute)
app.use('/api/categories/update', categoryUpdateRouter)
app.use('/api/products', productNewRouter)
app.use('/api/products', productCategoryByIdRouter)
app.use('/api/products', productDeleteRouter)
app.use('/api/products', productUpdateRouter)

app.use('/api/payments', paymentMercadoPago)

app.use('/api/address', addressNewRouter)
app.use('/api/address', listAddressyRoute)
app.use('/api/orders', orderNewRouter)
app.use('/api/orders', orderListRouter)
app.use('/api/orders', orderUpdateRouter)
app.use('/api/user', userNewRouter)
app.use('/api/user', listDeliveryRoute)
app.use('/api/user/update', userUpdateRouter)
app.use('/api/role', roleNewRouter)

app.all('*', (req, res) => {
  throw new NotFoundError();
});

app.use(errorsHandler);
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

httpServer.listen(PORT, async () => {
  try {
    new OrderSocket(io)
    

    sequelize.sync({ force: true }).then(console.log).catch(console.error);
    console.log('Connection has been established successfully.');
    console.log(`Server is running on PORT ${PORT}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

});