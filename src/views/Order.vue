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
import {getOrderlist,getOrderItem} from "../../api/order"
// import { Toast } from 'vant';
export default {
  components: {},
  data() {
    return {
        id:"6114c5c047886c36e87fcd69",
        orderIdArr:[],
    };
  },
  computed: {},
  watch: {},

  methods: {
    //   订单列表
    async orderList(){
        const res = await getOrderlist({per:1000,});
        console.log("订单列表", res.data.orders);
        // res.data.orders.forEach(v => {
        //     this.orderIdArr.push({})
        // });
    },
    //   订单详情
    async orderItem(){
        const res = await getOrderItem(this.id);
        console.log("订单详情",res.data);
    },
    onClickLeft() {
      //   Toast("返回");
      console.log(111);
      this.$router.go(-1); // 返回上一页
    },
  },
  created() {
      this.orderList();
    //   this.orderItem();
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