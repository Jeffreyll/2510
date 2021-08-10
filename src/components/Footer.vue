<template>
  <div class="footer">
    <van-tabbar v-model="active" active-color="#845F3F" inactive-color="#666">
      <van-tabbar-item to="/home" icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item to="/fenlei" icon="more">分类</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="cart">购物车</van-tabbar-item>
      <van-tabbar-item to="/mine" icon="friends">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style></style>
