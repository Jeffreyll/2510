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
        <div class="ren-addr"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrderlist, getOrderItem } from "../../api/order";
// import { Toast } from 'vant';
export default {
  components: {},
  data() {
    return {
      orderid: "",
      orderIdArr: [], // 订单数组
      orderSingleItem: {}, // 订单详情
    };
  },
  computed: {},
  watch: {},

  methods: {
    //   订单列表
    async orderList() {
      const res = await getOrderlist({ per: 1000 });
      console.log("订单列表", res.data.orders);
      let arr = [];
      res.data.orders.forEach((v, index) => {
        arr.push({ index: index, id: v._id });
      });
      this.orderIdArr = arr;
      console.log("订单数组", this.orderIdArr);
      this.orderid = this.orderIdArr[0].id;
      console.log("当前订单id：", this.orderIdArr[0].id);
      this.orderItem(); //   订单详情
    },
    //   订单详情
    async orderItem() {
      const res = await getOrderItem(this.orderid);
      console.log("订单详情", res.data);
    },
    onClickLeft() {
      //   Toast("返回");
      this.$router.go(-1); // 返回上一页
    },
  },
  created() {
    this.orderList(); //   订单列表
  },
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
