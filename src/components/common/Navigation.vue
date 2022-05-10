<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    background-color="#000000"
    text-color="#ffffff"
    active-text-color="#ffffff"
    :router="true"
  >
    <el-menu-item index="/">
      <div>首页</div>
    </el-menu-item>
    <el-menu-item @click="turnToArticleHome()">
      <div>{{ isPC ? "Markdown文档" : "文档" }}</div>
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
    <el-menu-item index="/register" class="menuRight" v-show="showLogReg">
      <div>注册</div>
    </el-menu-item>
    <el-menu-item index="/login" class="menuRight" v-show="showLogReg">
      <div>登录</div>
    </el-menu-item>
    <el-menu-item class="menuRight" v-show="!showLogReg" @click="logout()">
      <div>注销</div>
    </el-menu-item>
    <el-menu-item v-if="showInput" class="menuRightInput">
      <el-input
        placeholder="请输入内容 键下回车搜索"
        prefix-icon="el-icon-search"
        v-model="navigationInput"
        size="medium"
        @keyup.enter.native="enterSearch()"
      >
      </el-input>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { setToken, getToken } from "@/utils/storage.js";
export default {
  name: "Navigation",
  data() {
    return {
      navigationInput: "",
      showInput: true,
      isPC: true,
      showLogReg: false,
    };
  },
  watch: {
    $route(n, o) {
      if (n.fullPath !== o.fullPath) {
        //监听路由参数是否变化
        // console.log("change")
        this.getQuery(this.navigationInput);
      }
    },
    showArg(newValue, oldValue) {
      this.showLogReg = newValue;
    }
  },
  props: ["valid", "getQuery", "showArg"],
  methods: {
    tunrToHome() {
      this.$router.push({ name: "homePage" });
    },
    Edit() {
      // console.log("edit")
      this.$router.push({ name: "CreateArticle" });
    },
    enterSearch() {
      // if (this.$route.path === '/article/home') {
      //   // this.getQuery(this.navigationInput)
      //   this.$router.push({name: 'empty', params: {link: '/article/home'}, query: {query: this.navigationInput}})
      // } else {
      //   this.$router.push({name: 'ArticleHome', query: {query: this.navigationInput}})
      // }
      this.$router.push({
        name: "ArticleHome",
        query: { query: this.navigationInput },
      });
    },
    turnToArticleHome() {
      // console.log("test")
      if (this.$route.path != "/article/home") {
        this.$router.push({
          name: "ArticleHome",
          query: { query: this.navigationInput },
        });
      } else {
        // this.getQuery('')
        this.navigationInput = "";
        this.$router.push({ name: "ArticleHome", query: { query: "" } });
      }
    },
    logout() {
      setToken("");
      this.showLogReg = true;
      this.$router.replace({path: "/login"});
    },
  },
  mounted() {
    let token = getToken()
    if (token == "" || token == null || token == undefined) {
      this.showLogReg = true;
    } else {
      this.$axios.get("/user/isLogin").then((res) => {
        // console.log(res)
        if (res.Data.IsLogin === true) {
          this.showLogReg = false;
        } else {
          this.showLogReg = true;
        }
      });
    }
    if (this.valid === false) {
      this.showInput = false;
    } else {
      this.showInput = true;
    }
    if (this.$route.query.query) {
      this.navigationInput = this.$route.query.query;
    }
    if (document.documentElement.clientWidth <= 450) {
      this.isPC = false;
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

@media screen and (max-width: 450px) {
  .menuRightEnd {
    float: right;
    margin: 0;
    padding: 0;
    margin-right: 15px;
  }

  .menuRight {
    float: right;
  }

  .menuRightInput {
    display: none;
  }

  div {
    font-size: 12px;
  }
}
</style>