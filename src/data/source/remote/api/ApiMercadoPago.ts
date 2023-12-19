import axios from 'axios';
import {AUTHORIZATION_MERCADO_PAGO} from '@env'
const baseURL = `https://api.mercadopago.com/v1`;

const ApiMercadoPago = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

ApiMercadoPago.interceptors.request.use(async function (config) {
        config.headers['Authorization'] = 'Bearer ' + AUTHORIZATION_MERCADO_PAGO
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
})





export { ApiMercadoPago }