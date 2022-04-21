<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    background-color="#000000"
    text-color="#ffffff"
    :router=true
  >
    <el-menu-item index="/" >
      <div>首页</div>
    </el-menu-item>
    <el-menu-item index="/article/home">
      <div>博客页</div>
    </el-menu-item>
    <el-menu-item index="/user/home" class="menuRight">
      <div class="el-icon-user-solid"></div>
    </el-menu-item>
    <el-menu-item index="/register" class="menuRight">
      <div>注册</div>
    </el-menu-item>
    <el-menu-item index="/login" class="menuRight">
      <div>登录</div>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Navigation",
  methods: {
    tunrToHome() {
      this.$router.push({name: 'homePage'})
    }
  },
};
</script>

<style scoped>

.menuRight {
  float: right;
}
</style>