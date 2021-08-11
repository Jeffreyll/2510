import { post } from "../utils/request";
//提交订单
export const addorder = (data) => post("/api/v1/orders", data);
