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
        ><em>.00</em>
      </div>
      <div class="price-time-down">
        <p>支付剩余时间：</p>
        <span>
          <van-count-down :time="time" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      time: 30 * 60 * 60 * 1000,
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
  },
  created() {
    this.pricePro = this.$route.query.price;
  },
  mounted() {},
};
</script>
<style scoped>
.cash {
  height: 100%;
  background: rgb(244, 244, 244);
}

.price-time {
  height: 1.5rem;
  background: coral;
}
.price-time-up {
  height: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
}
.price-time-up b {
  font-size: 0.562rem;
  line-height: 0.75rem;
}
.price-time-up i,em{
    font-size: 0.281rem;
    line-height: 0.75rem;
}
</style>