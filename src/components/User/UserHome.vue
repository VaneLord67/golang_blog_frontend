<template>
  <div class="outer">
    <Navigation />
    <div class="side"></div>
    <div class="background"></div>
    <el-timeline class="main">
      <div class="head">我的Mardown文档列表</div>
      <el-empty
        v-if="!articles"
        class="empty"
        description="还没有写过文档哦~"
      ></el-empty>
      <MetaArticle
        v-for="article in articles"
        :key="article.Id"
        :title="article.Title"
        :id="article.Id"
        :authorName="article.AuthorName"
      />
    </el-timeline>
    <el-pagination
      class="page"
      background
      layout="prev, pager, next"
      :page-count="totalPage"
      :current-page="pageNum"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
import MetaArticle from "../article/MetaArticle";
import Navigation from "../Common/Navigation";
import { getToken, setToken } from "@/utils/storage.js";
export default {
  name: "UserHome",
  components: { Navigation, MetaArticle },
  data() {
    return {
      pageNum: 1,
      pageSize: 3,
      totalPage: 1,
      articles: [],
      token: getToken(),
    };
  },
  methods: {
    getMetaArticles() {
      this.$axios
        .get("/article/all", {
          params: { pageNum: this.pageNum, pageSize: this.pageSize },
        })
        .then((res) => {
          // console.log(res)
          if (res) {
            this.articles = res.Data.List;
            this.totalPage = res.Data.TotalPage;
          }
        });
    },
    Edit() {
      // console.log("edit")
      this.$router.push({ name: "CreateArticle" });
    },
    changePage(currentNum) {
      // console.log("changePage")
      // console.log(this.pageNum)
      this.pageNum = currentNum;
      this.getMetaArticles();
    },
  },
  mounted() {
    if (this.$route.query.code) {
      const loading = this.$loading({
        lock: true,
        text: "正在读取Github用户信息",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let dto = {
        code: this.$route.query.code,
      };
      this.$axios
        .post("/user/github", dto, { timeout: 10000 })
        .then((res) => {
          console.log(res);
          if (res && res.Code != 1 && !res.Data.Jwt) {
            if (res.Code === 110) {
              this.$message({
                type: "warning",
                message: "该Github账号未绑定本站账号",
              });
              loading.close()
              return;
            }
            this.$message({
              type: "error",
              message: res.Message,
            });
            loading.close()
            return;
          }
          setToken(res.Data.Jwt);
          this.$message({
            type: "success",
            message: "登录成功!",
          });
          loading.close();
          this.getMetaArticles();
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "连接Github失败,请重试",
          });
          loading.close();
          this.$router.replace({
            path: "/login",
          });
        });
    } else {
      this.getMetaArticles();
    }
  },
};
</script>

<style scoped>
.empty {
  height: 60vh;
}

.main {
  margin-top: 19px;
  width: 400px;
  margin-left: 30%;
  text-align: left;
  position: absolute;
  top: 60px;
}

.background {
  background: url("../../assets/articleBg.jpg") no-repeat;
  background-size: 100% 100%;
  height: calc(100vh - 61px);
  width: 100%;
  filter: blur(2px);
  position: absolute;
  left: -1px;
  top: 60px;
}

.side {
  float: right;
  position: relative;
  top: 100px;
  right: 200px;
}

.page {
  position: fixed;
  left: 65vw;
  padding-top: 50px;
  padding-bottom: 50px;
  line-height: 50px;
  top: 80vh;
  width: 15vw;
}

.head {
  font-weight: bold;
  font-size: 30px;
  padding-bottom: 10px;
}

@media screen and (max-width: 450px) {
  .main {
    margin-top: 50px;
    margin-left: 0px;
    width: 70vw;
  }

  .background {
    background: none;
    background-size: auto;
    height: auto;
    filter: none;
  }

  .head {
    font-size: 6vw;
  }

  .page {
    position: fixed;
    left: 29vw;
    top: 80vh;
  }
}
</style>