<template>
  <div class="weixin">
    <van-nav-bar @click-left="onClickLeft">
      <template #left>
        <van-icon name="arrow-left" size="1.5em" color="#1afa29"/>
      </template>
      <template #title>
        <div class="title-zhifu">
          <i
            class="iconfont my-icon-weixin1"
            style="color: #1afa29; font-size: 0.597rem"
          > </i>
          <span style="font-weight: 900"> 微信支付</span>
        </div>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},

  methods: {
    onClickLeft() {
      this.$router.go(-1); // 返回上一页
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped>
.title-zhifu {
  display: block;
  display: flex;
}
</style>