<template>
  <div class="order">
    <!-- 顶部导航 -->
    <van-nav-bar right-text="" @click-left="onClickLeft">
      <template #left>
        <b style="font-weight: 900">&lt;</b>
      </template>
      <template #title>
        <p style="font-weight: 900">确认订单</p>
      </template>
    </van-nav-bar>
    <!-- 中部 -->
    <div class="order-mid">
      <div class="address">
        <div class="ren-addr">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'vant';
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},

  methods: {
    onClickLeft() {
      //   Toast("返回");
      console.log(111);
      this.$router.go(-1); // 返回上一页
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped>
.order {
  background: rgb(244, 244, 244);
}
.order-mid {
  background: greenyellow;
  min-height: 2rem;
  margin: 0.234rem 0.234rem 0;
}
.order-mid .address {
  height: 1.64rem;
  border-radius: 0.187rem;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.234rem;
}
/* 收货人地址 */
.address .ren-addr {
  width: 100%;
  height: 100%;
  display: flex;
}
.address .ren-addr p {
  flex: 1;
  font-size: 0.328rem;
  line-height: 0.45rem;
}
</style>