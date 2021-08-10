<template>
  <div class="about">
    <van-row>
      <!-- 页面头部 -->
      <van-col class="header" span="24">
        <div class="header-fenlei">分类</div>
        <van-icon size="24" name="search" />
      </van-col>
    </van-row>
    <!-- 分类 -->
    <div class="mid-fenlei">
      <ul>
        <li>
          <div></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category:[
        
      ],
      // activeKey: 0,
      /* items: [
        { text: "有品推荐" },
        { text: "手机数码" },
        { text: "家用电器" },
        { text: "智能家庭" },
        { text: "美食酒饮" },
        { text: "家具家装" },
        { text: "出行车品" },
        { text: "电脑办公" },
        { text: "服装配饰" },
        { text: "运动户外" },
        { text: "健康保健" },
        { text: "日用文创" },
        { text: "美妆个护" },
        { text: "家纺餐厨" },
        { text: "鞋靴箱包" },
        { text: "母婴亲子" },
        { text: "宠物生活" },
        { text: "有品海购" },
        { text: "DLAB" },
        { text: "品牌墙" },
      ],
      activeId: 1,
      activeIndex: 0, */
    };
  },
  methods: {
    onChange(index) {
      console.log(index);
    },
  },
};
</script>

<style scoped>
.about {
  height: 100%;
  background: #f6f6f6;
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
</style>