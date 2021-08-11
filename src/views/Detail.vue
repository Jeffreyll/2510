<template>
  <div class="detail">
    <!-- 顶部导航 -->
    <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="more" size="20" />
      </template>
    </van-nav-bar>
    <!-- 页面中部 -->
    <div class="detail-main">
      <img class="goods-img" :src="productData.coverImg" alt="" />
    </div>
    <!-- 页面底部 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" dot />
      <van-goods-action-icon icon="shop-o" text="店铺" badge="5" />
      <van-goods-action-icon icon="cart-o" text="购物车" badge="12" />
      <van-goods-action-button type="warning" text="加入购物车"  @click="addCart()"/>
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import { Toast } from "vant";
import { reqProductsInfo,repAddCart } from "../../api/products";
export default {
  data() {
    return {
      productID: "",
      productData: {},
    };
  },
  methods: {
    // 根据id获取商品信息
    async getProduvtInfo() {
      // 获取商品id
      this.productID = this.$route.query.id;
      // 请求
      const { data } = await reqProductsInfo(this.productID);
      this.productData = data;
      console.log(this.productData);
    },
    // 点击返回
    onClickLeft() {
      this.$router.go(-1); // 返回上一页
    },
    onClickRight() {
      Toast("按钮");
    },
    // 加入购物车
    async addCart(){
      const res = await repAddCart(this.productID);
      console.log(res);
      if (res.data.code==="success") {
        Toast.success('加入购物车成功！');
      }
    }
  },
  created() {
    this.getProduvtInfo();
  },
};
</script>

<style>
.detail-main .goods-img {
  display: block;
  width: 100%;
}
</style>
