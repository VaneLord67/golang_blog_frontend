<template>
  <div class="outer">
    <div class="top">
      <Navigation />
    </div>
    <div class="back">
      <div class="login">
        <h1>登录</h1>
        <el-form :label-position="labelPosition" label-width="60px" :model="formLabelAlign">
          <el-form-item label="" style="padding-right: 10%">
            <el-input size="large" v-model="formLabelAlign.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="" style="padding-right: 10%">
            <el-input size="large" v-model="formLabelAlign.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="" style="padding-right: 10%">
            <el-input size="large" v-model="formLabelAlign.captcha" placeholder="请输入验证码"></el-input>
          </el-form-item>
          <el-button type="success" @click="Login()" class="loginBtn">登录</el-button>
          <el-button type="primary" @click="GetCaptchaPicture()">刷新验证码</el-button>

          <a href="https://github.com/login/oauth/authorize?client_id=cb6be1dcec6958e30b1d">
            <el-tooltip class="item" effect="dark" content="使用Github账号登录" placement="right">
              <img src="../../assets/github.png" style="height: 50px; width: 50px; float: right" />
            </el-tooltip>
          </a>

          <img :src="imgUrl" alt="" style="padding-left: 5%; padding-right: 5%; width: 70%" />
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { setToken } from "@/utils/storage.js";
import { baseURL } from "@/service.js";
import { nanoid } from "nanoid";
import Navigation from "../common/Navigation.vue";
export default {
  name: "Login",
  components: {
    Navigation,
  },
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
      nanoid: "",
    };
  },
  methods: {
    VerifyCaptcha() {
      let url = "/verify/" + this.captchaId + "/" + this.formLabelAlign.captcha;
      return this.$axios
        .get(url, { params: { nanoid: this.nanoid } })
        .then((res) => {
          if (res == "验证成功") {
            // console.log("succ");
            return true;
          } else {
            // console.log("err");
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
        captchaId: this.captchaId,
        value: this.formLabelAlign.captcha,
        nanoId: this.nanoid,
      };
      this.$axios.post("/user/login", loginDto).then((res) => {
        if (res && res.Code == 108) {
          this.$message({
            type: "warning",
            message: "验证码错误!",
          });
          this.formLabelAlign.captcha = "";
          this.GetCaptchaPicture();
          return;
        }
        let jwt = res.Data;
        if (!jwt) {
          this.$message({
            type: "error",
            message: "账号或密码错误!",
          });
          this.formLabelAlign.username = "";
          this.formLabelAlign.password = "";
          this.formLabelAlign.captcha = "";
          this.GetCaptchaPicture();
          return;
        }
        setToken(res.Data.Jwt);
        this.$message({
          type: "success",
          message: "登录成功!",
        });
        this.$router.push({ path: "/user/home" });
      });
    },
    GetCaptcha() {
      this.nanoid = nanoid();
      return this.$axios
        .get("/captcha", {
          params: {
            nanoid: this.nanoid,
          },
        })
        .then((res) => {
          this.captchaId = res.captchaId;
          this.imageUrl = res.imageUrl;
        });
    },
    GetCaptchaPicture() {
      this.GetCaptcha().then(() => {
        this.imgUrl = `${baseURL}/captcha/${this.captchaId}.png?nanoid=${this.nanoid}`;
      });
    },
  },
  mounted() {
    this.GetCaptchaPicture();
  },
};
</script>

<style scoped>
.outer {
  height: 100vh;
  overflow-y: hidden;
}

.top {
  background-color: #000000;
  height: 50px;
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
  background: url("../../assets/mount&blade.jpg") no-repeat;
  height: calc(100% - 50px);
  background-size: 100% 100%;
}

.loginBtn {
  margin-left: 10px;
}

@media screen and (max-width: 980px) {
  .back {
    background: none;
  }

  .login {
    padding-top: 5%;
    padding-bottom: 5%;
    position: relative;
    top: 25%;
    /* left: 15%; */
    width: 70%;
  }
}

@media screen and (max-width: 500px) {
  .login {
    width: 50%;
  }
}

@media screen and (max-width: 400px) {
  .login {
    padding: 0;
    margin: 0;
    width: 90vw;
    position: absolute;
    top: 31vh;
    left: 0;
    right: 0;
    margin: auto;
  }
}
</style>