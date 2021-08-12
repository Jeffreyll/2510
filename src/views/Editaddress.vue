<template>
  <div class="addAddress">
    <van-nav-bar
      title="修改地址"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-address-edit
      :area-list="areaList"
      show-delete
      show-search-result
      :address-info="addressInfo"
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
import areaList from "../../api/area";
import { editAddress, delAddress } from "../../api/address";
export default {
  data() {
    return {
      areaList,
      searchResult: [],
      addressInfo: {},
      item: {},
    };
  },
  methods: {
    //保存地址
    async onSave(content) {
      console.log(content);
      const regions =
        content.province +
        content.city +
        content.county +
        content.addressDetail;
      const obj = {
        receiver: content.name,
        mobile: content.tel,
        regions,
        address: regions,
        idDefault: false,
      };
      const res = await editAddress(content.id, obj);
      if (res.status == 200) {
        Toast.success("修改成功");
        this.$router.push("/address");
      }
    },
    //删除地址
    async onDelete(content) {
      const res = await delAddress(content.id);
      if (res.status == 200) {
        Toast.success("删除成功");
        this.$router.push("/address");
      }
    },
    //返回上一级
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      Toast("按钮");
    },
    //获得参数回显
    getdata() {
      this.item = JSON.parse(this.$route.query.item);
      this.addressInfo = {
        id: this.item.id,
        name: this.item.name,
        tel: this.item.tel,
        addressDetail: this.item.address,
      };
    },
  },
  created() {
    this.getdata();
  },
};
</script>

<style></style>
