import axios from "axios";

export const DEVICE_URL = "http://localhost:3000/devices/";

export const getList = () => {
  return axios.get(DEVICE_URL, {});
};

export const addDevice = (data) => {
  return axios.post(DEVICE_URL, data);
};

export const getDevice = (id) => {
  return axios.get(DEVICE_URL + id);
};

export const updateDevice = (id, data) => {
  return axios.put(DEVICE_URL + id, data);
};

export const deleteDevice = (id) => {
  return axios.delete(DEVICE_URL + id);
};
