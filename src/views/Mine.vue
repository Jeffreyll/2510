<template>
  <div class="mine">
    <div class="wrapper">
      <van-cell class="login" :to="userInfo.to">
        <template #title>
          <img :src="userInfo.img" alt="" class="avatar" />
          <span class="please">{{ userInfo.name }}</span>
          <img :src="userInfo.icon" alt="" class="back" />
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        img:
          "https://img.youpin.mi-img.com/shopcenter/7dhur6i77hg_11350267611625208274363.png",
        name: "请登录",
        icon:
          "https://m.xiaomiyoupin.com/youpin/static/m/res/images/icons/icon_arrow_right_darkgray.png",
        to: "login",
      },
    };
  },
};
</script>

<style>
.login {
  width: 320px;
  height: 86px;
  padding: 0;
  background: url("https://m.xiaomiyoupin.com/youpin/static/m/res/images/ucenter/ucenter_bg_top.png");
}
.van-cell__title {
  width: 320px;
  height: 86px;
  display: flex;
  align-items: center;
}
.avatar {
  width: 51px;
  height: 51px;
  padding-left: 22px;
}
.please {
  padding-left: 17px;
  height: 16px;
  width: 200px;
  font-size: 12px;
  color: white;
}
.back {
  width: 15px;
  height: 15px;
}
</style>
