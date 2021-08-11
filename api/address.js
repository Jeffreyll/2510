import { get, post, put, del } from "../utils/request";
//加载地址列表
export const loadAddress = (params) => get("/api/v1/addresses", params);
//新增地址
export const addAddress = (params) => post("/api/v1/addresses", params);
//修改地址
export const editAddress = (id, params) =>
  put("/api/v1/addresses/" + id, params);
//获取单条收货地址
export const getAddressById = (id) => get("/api/v1/addresses/" + id);
//删除地址
export const delAddress = (id) => del("/api/v1/addresses/" + id);
