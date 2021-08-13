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
            style="color: #1677FF; font-size: 0.597rem"
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
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      pricePro: String,
    };
  },
  computed: {},
  watch: {},

  methods: {
    onClickLeft() {
      this.$router.go(-1); // 返回上一页
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
  background: #1677FF;
  font-size: 0.421rem;
  font-weight: normal;
}
</style>