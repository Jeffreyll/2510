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
  </div>
</template>

<script>
export default {
  data() {
    return {
      category: [],
    };
  },
  methods: {},
};
</script>

<style scoped>
.about {
  height: 100%;
  background: #f6f6f6;
}
.about .van-row
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