import { post } from "../utils/request";
export const regApi = (user) => post("/api/v1/auth/reg", user);
export const logApi = (user) => post("/api/v1/auth/login", user);
