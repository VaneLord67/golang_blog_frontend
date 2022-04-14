<template>
  <div class="Login">
      
    <el-form
      :label-position="labelPosition"
      label-width="60px"
      :model="formLabelAlign"
    >
      <el-form-item label="用户名">
        <el-input v-model="formLabelAlign.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formLabelAlign.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="formLabelAlign.captcha" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-button type="primary" @click="Login()">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
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
    };
  },
  methods:{
      Login() {
        //   axios.get()
      }
  }
}
</script>

<style scoped>
.Login {
    /* margin-right: 50px; */
    /* margin-left: 600px; */
    margin-left: 60%;
    margin-top: 10%;
    width: 30%;
}

</style>