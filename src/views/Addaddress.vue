<template>
  <div class="addAddress">
    <van-nav-bar
      title="新增地址"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
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
import { addAddress } from "../../api/address";
export default {
  data() {
    return {
      areaList,
      searchResult: [],
    };
  },
  methods: {
    async onSave(content) {
      console.log(content);
      const regions =
        content.province +
        content.city +
        content.county +
        content.addressDetail;
      const obj = {
        //         receiver    收货人姓名
        // mobile      手机号
        // regions     地区信息(河南省-郑州市-二七区)
        // address     详细地址(航海路1290号)
        // idDefault   是否默认(true/false)
        receiver: content.name,
        mobile: content.tel,
        regions,
        address: content.tel,
        idDefault: content.isDefault,
      };
      const res = await addAddress(obj);
      if (res.data.code == "success") {
        Toast.success("新增地址成功！");
        this.$router.push("/address");
      }
    },
    onDelete() {
      Toast("delete");
    },

    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      Toast("按钮");
    },
  },
};
</script>

<style></style>
