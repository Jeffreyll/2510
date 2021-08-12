<template>
  <div class="home">
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000">
      <van-swipe-item v-for="item in banners" :key="item._id">
        <img :src="item.url" alt="" class="img" />
      </van-swipe-item>
    </van-swipe>
    <!-- 小图标 -->
    <div class="bgc">
      <van-grid
        :column-num="5"
        icon-size="50px"
        :square="true"
        class="image-text"
        :border="false"
      >
        <van-grid-item
          :icon="item.img"
          :text="item.name"
          v-for="item in lists"
          :key="item._id"
          class="vg_item"
        />
      </van-grid>
      <div class="cover">
        <img
          src="https://img.youpin.mi-img.com/jianyu/0115292c98e66899adf1a63964cea989.png@base@tag=imgScale&h=278&m=1&q=80&w=750"
          alt=""
        />
      </div>
      <!-- 图片滑动 -->
      <div class="slidingTab">
        <div class="sliding">
          <h3>上新精选</h3>
          <h4>更多 ></h4>
        </div>
        <ul class="sliding_ul">
          <li v-for="item in products" :key="item._id">
            <div class="sliding_img">
              <h4><img :src="item.coverImg" alt="没有照片啊" class="img" /></h4>
              <h3 class="name">{{ item.name }}</h3>
            </div>
          </li>
        </ul>
      </div>
      <!-- ===== -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-grid :column-num="2">
          <van-grid-item
            v-for="item in products"
            :key="item._id"
            @click="godetail(item._id)"
            class="sm-box"
          >
            <van-image :src="item.coverImg" class="v-img" />
            <div class="big-box">
              <p class="v_p">{{ item.name }}</p>
              <p class="price">￥{{ item.price }}</p>
            </div>
          </van-grid-item>
        </van-grid>
      </van-list>
    </div>
  </div>
</template>
<script>
import { reqProducts } from "../../api/products";
export default {
  data() {
    return {
      banners: [
        {
          _id: 0,
          url:
            "https://img.youpin.mi-img.com/test/74e804fe64eb9481925ba84f704b3e66.png?w=1080&h=450",
        },
        {
          _id: 1,
          url:
            "https://img.youpin.mi-img.com/test/7b26c0e3da46f9830ffe6b91f763b04b.png?w=1080&h=450",
        },
        {
          _id: 2,
          url:
            "https://img.youpin.mi-img.com/test/70f06a45d96a45794397720e711ca054.jpeg?w=1080&h=450",
        },
        {
          _id: 3,
          url:
            "https://img.youpin.mi-img.com/test/74e804fe64eb9481925ba84f704b3e66.png?w=1080&h=450",
        },
        {
          _id: 4,
          url:
            "https://img.youpin.mi-img.com/ecpm/4c6b997c_5353_4038_aca6_03e1da7878e0.jpeg@base@tag=imgScale&h=320&w=750",
        },
        {
          _id: 5,
          url:
            "https://img.youpin.mi-img.com/test/24174e0bd02fbee4757121bbc3c2334e.jpeg?w=1080&h=450",
        },
      ],
      lists: [
        {
          _id: 0,
          name: "上新精选",
          img:
            "https://img.youpin.mi-img.com/jianyu/3b9f8b4e5a1639cafbb3be08cba9963a.png@base@tag=imgScale&h=100&m=1&q=80&w=100",
        },
        {
          _id: 1,
          name: "小米众筹",
          img:
            "https://img.youpin.mi-img.com/jianyu/531253430ba83f5b88e4ae92cb5a197c.png@base@tag=imgScale&h=100&m=1&q=80&w=100",
        },
        {
          _id: 2,
          name: "小米秒杀",
          img:
            "https://img.youpin.mi-img.com/jianyu/7a255e71670b9ef4a90723223265b5c5.png@base@tag=imgScale&h=100&m=1&q=80&w=100",
        },
        {
          _id: 3,
          name: "有品生活",
          img:
            "https://img.youpin.mi-img.com/jianyu/d5bb5c4a30f22e6d141d191bae80c70b.png@base@tag=imgScale&h=100&m=1&q=80&w=100",
        },
        {
          _id: 4,
          name: "小米自营",
          img:
            "https://img.youpin.mi-img.com/jianyu/52ec26cccb4d945aa4bacac4ec7c4622.png@base@tag=imgScale&h=100&m=1&q=80&w=100",
        },
      ],
      products: [],
      loading: false,
      finished: false,
      page: 1,
    };
  },
  methods: {
    async getpeoducts() {
      this.loading = true; //刚开始加载数据
      const result = await reqProducts({ page: this.page });
      this.loading = false; //接口调取成功 关闭掉
      /*    console.log(result); */
      this.products = [...this.products, ...result.data.products]; //把上一次的数据和请求过来的数据合并起来
      // 如果返回的数据小于10 说明数据已经加载完了 需要把finished
      if (result.data.products.length < 10) {
        this.finished = true;
      } else {
        this.page++;
      }
    },
    onLoad() {
      this.getpeoducts();
    },
    godetail(id) {
      this.$router.push({ path: "/detail", query: { id: id } });
    },
  },
  created() {},
  components: {},
};
</script>
<style scoped>
.bgc {
  background-color: rgb(244, 244, 244);
}
.img {
  width: 100%;
  height: 3.4rem;
}
.image-text {
  padding: 0.28rem 0 0.28rem;
}

.slidingTab {
  height: 4.3rem;
  padding: 0 0.2rem;
  border-radius: 0.539rem;
  overflow: hidden;
}

.sliding {
  padding: 0.2rem 0.3rem;
  display: flex;
  justify-content: space-between;
  background: white;
}
.sliding_ul {
  width: 100%;
  display: flex;
  height: 3.5rem;
  overflow-x: scroll;
  background: white;
}
.sliding_ul li {
  display: inline-block;
  padding: 0 0.3rem;
  width: 2.5rem;
  height: 2.9rem;
}
.sliding_ul h3 {
  font-size: 0.4rem;
  margin-top: 0.2rem;
  text-align: center;
}
.sliding_img img {
  width: 2rem;
  height: 2rem;
}
.cover {
  width: 100%;
  height: 3rem;
}

.cover img {
  width: 100%;
  height: 2.8rem;
}
.v-img {
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 0.5rem;
  overflow: hidden;
}

.sm-box {
  padding: 0.16rem;
  border-radius: 0.9rem;
  overflow: hidden;
}

.van-grid-item__content {
  border-radius: 20px;
}
.big-box {
  margin-top: 0.2rem;
  display: flex;
  flex-direction: column;
  border-radius: 0.2rem;
}
.price {
  color: rgb(250, 79, 11);
  font-size: 0.14rem;
}
p {
  margin: 0.1rem 0;
  font-size: 0.32rem;
}
.v_p {
  width: 3rem;
  overflow: hidden;
}
.sliding_img .img {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.539rem;
  overflow: hidden;
}
.sliding_img .name {
  font-size: 0.12rem;
  width: 2.15rem;
  margin-top: 0;
  color: rgb(51, 51, 51);
  word-break: break-all;
}
.sliding h3 {
  color: rgb(51, 51, 51);
  font-size: 0.36rem;
  font-weight: bold;
}
.sliding h4 {
  color: rgb(153, 153, 153);
  line-height: 0.384rem;
  font-size: 0.1024rem;
}
.big-box .v_p {
  color: rgb(136, 136, 136);
  font-size: 0.12rem;
}
</style>
