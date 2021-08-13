<template>
  <div class="zhifubao">
    <!-- 支付宝付款 -->
    <van-nav-bar @click-left="onClickLeft">
      <template #left>
        <van-icon name="arrow-left" size="1.5em" />
      </template>
      <template #title>
        <div class="title-zhifu">
          <i
            class="iconfont my-icon-zhifubao1"
            style="color: #1677ff; font-size: 0.597rem"
          ></i>
          <span style="font-weight: 900">支付宝付款</span>
        </div>
      </template>
    </van-nav-bar>
    <div class="price">
      ￥ <b>{{ pricePro }}</b>
    </div>
    <p>有品支付</p>
    <van-button type="primary" @click="payOrder" block>继续付款 </van-button>
    <!-- 展示弹出层 -->
    <!-- <van-popup v-model="show">内容</van-popup> -->
    <!-- <van-popup
      v-model="show"
      closeable
      round
      overlay-class="zhezhaoceng"
      position="bottom"
      :style="{ height: '76%' }"
    >
     <div class="content">
         123
     </div>
    </van-popup> -->
    <div class="order-chakan">我已付款，返回查看订单</div>
    <!-- 密码输入框 -->
    <!-- <van-password-input
      
      :value="value"
      :focused="showKeyboard"
      @focus="showKeyboard = true"
    /> -->
    <!-- 数字键盘 -->
    <!-- <van-number-keyboard
      v-model="value"
      :show="showKeyboard"
      @blur="showKeyboard = false"
    /> -->
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  components: {},
  data() {
    return {
      showmima: false,
      show: false, // 弹出是否显示
      value: "12",
      showKeyboard: true,
      pricePro: String,
    };
  },
  computed: {},
  watch: {},

  methods: {
    onClickLeft() {
      this.$router.go(-1); // 返回上一页
    },
    payOrder() {
      //   this.show = true; // 弹出是否显示
      this.showmima = true;
      if (this.showmima == 1) {
        Toast.success("付款成功！");
      }
      this.$router.push({
          path:"/mine",
          query:{num:1}
      });
    },
  },
  created() {
    this.pricePro = this.$route.query.payMoney;
  },
  mounted() {},
};
</script>
<style scoped>
.title-zhifu {
  display: block;
  display: flex;
}
.price {
  display: flex;
  justify-content: center;
  align-items: baseline;
  font-size: 0.562rem;
  margin-top: 0.468rem;
}
.price b {
  font-size: 1.054rem;
  font-weight: normal;
}
.zhifubao p {
  font-size: 0.375rem;
  text-align: center;
  margin-bottom: 0.468rem;
}

.van-button {
  width: 7.031rem;
  position: relative;
  left: 0.234rem;
  right: 0.234rem;
  /* bottom: -7.234rem; */
  border: none;
  border-radius: 0.134rem;
  background: none;
  background: #1677ff;
  font-size: 0.421rem;
  font-weight: normal;
}

.order-chakan {
  font-size: 0.375rem;
  text-align: center;
  margin-bottom: 0.468rem;
  color: #1677ff;
  position: absolute;
  bottom: 0.4rem;
  left: 22%;
}

.zhezhaoceng .content {
  background: coral;
  margin-top: 50px;
}
</style>