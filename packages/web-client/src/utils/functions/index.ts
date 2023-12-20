import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import {
  BACKEND_URL,
  e401,
  errorObject,
  HTTP_VERB_DEL,
  HTTP_VERB_GET,
  HTTP_VERB_POST,
  HTTP_VERB_PUT,
  snackErrorString,
} from 'utils/constant';
import { TGenericType } from 'utils/types';

export const discountedPriceCalculator = (price: number, percent: number) => {
  const price_without_discount = Number(price * 12);
  const percentage = 100 - percent;
  const finalValue = (price_without_discount / 100) * percentage;
  return Math.trunc(finalValue);
};

export const getLsItem = (name: string) => localStorage.getItem(name);
export const setLsItem = (name: string, value: string) => localStorage.setItem(name, value);
export const removeLsItem = (name: string) => localStorage.removeItem(name);
export const getTokenAttached = () => `Bearer ${getLsItem('token')}`;
export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});
export const lsToken = getLsItem('token');

axiosInstance.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    if (err.response.data.statusCode == e401) {
      console.log('err.response.data', err?.response?.data);
      removeLsItem('token');
      enqueueSnackbar(`${errorObject[401]}`, { variant: snackErrorString });
      return Promise.reject(err);
    } else {
      enqueueSnackbar(`${err.response.data}`, { variant: snackErrorString });
      return;
    }
  },
);

const axiosWrapper = async (url: string, method: string, data?: TGenericType) => {
  try {
    const result = await axiosInstance(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: getTokenAttached(),
      },
      data,
    });
    return result.data;
  } catch (error) {
    console.error('Error:', error);
  }
};
export const getRequest = (url: string) => axiosWrapper(url, HTTP_VERB_GET);
export const postRequest = (url: string, data: TGenericType) => axiosWrapper(url, HTTP_VERB_POST, data);
export const deleteRequest = (url: string) => axiosWrapper(url, HTTP_VERB_DEL);
