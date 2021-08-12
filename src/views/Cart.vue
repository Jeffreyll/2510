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
    <div class="cart_list" v-for="item in list" :key="item.product._id">
      <div class="cart_check">
        <van-checkbox v-model="item.checked"></van-checkbox>
      </div>
      <div class="cart_swipe">
        <van-swipe-cell>
          <div class="cart_shop">
            <div>
              <img :src="item.product.coverImg" alt="" />
            </div>
            <div class="cart_right">
              <p>{{ item.product.name }}</p>
              <div class="cart_price">
                <div class="cart_price_left">
                  <span>{{ item.product.price }}</span>
                </div>
                <div class="cart_price_right">
                  <van-stepper
                    v-model="item.quantity"
                    theme="round"
                    button-size="22"
                    disable-input
                  />
                </div>
              </div>
            </div>
          </div>
          <div></div>
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
              @click="del(item._id)"
            />
          </template>
        </van-swipe-cell>
      </div>
    </div>
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
import { Toast, Dialog } from "vant";
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
        .reduce(function (pre, cur) {
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
      Dialog.confirm({
        message: "确定删除吗？",
      })
        .then(async () => {
          const res = await delCart(id);
          if (res.code == 200) {
            Toast.success("删除商品成功！");
          }
          this.init();
        })
        .catch(() => {});
    },
  },
  created() {
    this.init();
  },
};
</script>
<style scoped>
.cart_list {
  padding: 10px 5px;
  display: flex;
  justify-content: space-around;
}
.cart_check {
  padding: 0 3px;
  display: flex;
  align-items: center;
}
.cart_swipe {
  flex-grow: 1;
}
.cart_shop {
  display: flex;
}
.cart_shop img {
  width: 100px;
  height: 100px;
}
.cart_right {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.cart_right p {
  margin: 5px 0 0 5px;
}
.cart_price {
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
}
.cart_price_left {
  margin-left: 5px;
  color: red;
  align-self: flex-end;
  font-size: 18px;
}
.cart_price_right {
  margin-right: 5px;
  align-self: flex-end;
}
.goods-card {
  margin: 0;
  background-color: white;
}
.delete-button {
  height: 100%;
}
</style>
