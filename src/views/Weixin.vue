<template>
  <div class="weixin">
    <van-nav-bar @click-left="onClickLeft">
      <template #left>
        <van-icon name="arrow-left" size="1.5em" color="rgb(32,204,98)"/>
      </template>
      <template #title>
        <div class="title-zhifu">
          <i
            class="iconfont my-icon-weixin1"
            style="color: rgb(32,204,98); font-size: 0.597rem"
          > </i>
          <span style="font-weight: 900"> 微信支付</span>
        </div>
      </template>
    </van-nav-bar>
    <div class="price">
      ￥ <b>{{ pricePro }}</b>
    </div>
    <p>有品支付</p>
    <van-button type="primary" @click="payOrder" block>继续付款 </van-button>
    <div class="order-chakan">我已付款，返回查看订单</div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  components: {},
  data() {
    return {
        showmima:false,
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
      if (this.showmima==1) {
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
.weixin p {
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
  background: rgb(32,204,98);
  font-size: 0.421rem;
  font-weight: normal;
}

.order-chakan{
    font-size: 0.375rem;
  text-align: center;
  margin-bottom: 0.468rem;
  color: rgb(32,204,98);
  position:absolute;
  bottom: 0.4rem;
  left: 22%;
}
</style>