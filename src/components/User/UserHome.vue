<template>
  <div class="outer">
    <Navigation />
    <div class="side">
    </div>
    <el-timeline class="main">
      <h2>我的Markdown文档列表</h2>
      <MetaArticle
        v-for="article in articles"
        :key="article.Id"
        :title="article.Title"
        :id="article.Id"
        :authorName="article.AuthorName"
      />
    </el-timeline>
    <el-pagination class="page" background layout="prev, pager, next" :page-count="totalPage" :current-page="pageNum" @current-change="changePage">
    </el-pagination>
  </div>
</template>

<script>
import MetaArticle from "../article/MetaArticle";
import Navigation from "../Common/Navigation";
import { getToken } from "@/utils/storage.js";
export default {
  name: "UserHome",
  components: { Navigation, MetaArticle },
  data() {
    return {
      pageNum: 1,
      pageSize: 5,
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
      this.pageNum = currentNum
      this.getMetaArticles()
    },
  },
  mounted() {
    this.getMetaArticles();
  },
};
</script>

<style scoped>
.main {
  margin-top: 50px;
  width: 400px;
  margin-left: 30%;
  text-align: left;
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

@media screen and (max-width: 400px) {
  .main {
    margin-top: 50px;
    margin-left: 0px;
    width: 70vw;
  }
}
</style>