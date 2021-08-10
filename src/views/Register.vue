<template>
  <div class="register">
    <van-nav-bar>
      <template #left>
        <van-icon
          size="30"
          name="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAM1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACjBUbJAAAAEXRSTlMAzCypv7h8bhwiJ3ajBpVZQCANZkQAAACcSURBVGje7ddBDoMgEEDRGaTYIrTe/7RNuiKNmoxRFPLfcjY/RBMYAQAAAIDjxORDlnM5r6ofsbI3NMiZ4q+hs1jZG2MxorHi1UvjUa0xFaMmG896jVCMaFzf0MEkjVkM3mpmP7nXfXyNkwzmb2LnneyoJGcR8w3/4S4rk/xp7z7prLL0WqGyIfZXmWVBW5vW5s7Y2PYLAAAA4La+a3oF6H7vsPkAAAAASUVORK5CYII="
          @click="goback"
        />
      </template>
    </van-nav-bar>
    <div class="title">
      <h2>注册小米账号</h2>
      <p>系统会根据您选择的国家/地区的法律法规存储您的个人信息</p>
    </div>
    <van-form @submit="onSubmit" class="form">
      <van-field
        v-model="fieldValue"
        is-link
        readonly
        placeholder="请选择所在地区"
        @click="show = true"
        name="nickName"
      />
      <van-popup v-model="show" round position="bottom">
        <van-cascader
          v-model="cascaderValue"
          title="请选择所在地区"
          :options="options"
          :field-names="fieldNames"
          @close="show = false"
          @finish="onFinish"
        />
      </van-popup>
      <van-field
        v-model="username"
        name="userName"
        placeholder="邮箱/手机号码/小米ID"
        :rules="[{ required: true, message: '请填写用户名' }]"
        clearable
        autocomplete="off"
      />
      <van-field
        v-model="password"
        type="password"
        placeholder="密码"
        name="password"
        :rules="[{ required: true, message: '请填写密码' }]"
      />

      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit" class="submit"
          >注册</van-button
        >
      </div>
    </van-form>
    <van-radio-group v-model="radio">
      <van-radio name="1" icon-size="15" class="radio">
        <div class="read">
          已阅读并同意小米帐号<span>用户协议</span>和<span>隐私政策</span>
        </div></van-radio
      >
    </van-radio-group>
  </div>
</template>

<script>
import { country } from "../../api/country";
import { Toast } from "vant";
import { regApi } from "../../api/user";
export default {
  data() {
    return {
      username: "",
      password: "",
      radio: "",
      show: false,
      fieldValue: "",
      fieldNames: {
        text: "name",
        value: "id",
      },
      cascaderValue: "",
      // 选项列表，children 代表子选项，支持多级嵌套
      options: [],
    };
  },
  methods: {
    //注册
    async onSubmit(values) {
      if (this.radio == 1) {
        const res = await regApi(values);
        if (res.data.code == "success") {
          Toast.success("注册成功！");
          this.$router.push("/login");
        } else if (res.data.code == "error") {
          Toast.fail(res.data.message);
        }
      } else {
        Toast.fail("请您同意用户条款");
      }
    },
    onFinish({ selectedOptions }) {
      this.show = false;
      this.fieldValue = selectedOptions.map((option) => option.name).join("/");
    },
    //返回上一级
    goback() {
      this.$router.go(-1);
    },
  },
  created() {
    this.options = country;
  },
};
</script>

<style scoped>
.title {
  margin: 0 24px;
  margin-bottom: 9px;
}
.title h2 {
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
  font-size: 18px;
  height: 28px;
}
.title p,
.read span {
  color: #0b84ff;
}
.form {
  padding: 0 24px;
}
.read {
  color: rgba(0, 0, 0, 0.54);
}
.radio {
  margin-top: 60px;
  justify-content: center;
}
</style>
