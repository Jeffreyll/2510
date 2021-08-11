<template>
  <div class="address">
    <van-nav-bar
      title="地址管理"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
import { loadAddress, getAddressById } from "../../api/address";
export default {
  data() {
    return {
      chosenAddressId: "1",
      list: [],
    };
  },
  methods: {
    //加载地址列表
    async loadAddressList() {
      const res = await loadAddress();
      const newArr = [];
      res.data.addresses.forEach((item) => {
        newArr.push({
          id: item._id,
          name: item.receiver,
          tel: item.mobile,
          address: item.regions,
        });
      });
      this.list = newArr;
    },
    //新增地址
    onAdd() {
      this.$router.push("/Addaddress");
    },
    //修改地址
    async onEdit(item) {
      await getAddressById(item.id);
      this.$router.push({
        path: "/editAddress",
        query: {
          item: JSON.stringify(item),
        },
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      Toast("按钮");
    },
  },
  created() {
    this.loadAddressList();
  },
};
</script>

<style></style>
