import { get, post } from "../utils/request";
export const loadAddress = (params) => get("/api/v1/addresses", params);
export const addAddress = (params) => post("/api/v1/addresses", params);
