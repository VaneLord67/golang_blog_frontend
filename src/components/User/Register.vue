<template>
  <div class="outer">
    <div class="top">
      <Navigation />
    </div>
    <div class="back">
      <div class="login">
        <h1>注册</h1>
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
              show-password
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
          <el-button type="success" @click="Register()" class="loginBtn"
            >注册</el-button
          >
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
import { baseURL } from "@/service.js";
import { nanoid } from "nanoid";
import Navigation from "../Common/Navigation";
export default {
  name: "Register",
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
            return true;
          } else {
            return false;
          }
        });
    },
    Register() {
      if (
        this.formLabelAlign.username == "" ||
        this.formLabelAlign.password == "" ||
        this.formLabelAlign.captcha == ""
      ) {
        this.$message({
          type: "warning",
          message: "输入为空!",
        });
        return;
      }
      let registerDto = {
        username: this.formLabelAlign.username,
        password: this.formLabelAlign.password,
        captchaId: this.captchaId,
        value: this.formLabelAlign.captcha,
        nanoId: this.nanoid,
      };
      this.$axios.post("/user/register", registerDto).then((res) => {
        // console.log(res);
        let r = res.Code;
        if (r != 1) {
          if (r == 103) {
            this.$message({
              type: "warning",
              message: "该用户已被注册!",
            });
          } else if (r == 108) {
            this.$message({
              type: "warning",
              message: "验证码错误!",
            });
          } else {
            this.$message({
              type: "error",
              message: "注册失败!",
            });
          }
          this.formLabelAlign.username = "";
          this.formLabelAlign.password = "";
          this.formLabelAlign.captcha = "";
          this.GetCaptchaPicture();
          return;
        }
        this.$message({
          type: "success",
          message: "注册成功!",
        });
        setToken(res.Data.Jwt);
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
    padding-left: 0;
    padding-right: 0;
    padding-top: 31vh;
    width: 80vw;
    margin: auto;
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