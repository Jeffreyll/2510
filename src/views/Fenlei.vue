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
    <div class="middle-wrap">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
      </van-sidebar>
      <div class="right">you</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeKey: 0,// 当前选中项的索引
      categoryList: [],
    };
  },
  methods: {},
  created(){

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
.middle-wrap .van-sidebar .van-sidebar-item{
  
}
.middle-wrap .van-sidebar .van-sidebar-item--select{

}

/* 右侧展示商品 */
.middle-wrap .right{
  flex: 1;
  background: coral;
}
</style>