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
        <van-icon name="share-o" size="1.6em" />
      </template>
    </van-nav-bar>
    <!-- 立即分享给好友 -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
    />
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
            <van-icon
              v-if="collectIcon"
              @click="collectIconShow"
              name="star-o"
              size="26"
            />
            <van-icon
              v-if="!collectIcon"
              @click="collectIconNo"
              name="star"
              size="26"
              color="red"
            />
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
          v-if="panelBtnShow"
          @click="addCart"
          color="linear-gradient(to right, #ff6034, #ee0a24)"
          block
        >
          确定
        </van-button>
        <van-button
          v-if="!panelBtnShow"
          color="linear-gradient(to right, #ff6034, #ee0a24)"
          block
          @click="buyOrder"
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
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="buyNow()"
      />
    </van-goods-action>
  </div>
</template>

<script>
import { Toast } from "vant";
import { reqProductsInfo } from "../../api/products";
import { addToCart, loadCart } from "../../api/cart";
import { addorder } from "../../api/order";
import { islogined } from "../../utils/auth";
// import { get } from '../../utils/request';
export default {
  data() {
    return {
      collectIcon: true, // 收藏图标
      value: 1, // 要购买几件商品
      panelBtnShow: true,
      show: false,
      productID: "",
      productData: {}, // 商品数据
      proQuantity: 0, // 购物车列表加了多少件商品
      showShare: false, // 分向面板
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "朋友圈", icon: "wechat-moments" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" },
          { name: "小程序码", icon: "weapp-qrcode" },
        ],
      ],
    };
  },
  methods: {
    // 根据id获取商品信息
    async getProduvtInfo() {
      // 获取商品id
      this.productID = this.$route.query.id;
      // 请求
      const { data } = await reqProductsInfo(this.productID);
      this.productData = data; // 商品数据
      // console.log("商品数据",this.productData);
    },
    // 点击返回
    onClickLeft() {
      this.$router.go(-1); // 返回上一页
    },
    onClickRight() {
      // Toast("按钮");
      this.showShare = true;
    },
    // 未收藏图标显示
    collectIconShow() {
      this.collectIcon = false;
      Toast.success("收藏成功！");
    },
    // 点击不收藏
    collectIconNo() {
      this.collectIcon = true;
      Toast.fail("取消收藏！");
    },
    // 点击加入购物车弹出面板
    alertPanel() {
      console.log(islogined);

      this.show = true;
    },
    // 点击加入购物车弹出面板关闭
    closePanel() {
      this.show = false;
      this.panelBtnShow = true; // 弹出面板点击确定按钮加入购车
    },
    // 商品数量加1
    addNum() {
      this.value += 1;
    },
    // 商品数量减1
    loseNum() {
      this.value -= 1;
      // console.log(this.value);
    },
    // 加入购物车
    async addCart() {
      let isLogined = localStorage.getItem("token");
      console.log(isLogined);
      if (isLogined) {
        const res = await addToCart(this.productID, this.value);
        // console.log(res);
        if (res.data.code === "success") {
          Toast.success("加入购物车成功！");
          this.show = false;
        }
        this.getCartList(); // 加载购物车数据
      } else {
        Toast.fail("请先登录！");
        setTimeout(() => {
          this.$router.push("/login");
        }, 1000);
      }
    },
    // 立即购买
    buyNow() {
      this.show = true;
      this.panelBtnShow = false; // 弹出面板点击确定按钮加入购车
    },
    // 点击确定=》提交订单
    buyOrder() {
      console.log(this.value);
      console.log("商品id", this.productID);
      let isLogined = localStorage.getItem("token");
      console.log(isLogined);
      if (isLogined) {
        this.addOrder(); // 提交订单
        this.$router.push({
          path: "/order",
          query: { id: this.productID, num: this.value },
        });
      } else {
        Toast.success("请登录账户！");
        this.$router.push("/login");
      }
    },
    // 提交订单
    async addOrder() {
      const res = await addorder({
        receiver: "xxx",
        regions: "xxx省xxx市xxx县",
        address: "xxx号",
        orderDetails: [
          {
            quantity: this.value,
            product: this.productID,
            price: this.productData.price,
          },
        ],
      });
      console.log("提交订单信息", res);
    },
    // 获取购物车列表数据
    async getCartList() {
      const res = await loadCart();
      // console.log("购物车列表数据",res.data);
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
  background: rgba(255, 255, 255);
}
.van-hairline--bottom {
  border: none;
}
.detail-main {
  padding-top: 1.078rem;
}
.detail-main .goods-img {
  display: block;
  width: 100%;
  height: 7.5rem;
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
