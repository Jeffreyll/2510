<template>
  <div class="cash">
    <!-- nav -->
    <van-nav-bar title="收银台" @click-left="onClickLeft">
      <template #left>
        <van-icon name="arrow-left" size="1.2em" color="#000" />
      </template>
    </van-nav-bar>
    <!-- 价格时间 -->
    <div class="price-time">
      <div class="price-time-up">
        <i>￥</i> <b> {{ pricePro }}</b
        ><em></em>
      </div>
      <div class="price-time-down">
        <div class="time-down">
          <p>支付剩余时间：</p>
          <span>
            <van-count-down :time="time" size="1.2em" />
          </span>
        </div>
      </div>
    </div>
    <!-- 支付选择 -->
    <van-radio-group v-model="radio">
      <van-cell-group>
        <van-cell clickable @click="radio = '1'">
          <template #right-icon>
            <van-radio name="1" />
          </template>
          <van-radio name="1">
            支付宝
            <template #icon>
              <i
                class="iconfont my-icon-zhifubao"
                style="color: #1296db; font-size: 0.597rem"
              ></i>
            </template>
          </van-radio>
        </van-cell>
        <van-cell clickable @click="radio = '2'">
          <template #right-icon>
            <van-radio name="2" color="#1afa29"/>
          </template>
          <van-radio name="2">
            微信支付
            <template #icon>
              <i
                class="iconfont my-icon-weixin"
                style="color: #1afa29; font-size: 0.597rem"
              ></i>
            </template>
          </van-radio>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <!-- 确认支付 -->
    <van-button type="primary" @click="payOrder" block>确认支付 ￥{{ pricePro }}</van-button>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      radio: "1",
      time: 10 * 60 * 60 * 1000,
      pricePro: String,
    };
  },
  computed: {},
  watch: {},

  methods: {
    onClickLeft() {
      //   Toast("返回");
      this.$router.go(-1); // 返回上一页
    },
    payOrder(){
      if (this.radio==="1") {
        this.$router.push({
          path:"/zhifubao",
          query:{payMoney:this.pricePro}
        })
      } else {
        this.$router.push({
          path:"/weixin",
          query:{payMoney:this.pricePro}
        })
      }
    },
  },
  created() {
    this.pricePro = this.$route.query.price;
    
  },
  mounted() {},
};
</script>
<style scoped>
.img-icon {
  height: 20px;
}
.cash {
  height: 100%;
  background: rgb(244, 244, 244);
}
.van-nav-bar {
  background: rgb(244, 244, 244);
}
.price-time {
  min-height: 1.5rem;
  /* background: coral; */
}
.price-time-up {
  height: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: baseline;
  color: red;
}
.price-time-up b {
  font-size: 0.562rem;
  line-height: 0.75rem;
}
.price-time-up i,
em {
  font-size: 0.281rem;
  line-height: 0.75rem;
}
.price-time .price-time-down {
  display: flex;
  justify-content: center;
  align-items: baseline;
}
.price-time .price-time-down p {
  line-height: 0.469rem;
}
/* 倒计时 */
.price-time-down .time-down {
  /* width: 3.297rem; */
  display: flex;
  background: white;
  border-radius: 0.234rem;
  font-size: 0.281rem;
  color: red;
}
.van-count-down {
  color: red;
  font-size: 0.281rem;
}
/* 支付选择 */
.van-radio-group {
  padding: 0 0.234rem;
}
.van-cell-group {
  border-radius: 0.2rem;
}
.van-cell {
  height: 1.171rem;
  border-radius: 0.2rem;
}
.van-radio {
  height: 0.702rem;
}
.van-radio__icon {
  height: 100%;
}

.van-button {
  width: 7.031rem;
  position: relative;
  left: 0.234rem;
  right: 0.234rem;
  bottom: -7.234rem;
  border: none;
  border-radius: 0.515rem;
  background: none;
  background: linear-gradient(to right, rgb(241, 83, 56), rgb(223, 20, 15));
}
</style>