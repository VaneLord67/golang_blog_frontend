<template>
  <div class="outer">
    <Navigation />
    <div class="side">
    </div>
    <div class="background"></div>
    <el-timeline class="main">
      <div style="font-weight: bold; font-size: 30px; padding-bottom: 10px">
        我的Mardown文档列表
      </div>
      <el-empty v-if="!articles" class="empty" description="还没有写过文档哦~"></el-empty>
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

@media screen and (max-width: 400px) {
  .main {
    margin-top: 50px;
    margin-left: 0px;
    width: 70vw;
  }
}
</style>