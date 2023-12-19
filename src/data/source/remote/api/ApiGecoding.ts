import axios from 'axios';
import {GOOGLE_MAPS_KEY} from '@env'
// Your Google Geocoding API Key
const API_KEY = GOOGLE_MAPS_KEY;

// Create an Axios instance with default settings
const ApiGecoding = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/geocode/json',
  params: {
    key: API_KEY,
  },
});



export { ApiGecoding }