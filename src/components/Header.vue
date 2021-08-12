<template>
  <div class="homeHeader">
    <img :src="img" class="logo" />
    <van-search
      style="background-color: #845d32; width: 260px"
      v-model="value"
      placeholder="搜一搜"
      shape="round"
      @click="onSearch"
    />
  </div>
</template>

<script>
export default {
  name: "HomeHeader",
  components: {},
  data() {
    return {
      img: "https://img.youpin.mi-img.com/static/weex_images/v1/m/navi_title_v6.png",
      value: "",
    };
  },
  methods: {
    onSearch() {
      this.$router.push("/search");
    },
  },
};
</script>

<style scoped>
.homeHeader {
  height: 48px;
  background-color: #845d32;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.logo {
  width: 31px;
  height: 24px;
  margin-left: 10px;
}
input::-webkit-input-placeholder {
  color: #333;
}
.homeHeader .van-search {
  background-color: #845d32;
  padding: 0;
  margin-left: 9px;
}
</style>
