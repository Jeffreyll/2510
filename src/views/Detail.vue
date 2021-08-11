<template>
  <div class="detail">
    <!-- 顶部导航 -->
    <van-nav-bar
      title="商品详情"
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
      <div class="goods-info">
        <div class="goods-price">
          <div class="goods-price-l">
            ￥ <span>{{ productData.price }}</span
            >起
          </div>
          <div class="goods-price-r">
            <van-icon name="star-o" size="26" />
            <span>收藏</span>
          </div>
        </div>
        <h3 class="goods-name">{{ productData.name }}</h3>
      </div>
    </div>
    <!-- 弹出面板 -->
    <van-action-sheet class="van-action-sheet-panel" v-model="show">
      <div class="content">
        <div class="content-info">
          <img class="content-info-img" :src="productData.coverImg" alt="" />
          <div class="content-info-price">
            <!-- 价格信息 -->
            <div class="content-info-price-r">
              <div class="goods-price">
                ￥ <span>{{ productData.price }}</span
                >起
              </div>
              <!-- 商品库存 -->
              <div class="goods-quantity">库存{{ productData.quantity }}件</div>
            </div>
            <!-- 关闭图标 -->
            <van-icon name="close" color="#999999" @click="closePanel" />
          </div>
        </div>
        <!-- 购买数量 -->
        <div class="pro-num">
          <p>数量</p>
          <div class="num">
            <van-stepper
              v-model="value"
              theme="round"
              button-size="22"
              disable-input
              :max="productData.quantity"
              @plus="addNum"
              @minus="loseNum"
            />
          </div>
        </div>
      </div>
      <div class="panel-btn">
        <van-button
          @click="addCart"
          color="linear-gradient(to right, #ff6034, #ee0a24)"
          block
        >
          确定
        </van-button>
      </div>
    </van-action-sheet>
    <!-- 页面底部 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="shop-o" text="店铺" badge="" />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :badge="proQuantity"
        @click="goCart()"
      />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="alertPanel()"
      />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import { Toast } from "vant";
import { reqProductsInfo } from "../../api/products";
import { addToCart, loadCart } from "../../api/cart";
// import { get } from '../../utils/request';
export default {
  data() {
    return {
      value: 1,
      show: false,
      productID: "",
      productData: {},
      proQuantity: 0,
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
    // 点击加入购物车弹出面板
    alertPanel() {
      this.show = true;
    },
    // 点击加入购物车弹出面板关闭
    closePanel() {
      this.show = false;
    },
    // 商品数量加1
    addNum() {
      this.value += 1;
      console.log(this.value);
    },
    // 商品数量减1
    loseNum() {
      this.value -= 1;
      console.log(this.value);
    },
    // 加入购物车
    async addCart() {
      const res = await addToCart(this.productID, this.value);
      console.log(res);
      if (res.data.code === "success") {
        Toast.success("加入购物车成功！");
        this.show = false;
      }
      this.getCartList(); // 加载购物车数据
    },
    //
    async getCartList() {
      const res = await loadCart();
      console.log(res.data);
      let QuantityNum = 0;
      if (res.data.length > 0) {
        res.data.forEach((item) => {
          QuantityNum += item.quantity;
        });
      }
      // console.log(QuantityNum);
      this.proQuantity = QuantityNum;
    },
    // 跳转购物车页面
    goCart() {
      this.$router.push("/cart");
    },
  },
  created() {
    this.getProduvtInfo();
    this.getCartList(); // 加载购物车数据
  },
};
</script>

<style scoped>
.van-nav-bar {
  background: rgba(255, 255, 255, );
}
.van-hairline--bottom {
  border: none;
}
.detail-main{
  padding-top: 1.078rem;
}
.detail-main .goods-img {
  display: block;
  width: 100%;
  height: 7.5rem;
}
.goods-info {
}
.goods-info .goods-price {
  height: 1.244rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0.234rem;
}
.goods-info .goods-price .goods-price-l {
  color: #99621a;
}
.goods-info .goods-price .goods-price-l span {
  font-size: 22px;
  font-weight: bold;
}
.goods-info .goods-price .goods-price-r {
  width: 26px;
  display: flex;
  flex-direction: column;
}
.goods-info .goods-price .goods-price-r span {
  display: block;
  font-size: 12px;
  line-height: 1;
}

.goods-info .goods-name {
  height: 0.796rem;
  margin: 0 0.234rem;
  font-size: 0.328rem;
  font-weight: 900;
  line-height: 0.796rem;
}

.van-action-sheet-panel {
  height: 10.117rem;
}

.van-action-sheet__content {
  display: flex;
  flex-direction: column;
}
.content {
  padding: 0.234rem 0.234rem 0;
  flex: 1;
}
.content-info {
  height: 2.039rem;
  /* background: chartreuse; */
  display: flex;
}
.content-info .content-info-img {
  display: block;
  width: 2.039rem;
  height: 2.039rem;
}
.content-info .content-info-price {
  flex: 1;
  /* background: coral; */
  display: flex;
}
.content-info .content-info-price .content-info-price-r {
  /* background: greenyellow; */
  flex: 1;
  margin: 0.151rem 0.234rem;
}
.content-info .content-info-price .content-info-price-r .goods-price {
  color: #99621a;
}
.content-info .content-info-price .content-info-price-r .goods-price span {
  font-size: 22px;
  font-weight: bold;
}
.content-info .content-info-price .van-icon {
  font-size: 0.48rem;
  display: block;
}
.content-info .content-info-price .content-info-price-r .goods-quantity {
  color: #888888;
  margin-top: 0.117rem;
}
/* 商品数量 */
.pro-num {
  height: 0.539rem;
  margin-top: 0.117rem;
  display: flex;
  justify-content: space-between;
}
.pro-num p {
  line-height: 0.539rem;
  font-size: 0.281rem;
  color: #333;
  font-weight: bold;
}
/* 弹出面板按钮 */
.panel-btn {
  padding: 0 0.234rem 0 0.234rem;
}
.panel-btn .van-button {
  border-radius: 0.515rem;
  font-size: 0.328rem;
  font-weight: 900;
}
</style>
