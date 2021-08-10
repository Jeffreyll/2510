<template>
  <div class="home">
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000">
      <van-swipe-item v-for="item in banners" :key="item._id">
        <img :src="item.coverImg" alt="" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { reqProducts } from "../../api/products";
export default {
  data() {
    return {
      value: "",
      banners: [],
    };
  },
  methods: {
    async getBanners() {
      const result = await reqProducts();
      console.log(result);
      this.banners = result.data.data;
    },
  },
  created() {
    this.getBanners();
  },
  components: {},
};
</script>
<style scoped>
</style>