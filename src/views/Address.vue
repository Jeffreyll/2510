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
import { loadAddress } from "../../api/address";
export default {
  data() {
    return {
      chosenAddressId: "1",
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
          isDefault: true,
        },
        {
          id: "2",
          name: "李四",
          tel: "1310000000",
          address: "浙江省杭州市拱墅区莫干山路 50 号",
        },
      ],
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
    onEdit(item, index) {
      Toast("编辑地址:" + index);
      console.log(item, index);
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
