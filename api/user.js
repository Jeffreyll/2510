import { post } from "../utils/request";
import { get } from "../utils/request";
//注册接口
export const regApi = (user) => post("/api/v1/auth/reg", user);
//登录接口
export const logApi = (user) => post("/api/v1/auth/login", user);
//获取用户信息
export const loadUser = (params) => get("/api/v1/users/info", params);
//上传头像
export const upload = (file) => post("/api/v1/common/file_upload", file);
