import axios from "axios";
import { getToken } from "./auth";
import { BASE_URL } from "./tools";
const instance = axios.create({
  baseURL: BASE_URL, //域名
  timeout: 5000, // 超时时间
});

// Add a request interceptor
instance.interceptors.request.use(
  function(config) {
    if (getToken()) {
      config.headers.authorization = "Bearer " + getToken();
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);
// 封装 get post 请求
export const get = (url, params) => instance.get(url, { params });
export const post = (url, data) => instance.post(url, data);
export const put = (url, data) => instance.put(url, data);
// 封装删除
export const del = (url, params) => instance.delete(url, { params });
export default instance;
