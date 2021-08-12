import { get, post } from "../utils/request";
// 上拉加载更多实际上就是分页
export const reqProducts = (params) => get("/api/v1/products", params);

// 商品分类接口
export const reqProductsCategory = (params) =>
  get("/api/v1/product_categories", params);

// 根据 id 获取商品详情接口
export const reqProductsInfo = (params) => get("/api/v1/products/" + params);

// 加入购物车接口
export const repAddCart = (params) => post("/api/v1/shop_carts", params);
