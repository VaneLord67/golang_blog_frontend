<template>
  <div class="outer">
    <div class="top">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#000000"
        text-color="#ffffff"
        @select="handleSelect"
      >
        <el-menu-item index="1">
          <a href="https://www.ele.me" target="_self">首页</a>
        </el-menu-item>
        <el-menu-item index="2">
          <a href="https://www.ele.me" target="_self">博客页</a>
        </el-menu-item>
        
      </el-menu>
    </div>
    <div class="back">
      <div class="login">
        <h1>登录</h1>
        <el-form
          :label-position="labelPosition"
          label-width="60px"
          :model="formLabelAlign"
        >
          <el-form-item label="" style="padding-right: 10%">
            <el-input
              size="large"
              v-model="formLabelAlign.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="" style="padding-right: 10%">
            <el-input
              size="large"
              v-model="formLabelAlign.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="" style="padding-right: 10%">
            <el-input
              size="large"
              v-model="formLabelAlign.captcha"
              placeholder="请输入验证码"
            ></el-input>
          </el-form-item>
          <el-button type="success" @click="Login()">登录</el-button>
          <el-button type="primary" @click="GetCaptchaPicture()"
            >刷新验证码</el-button
          >
          <img
            :src="imgUrl"
            alt=""
            style="padding-left: 5%; padding-right: 5%; width: 70%"
          />
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { setToken } from "@/utils/storage.js";
import {baseURL} from "@/service.js";
export default {
  name: "Login",
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        username: "",
        password: "",
        captcha: "",
      },
      captchaId: "",
      imageUrl: "",
      imgUrl: "",
    };
  },
  methods: {
    VerifyCaptcha() {
      let url = "/verify/" + this.captchaId + "/" + this.formLabelAlign.captcha;
      return this.$axios.get(url).then((res) => {
        if (res == "验证成功") {
          console.log("succ");
          return true;
        } else {
          console.log("err");
          return false;
        }
      });
    },
    Login() {
      if (
        this.formLabelAlign.username == "" ||
        this.formLabelAlign.password == "" ||
        this.formLabelAlign.captcha == ""
      ) {
        return alert("输入为空");
      }
      let loginDto = {
        username: this.formLabelAlign.username,
        password: this.formLabelAlign.password,
      };
      this.VerifyCaptcha().then((ok) => {
        if (!ok) {
          return alert("验证码错误！");
        }
        this.$axios.post("/user/login", loginDto).then((res) => {
          setToken(res.Data.Jwt);
          alert("登录成功！");
        });
      });
    },
    GetCaptcha() {
      return this.$axios.get("/captcha").then((res) => {
        this.captchaId = res.captchaId;
        this.imageUrl = res.imageUrl;
      });
    },
    GetCaptchaPicture() {
      this.GetCaptcha().then(() => {
        this.imgUrl = `${baseURL}/captcha/${this.captchaId}.png`;
      });
    },
  },
  mounted() {
    this.GetCaptchaPicture();
  },
};
</script>

<style scoped>
.top {
  background-color: #000000;
}

.login {
  padding-top: 5%;
  padding-bottom: 5%;
  position: relative;
  top: 15%;
  left: 15%;
  width: 30%;
}

.back {
  margin: 0px;
  padding: 0px;
  background: url("../../assets/mount&blade.jpg") no-repeat;
  background-size: 100%, 100%;
  height: 100vh;
}
</style>