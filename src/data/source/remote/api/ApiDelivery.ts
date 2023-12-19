import axios from 'axios';
import { localStotage } from '../../local/LocalStorage';
import { User } from '../../../../domain/entity/user';

const baseURL = `http://192.168.20.27:3000/api`;

const ApiDelivery = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

ApiDelivery.interceptors.request.use(async function (config) {
    const data = await localStotage().getItem('user')
    if (data) {
        const user: User = JSON.parse(data)
        config.headers['Authorization'] = 'Bearer ' + user.session_token
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
})

ApiDelivery.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    response.status
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

const ApiDeliveryForImage = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
    },
    // transformRequest: [function (data, headers){
    //     if(headers['Content-Type'] && headers['Content-Type'].toString().startsWith('multipart/form-data')){
    //         const form = new FormData();
    //         for (const key in data){
    //             const value = data[key]
    //             if(Array.isArray(value)){
    //                 const arrayKey = ``
    //             }
    //         }
    //     }
    // }]
});

ApiDeliveryForImage.interceptors.request.use(async function (config) {
    const data = await localStotage().getItem('user')
    if (data) {
        const user: User = JSON.parse(data)
        config.headers['Authorization'] = 'Bearer ' + user.session_token
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
})

export { ApiDeliveryForImage, ApiDelivery }