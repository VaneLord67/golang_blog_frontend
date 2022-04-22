/**
 * 全局Axios拦截器配置
 */

import axios from "axios";
import { getToken } from "@/utils/storage";
import router from '@/router/index.js';


export const baseURL = "https://vanelord.xyz/api";
// export const baseURL = "http://localhost:8085";

export const Axios = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});

/**
 * 请求拦截
 */

Axios.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = getToken();
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);
/**
 * 响应拦截
 */
Axios.interceptors.response.use(
  (res) => {
    //  console.log(res.data.Code)
    if (res.data.Code == 105) {
      alert("请重新登录")
      router.replace({
        path: '/login',
      })
    } else {
      return res.data;
    }
  },
  (err) => {
    Promise.reject(err);
  }
);

