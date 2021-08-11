<template>
  <div class="mine">
    <div class="wrapper">
      <van-cell class="login" ref="log" :to="userInfo.to" @click="golog">
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
    <van-cell title="我的订单" is-link class="order"></van-cell>
    <div class="focus">
      <div v-for="(item, i) in focusList" :key="i" class="focusList">
        <img :src="item.img" alt="" />
        <p>{{ item.name }}</p>
      </div>
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
      focusList: [
        {
          img:
            "https://img.youpin.mi-img.com/shopcenter/1su4kcv21eg_22212270231600948691418.png",
          name: "待付款",
        },
        {
          img:
            "https://img.youpin.mi-img.com/shopcenter/2rsi345c8a_22212270231600948691450.png",
          name: "待收货",
        },
        {
          img:
            "https://img.youpin.mi-img.com/shopcenter/n9q7tuhs6ao_22212270231600948691455.png",
          name: "评价",
        },
        {
          img:
            "https://img.youpin.mi-img.com/shopcenter/q69ib1u9teg_22212270231600948691439.png",
          name: "退款/售后",
        },
      ],
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
        this.userInfo = res.data;
        this.$refs.log.style.background =
          "url('https://trade.m.xiaomiyoupin.com/youpin/static/m/res/images/common/bg_page_header.png')";
      }
    },
    //登录
    golog() {
      if (islogined) {
        this.$router.push("/logout");
      } else {
        this.$router.push("/login");
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

<style scoped>
#app {
  background: rgb(243, 243, 243);
}
.login {
  width: 7.5rem;
  height: 2.015rem;
  padding: 0;
  background: url("https://m.xiaomiyoupin.com/youpin/static/m/res/images/ucenter/ucenter_bg_top.png");
}
.van-cell__title {
  display: flex;
  align-items: center;
}
.avatar {
  width: 1.195rem;
  height: 1.195rem;
  margin-left: 0.515rem;
  border-radius: 50%;
}
.please {
  padding-left: 0.398rem;
  height: 0.375rem;
  width: 4.687rem;
  font-size: 0.281rem;
  color: white;
}
.back {
  width: 0.351rem;
  height: 0.351rem;
}
.tabList {
  height: 1rem;
}
.van-icon__image {
  width: 0.76rem;
  height: 0.76rem;
  margin-top: -0.14rem;
}
.focus {
  display: flex;
  flex-direction: row;
  background: #fff;
  margin: 0.05rem 0 0.1rem;
  justify-content: space-evenly;
  align-items: center;
  height: 1.406rem;
}
.focusList img {
  width: 0.8rem;
  height: 0.8rem;
}
.focusList {
  display: flex;
  flex-direction: column;
  align-items: center;

  color: rgba(0, 0, 0, 0.6);
  font-size: 0.26rem;
}
.order {
  padding-left: 0.7rem;
}
</style>
