<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    background-color="#000000"
    text-color="#ffffff"
  >
    <el-menu-item index="1">
      <router-link to="/">首页</router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link to="/article/home">博客页</router-link>
    </el-menu-item>
    <el-menu-item index="3" class="menuRight">
      <router-link to="/login">登录</router-link>
    </el-menu-item>
    <el-menu-item index="4" class="menuRight">
      <router-link to="/register">注册</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Navigation",
};
</script>

<style scoped>

.menuRight {
  position: relative;
  left: 80vw;
}
</style>