<template>
  <div class="about">
    <van-row>
      <!-- 页面头部 -->
      <van-col class="header" span="24">
        <div class="header-fenlei">分类</div>
        <van-icon size="24" name="search" @click="goSearch"/>
      </van-col>
    </van-row>
    <!-- 分类 -->
    <div class="middle-wrap">
      <!-- 侧面导航 -->
      <van-sidebar v-model="activeKey">
        <li
          @click="getCategory(item.name)"
          v-for="(item, index) in categoryList"
          :key="index"
        >
          <van-sidebar-item :title="item.name" />
        </li>
      </van-sidebar>
      <div class="right">
        <div class="right-body">
          <!-- 商品 -->
          <li
            class="goods"
            v-for="(item, index) in categorygoodsList"
            :key="index"
            @click="toDetail(item._id)"
          >
            <div class="div-img">
              <img :src="item.coverImg" alt="" />
            </div>
            <p>{{ item.name }}</p>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqProducts } from "../../api/products";
export default {
  data() {
    return {
      categorygoodsList: [],
      activeKey: 0, // 当前选中项的索引
      categoryList: [
        { name: "口红" },
        { name: "灯具" },
        { name: "耳机" },
        { name: "手机" },
        { name: "智能手表" },
        { name: "电视" },
      ],
    };
  },
  methods: {
    // 获取分类商品信息
    async getCategory(name) {
      // console.log(name);
      const res = await reqProducts({ per: 50, name: name });
      // console.log(res.data.products);
      this.categorygoodsList = res.data.products;
      // console.log(this.categorygoodsList);
    },
    // 跳转详情页
    toDetail(id) {
      // console.log(id);
      // 携带商品id到详情页
      this.$router.push({ path: "/detail", query: { id: id } });
    },
    goSearch(){
      this.$router.push("/search");
    }
  },
  created() {
    this.getCategory(this.categoryList[0].name);
  },
};
</script>

<style scoped>
.about {
  height: 100%;
  background: #f6f6f6;
  display: flex;
  flex-direction: column;
}
.about .van-row .header {
  height: 38.5px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  background: white;
  border-bottom: #efefef 1px solid;
}

.about .van-row .header .header-fenlei {
  height: 24px;
  flex: 1;
  color: rgb(51, 51, 51);
  text-indent: 132px;
  font-size: 16px;
}

.middle-wrap {
  flex: 1;
  overflow: scroll;
  display: flex;
  margin-bottom: 1.19rem;
}
.van-sidebar::-webkit-scrollbar {
  display: none;
}
/* 左侧导航 */
.middle-wrap .van-sidebar {
  background: white;
}
.middle-wrap .van-sidebar li {
  padding: 0.25rem 0.15rem;
}
.middle-wrap .van-sidebar li .van-sidebar-item {
  color: #777777;
  padding: 0;
  text-align: center;
  background: white;
  border-radius: 0.17rem;
}
.middle-wrap .van-sidebar li .van-sidebar-item--select {
  color: white;
  background: linear-gradient(to right, #e6aa5c, #d08b30);
}

.middle-wrap .van-sidebar li .van-sidebar-item--select::before {
  background: none;
}

/* 右侧展示商品 */
.middle-wrap .right {
  flex: 1;
  /* background: coral; */
  display: flex;
  justify-content: center;
}
.right .right-body {
  width: 5.3rem;

  border-radius: 8px;
  background: white;
  margin-top: 0.2rem;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-around; */
  align-content: flex-start;
  overflow-x: auto;
  overflow-y: auto;
}
.right-body .goods {
  height: 2rem;
  width: 1.33rem;
  margin-top: 0.27rem;
  margin-left: 0.215rem;
  margin-right: 0.215rem;
  /* background: chartreuse; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.goods .div-img {
  border-radius: 0.117rem;
  width: 1.33rem;
  height: 1.33rem;
}
.goods .div-img img {
  display: block;
  border-radius: 0.234rem;
  width: 100%;
  height: 100%;
}
.goods p {
  /* background: wheat; */
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  overflow: hidden;
  color: #777777;
  text-indent: 0.04rem;
  /* white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */
}
</style>
