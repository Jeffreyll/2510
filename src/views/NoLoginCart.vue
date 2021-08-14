<template>
  <div class="noLoginCart">
    <van-nav-bar
      title="购物车"
      left-arrow
      @click-left="onClickLeft"
      class="nav"
    >
    </van-nav-bar>
    <van-empty
      class="custom-image"
      image="https://trade.m.xiaomiyoupin.com/youpin/static/m/res/images/no_result/no_result_cart2.png"
      image-size="2rem"
      description="登录后才能看到商品哦~"
      v-show="flag"
    >
      <van-button @click="goLogin" round class="bottom-button" plain
        >立即登录</van-button
      >
    </van-empty>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      flag: true,
    };
  },
  methods: {
    //返回上一级
    onClickLeft() {
      this.$router.go(-1);
    },
    //登录
    goLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.nav {
  height: 1.7rem;
  background: url("https://trade.m.xiaomiyoupin.com/youpin/static/m/res/images/common/bg_page_header.png");
  display: flex;
  flex-direction: column;
  justify-content: center;
}
::v-deep .van-icon {
  color: #fff;
}
::v-deep .van-nav-bar__title {
  color: white;
  font-size: 0.35rem;
}
.bottom-button {
  width: 2rem;
  height: 0.7rem;
  border-color: rgb(102, 102, 102);
  font-size: 0.23rem;
  color: rgb(102, 102, 102);
}
</style>
