import { TOKEN } from "./tools";
// 判断是否登录
export const islogined = () => {
  if (localStorage.getItem("token")) {
    return true;
  }
};
// 生成token
export const setToken = (token) => {
  localStorage.setItem(TOKEN, token);
};
// 获取token
export const getToken = () => {
  return localStorage.getItem("token") || "";
};
// 移除token
export const removeToken = () => {
  return localStorage.removeItem("token");
};
