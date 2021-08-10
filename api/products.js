import { get } from "../utils/request";
// 上拉加载更多实际上就是分页
export const reqProducts = (params) => get("/api/v1/products", params);

// 商品分类接口
export const reqProductsCategory = (params) => get("/api/v1/product_categories", params);