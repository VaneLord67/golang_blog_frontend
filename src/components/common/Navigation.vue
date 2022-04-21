<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    background-color="#000000"
    text-color="#ffffff"
    :router="true"
  >
    <el-menu-item index="/">
      <div>首页</div>
    </el-menu-item>
    <el-menu-item index="/article/home">
      <div>博客页</div>
    </el-menu-item>
    <el-menu-item index="/user/home" class="menuRightEnd">
      <el-tooltip
        class="item"
        effect="dark"
        content="个人文档页面"
        placement="bottom"
      >
        <el-button type="text" class="el-icon-user-solid"></el-button>
      </el-tooltip>
    </el-menu-item>
    <el-menu-item class="menuRight">
      <el-tooltip
        class="item"
        effect="dark"
        content="在线创建一篇Markdown文档"
        placement="top"
      >
        <el-button
          type="text"
          icon="el-icon-edit"
          @click="Edit()"
          color="red"
        ></el-button>
      </el-tooltip>
    </el-menu-item>
    <el-menu-item index="/register" class="menuRight">
      <div>注册</div>
    </el-menu-item>
    <el-menu-item index="/login" class="menuRight">
      <div>登录</div>
    </el-menu-item>
    <el-menu-item v-if="showInput" class="menuRightInput">
      <el-input
        placeholder="请输入内容 键下回车搜索"
        prefix-icon="el-icon-search"
        v-model="navigationInput"
        size="medium"
      >
      </el-input>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      navigationInput: "",
      showInput: true,
    };
  },
  props: ["valid"],
  methods: {
    tunrToHome() {
      this.$router.push({ name: "homePage" });
    },
    Edit() {
      // console.log("edit")
      this.$router.push({ name: "CreateArticle" });
    },
  },
  mounted() {
    if (this.valid === false) {
      this.showInput = false;
    } else {
      this.showInput = true;
    }
  },
};
</script>

<style scoped>
.menuRightEnd {
  float: right;
  margin-right: 30px;
}
.menuRightInput {
  float: right;
}
.menuRight {
  float: right;
  /* padding-right: 2px; */
}
</style>