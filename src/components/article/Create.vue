<template>
  <div class="outer">
    <Navigation />
    <div class="createEditor">
      <v-md-editor v-model="text" :include-level="[1,   3]" height="91vh" @save="Save()" />
    </div>
  </div>
</template>

<script>
import Navigation from "../common/Navigation.vue";
export default {
  name: "Create",
  components: { Navigation },
  data() {
    return {
      text: "",
      title: "",
    };
  },
  methods: {
    GetPermission() {
      this.$axios.get("/user/isLogin").then((res) => {
        // console.log(res.Data);
        if (res.Data.IsLogin === false) {
          this.$message({
            type: "warning",
            message: "请登录",
          });
          this.$router.replace({
            path: "/login",
          });
        }
      });
    },
    Save() {
      this.$prompt("请输入标题", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true,
      })
        .then(({ value }) => {
          this.title = value;
          let putDto = { title: this.title, content: this.text };
          this.$axios.put("/article/", putDto).then((res) => {
            //   console.log(res);
            if (res.Code != 1) {
              this.$message({
                type: "error",
                message: "创建异常",
              });
              return;
            }
            this.$message({
              type: "success",
              message: "创建成功",
            });
            this.$router.push({ path: "/user/home" });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消创建",
          });
        });
    },
  },
  mounted() {
    this.GetPermission();
    let _this = this;
    window.onbeforeunload = function (e) {
      if (_this.$route.name == "CreateArticle") {
        e = e || window.event;
        // 兼容IE8和Firefox 4之前的版本
        if (e) {
          e.returnValue = "";
        }
        // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
        return "";
      } else {
        window.onbeforeunload = null;
      }
    };
  },
};
</script>

<style scoped>
.createEditor {
  /* position: relative;
  width: 95%;
  left: 2.5%; */
  text-align: left;
}
</style>

<style>
@media screen and (max-width: 750px) {
  .el-message-box {
    width: 60% !important;
  }
}
</style>