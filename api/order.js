import { post,get } from "../utils/request";
//提交订单
export const addorder = (data) => post("/api/v1/orders", data);

//获取订单列表
export const getOrderlist = (params) => get("/api/v1/orders", params);

//根据 id 获取订单详情
export const getOrderItem = (id) => get("/api/v1/orders/"+id);