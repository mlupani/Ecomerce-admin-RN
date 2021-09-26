import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'https://ecommerce-black-sigma.vercel.app/api';
//const baseURL = 'http://192.168.0.8:8080/api';
const productosAPI = axios.create({ baseURL });

productosAPI.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers['x-token'] = token;
  }

  return config;
});

export default productosAPI;
