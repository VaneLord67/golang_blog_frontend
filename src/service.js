/**
 * 全局Axios拦截器配置
 */

 import axios from "axios";
 import { getToken } from "@/utils/storage";
 
 const Axios = axios.create({
   baseURL: "http://175.27.244.157:8085",
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
     // switch (res.data.code) {
     //   case -1:
     //     Message.error("身份过期，请重新登录");
     //     break;
     //   default:
     // }
     return res.data;
   },
   (err) => {
     Promise.reject(err);
   }
 );
 
 export default Axios;
 