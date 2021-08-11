<template>
  <div class="cart">
    <van-nav-bar
      title="购物车"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #right> <van-icon name="search" size="20" /> </template
    ></van-nav-bar>
    <van-card
      v-for="item in list"
      :key="item.product._id"
      :num="item.quantity"
      :price="item.product.price"
      :title="item.product.name"
      :thumb="item.product.coverImg"
      tag="爆款"
    >
      <template #tags>
        <van-tag plain type="danger">标签</van-tag>
        <van-tag plain type="danger">标签</van-tag>
        <van-checkbox v-model="item.checked" />
      </template>
      <template #footer>
        <van-button
          @click="add(item.product._id, 1)"
          round
          size="mini"
          icon="plus"
          style="background:#ff6700"
        />
        <van-button
          @click="sub(item.product._id, -1)"
          round
          size="mini"
          icon="minus"
          style="background:#ff6700"
        />
        <van-button @click="del(item._id)" round size="mini" type="danger"
          >删除</van-button
        >
      </template>
    </van-card>
    <van-submit-bar
      :price="sumPrice * 100"
      button-text="提交订单"
      tip-icon="info-o"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { delCart, loadCart, addToCart } from "../../api/cart";
import { Toast } from "vant";
import { addorder } from "../../api/order";

export default {
  data() {
    return {
      list: [],
    };
  },
  computed: {
    //全选单选
    checked: {
      set(flag) {
        return this.list.map((item) => this.$set(item, "checked", flag));
      },
      get() {
        return (
          this.list.length ==
          this.list.filter((item) => item.checked == true).length
        );
      },
    },
    //计算商品总价
    sumPrice() {
      return this.list
        .filter((item) => {
          return item.checked == true;
        })
        .reduce(function(pre, cur) {
          return pre + cur.product.price * cur.quantity;
        }, 0);
    },
    //获取选中的购物车列表
    selectList() {
      const newList = [];
      this.list.forEach((item) => {
        if (item.checked == true) {
          newList.push({
            quantity: item.quantity,
            product: item._id,
            price: item.product.price,
          });
        }
      });
      return newList;
    },
  },

  methods: {
    //提交订单
    async onSubmit() {
      console.log(this.selectList);
      const res = await addorder({
        receiver: "汪道富",
        regions: "河南省郑州市二七区",
        address: "千锋教育",
        orderDetails: this.selectList,
      });
      console.log(res);
      if (res.data.code == "success") {
        Toast.success(res.data.message);
        this.init();
      }
    },
    //初始化，加载购物车列表
    async init() {
      const res = await loadCart();
      console.log(res);
      this.list = res.data;
    },
    //返回上一级
    onClickLeft() {
      this.$router.go(-1);
    },
    //增加
    async add(id, num) {
      await addToCart(id, num);
      this.list.forEach((item) => {
        if (item.product._id == id) {
          item.quantity += num;
        }
      });
    },
    //减少
    async sub(id, num) {
      await addToCart(id, num);
      this.list.forEach((item) => {
        if (item.product._id == id && item.quantity > 1) {
          item.quantity += num;
        }
      });
    },
    //删除购物车
    async del(id) {
      const res = await delCart(id);
      console.log(res);
      if (res.status == 200) {
        Toast.success("删除商品成功！");
      }
      this.init();
    },
  },
  created() {
    this.init();
  },
};
</script>

<style scoped>
.van-checkbox {
  justify-content: flex-end;
}
</style>
