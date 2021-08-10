<template>
  <div class="mine">
    <div class="wrapper">
      <van-cell class="login" :to="userInfo.to">
        <template #title>
          <img
            style="border-radius=50%"
            :src="userInfo.avatar"
            alt=""
            class="avatar"
          />
          <span class="please">{{ userInfo.userName }}</span>
          <img
            src="https://m.xiaomiyoupin.com/youpin/static/m/res/images/icons/icon_arrow_right_darkgray.png"
            alt=""
            class="back"
          />
        </template>
      </van-cell>
    </div>
    <van-cell
      v-for="(item, i) in tabList"
      :key="i"
      :title="item.name"
      :to="item.to"
      :icon="item.icon"
      is-link
      class="tabList"
    >
    </van-cell>
    <!-- 优惠券单元格 -->
    <van-coupon-cell
      :coupons="coupons"
      :chosen-coupon="chosenCoupon"
      @click="showList = true"
      icon="https://m.xiaomiyoupin.com/youpin/static/m/res/images/ucenter/ucenter_icon_coupon_new.png"
    />
    <!-- 优惠券列表 -->
    <van-popup
      v-model="showList"
      round
      position="bottom"
      style="height: 90%; padding-top: 4px;"
    >
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
      />
    </van-popup>
  </div>
</template>

<script>
import { islogined } from "../../utils/auth";
import { loadUser } from "../../api/user";
const coupon = {
  available: 1,
  condition: "无使用门槛\n最多优惠12元",
  reason: "",
  value: 150,
  name: "优惠券名称",
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: "1.5",
  unitDesc: "元",
};
export default {
  data() {
    return {
      userInfo: {
        avatar:
          "https://img.youpin.mi-img.com/shopcenter/7dhur6i77hg_11350267611625208274363.png",
        nickName: "请登录",
        icon:
          "https://m.xiaomiyoupin.com/youpin/static/m/res/images/icons/icon_arrow_right_darkgray.png",
        to: "login",
      },
      tabList: [
        {
          icon:
            "https://m.xiaomiyoupin.com/youpin/static/m/res/images/ucenter/ucenter_icon_myassets.png",
          name: "我的权益",
          to: "home",
        },

        {
          icon:
            "https://m.xiaomiyoupin.com/youpin/static/m/res/images/ucenter/ucenter_icon_collection.png",
          name: "我的收藏",
          to: "home",
        },
        {
          icon:
            "https://m.xiaomiyoupin.com/youpin/static/m/res/images/ucenter/ucenter_icon_address.png",
          name: "地址管理",
          to: "address",
        },
        {
          icon:
            "https://shop.io.mi-img.com/app/shop/img?id=shop_0556651f21ebb90fd2094de25cfeeeff.png&w=114&h=114",
          name: "资质证照",
          to: "home",
        },
        {
          icon:
            "https://shop.io.mi-img.com/app/shop/img?id=shop_eec55569c325c1641e1cd47ba572b83b.png&w=114&h=114",
          name: "协议规则",
          to: "home",
        },
        {
          icon:
            "https://m.xiaomiyoupin.com/youpin/static/m/res/images/ucenter/ucenter_icon_feedback.png",
          name: "帮助与反馈",
          to: "home",
        },
      ],
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
      showList: false,
    };
  },
  methods: {
    //获取用户信息
    async Users() {
      if (islogined) {
        const res = await loadUser();
        console.log(res);
        this.userInfo = res.data;
      }
    },
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
      console.log(code);
    },
  },
  created() {
    this.Users();
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
.tabList {
  height: 1rem;
}
.van-icon__image {
  width: 0.76rem;
  height: 0.76rem;
  margin-top: -0.14rem;
}
</style>
