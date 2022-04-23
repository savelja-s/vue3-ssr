import axios from "axios";
import { ElNotification } from "element-plus";

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
const catchNotificationError = (error: any) => {
  console.log(error);
  ElNotification({
    title: "Something wrong.",
    message: error,
    type: "error",
  });
};
const api = {
  getInstance() {
    return axiosInstance;
  },
  get(url: string, params = {}) {
    return axiosInstance
      .get(url, params)
      .then((response: any) => response.data)
      .catch((error: any) => catchNotificationError(error));
  },
  post(url: string, params = {}) {
    return axiosInstance
      .post(url, params)
      .then((response: any) => response.data)
      .catch((error: any) => catchNotificationError(error));
  },
};
export default api;
