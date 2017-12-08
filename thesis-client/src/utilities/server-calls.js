import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { STORAGE_KEY } from '../constants';
import { SERVER_URI } from '../../config';

const axiosRequest = (params) => (
  axios(params)
  .then((response) => {
    return response.data;
  })
  .catch((err) => {
    console.log(err);
    throw new Error({ err });
  })
);

export async function dbSecureGET(endpoint, filter) {
  const ACCESS_TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
  if (endpoint[0] !== '/') { endpoint = `/${endpoint}`; }

  const params = {
    url: `${SERVER_URI}${endpoint}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `BEARER ${ACCESS_TOKEN}`,
    },
  };

  if (filter) {
    params.headers.filter = filter;
  }

  return await axiosRequest(params);
}

export async function dbSecurePOST(endpoint, data) {
  const ACCESS_TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
  if (endpoint[0] !== '/') { endpoint = `/${endpoint}`; }

  const params = {
    url: `${SERVER_URI}${endpoint}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `BEARER ${ACCESS_TOKEN}`,
    },
    data: JSON.stringify(data),
  };

  return await axiosRequest(params);
}

export async function dbPOST(endpoint, data) {
  if (endpoint[0] !== '/') { endpoint = `/${endpoint}`; }

  const params = {
    url: `${SERVER_URI}${endpoint}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
  };

  return await axiosRequest(params);
}