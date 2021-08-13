<template>
  <div class="cart">
    <van-nav-bar
      title="购物车"
      left-arrow
      @click-left="onClickLeft"
      class="nav"
    >
    </van-nav-bar>
    <van-empty
      class="custom-image"
      image="https://trade.m.xiaomiyoupin.com/youpin/static/m/res/images/no_result/no_result_cart2.png"
      image-size="2rem"
      description="目前没有添加商品哦~"
      v-show="flag"
    >
      <van-button @click="gohome" round class="bottom-button" plain
        >去首页逛逛</van-button
      >
    </van-empty>
    <div class="cart_list" v-for="item in list" :key="item.product._id">
      <!--    <div class="cart_check">
        <van-checkbox v-model="item.checked"></van-checkbox>
      </div> -->
      <div class="cart_swipe">
        <van-swipe-cell>
          <div class="cart_shop">
            <div class="cart_check">
              <van-checkbox v-model="item.checked"></van-checkbox>
            </div>
            <div>
              <img :src="item.product.coverImg" alt="小主人请等待一下" />
            </div>
            <div class="cart_right">
              <p>{{ item.product.name }}</p>
              <div class="cart_price">
                <div class="cart_price_left">
                  <span>￥{{ item.product.price }}</span>
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
      class="footer"
      v-if="!flag"
    >
      <van-checkbox v-model="checked">全选</van-checkbox>
      <!-- 弹出层 -->
      <van-popup
        v-model="show"
        round
        position="bottom"
        :style="{ height: '50%' }"
        class="tanchu"
      >
        <van-address-list
          v-model="chosenAddressId"
          :list="addressList"
          :add-button-text="addbuttontext"
          @add="onAdd"
          @edit="onEdit"
          @click-item="onClickItem"
        />
      </van-popup>
    </van-submit-bar>
  </div>
</template>

<script>
import { delCart, loadCart, addToCart } from "../../api/cart";
import { Toast, Dialog } from "vant";
import { addorder } from "../../api/order";
import { loadAddress, getAddressById } from "../../api/address";

export default {
  data() {
    return {
      list: [],
      show: false,
      chosenAddressId: "1",
      addressList: [],
      getAddressByIdList: [],
      addbuttontext: "",
      flag: false,
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
    //初始化，加载购物车列表
    async init() {
      const res = await loadCart();
      console.log(res);
      this.list = res.data;
      if (res.data.length == 0) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    },
    //提交订单
    async onSubmit() {
      this.show = true;
    },
    //回到首页
    gohome() {
      this.$router.push("/");
    },
    //获取地址列表添加到addressList
    async getaddress() {
      const addres = await loadAddress();
      if (addres.data.addresses.length == 0) {
        this.addbuttontext = "新增地址";
      } else {
        this.addbuttontext = "确认";
        this.chosenAddressId = addres.data.addresses[0]._id;
        addres.data.addresses.forEach((item) => {
          this.addressList.push({
            id: item._id,
            name: item.receiver,
            tel: item.mobile,
            address: item.regions,
          });
        });
      }
    },
    //提交订单
    async onAdd() {
      this.show = false;
      if (this.addbuttontext == "确认") {
        const res = await addorder({
          receiver: this.getAddressByIdList.receiver,
          regions: this.getAddressByIdList.regions,
          address: this.getAddressByIdList.regions,
          orderDetails: this.selectList,
        });
        if (res.data.code == "success" && res.data.info.order.price != 0) {
          this.init();
          this.$router.push({
            path: "/cash",
            query: {
              address: res.data.info.order,
              price: res.data.info.order.price,
            },
          });
        } else {
          Toast.fail("至少选择一件商品");
        }
      } else {
        this.$router.push("/addAddress");
      }
    },
    //点击地址获得id
    async onClickItem(item) {
      const getaddres = await getAddressById(item.id);
      this.getAddressByIdList = getaddres.data;
    },
    //修改地址
    onEdit(item, index) {
      Toast("编辑地址:" + index);
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
    if (this.addressList.length == 0) {
      this.getaddress();
    }
  },
};
</script>
<style scoped>
.nav {
  height: 1.7rem;
  background: url("https://trade.m.xiaomiyoupin.com/youpin/static/m/res/images/common/bg_page_header.png");
  display: flex;
  flex-direction: column;
  justify-content: center;
}
::v-deep .van-icon {
  color: #fff;
}
::v-deep .van-nav-bar__title {
  color: white;
  font-size: 0.35rem;
}
.bottom-button {
  width: 2rem;
  height: 0.7rem;
  border-color: rgb(102, 102, 102);
  font-size: 0.23rem;
  color: rgb(102, 102, 102);
}
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
  background: #ffffff;
  border-radius: 20px;
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
.footer {
  margin-bottom: 1.171rem;
}
.tanchu {
  margin-bottom: 0.98rem;
}
</style>
