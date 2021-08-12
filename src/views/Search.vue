<template>
  <div class="search">
    <div class="search_left">
      <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft">
      </van-nav-bar>
      <van-search
        v-model="value"
        shape="round"
        show-action
        placeholder="请输入搜索关键词"
      >
        <template #action>
          <div @click="onSearch" class="search_sear">搜索</div>
        </template>
      </van-search>
    </div>
    <!-- 商品信息 -->
    <div>
      <van-grid :column-num="3" :gutter="10">
        <van-grid-item
          v-for="item in newList"
          :key="item._id"
          @click="godetail(item._id)"
        >
          <img :src="item.coverImg" alt="小主人没有照片啊" class="search_img" />
          <p class="search_p">{{ item.name }}</p>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { reqProducts } from "../../api/products";
export default {
  data() {
    return {
      value: "",
      products: [],
      newList: [],
    };
  },
  methods: {
    async reqSearch() {
      const result = await reqProducts({ per: 130 });
      console.log(result);
      this.products = result.data.products;
    },
    //
    onSearch(value) {
      value = this.value;
      return (this.newList = this.products.filter((item) => {
        if (item.name.includes(value)) {
          return item;
        }
      }));
    },
    godetail(id) {
      this.$router.push({ path: "/detail", query: { id: id } });
    },
    onClickLeft() {
      this.$router.go(-1); // 返回上一页
    },
  },
  created() {
    this.reqSearch();
  },
};
</script>

<style scoped>
.search_sear {
  color: #fff;
  text-align: center;
  background: linear-gradient(to right, rgb(205, 140, 57), rgb(205, 140, 57));
  width: 53px;
  border-radius: 16px;
}
.search_img {
  width: 95px;
  height: 90px;
}
.search_p {
  margin-top: 15px;
}
</style>