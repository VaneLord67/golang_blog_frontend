<template>
  <div class="outer">
    <Navigation :getQuery="getQuery" />
    <div class="background"></div>
    <el-timeline class="main">
      <div style="font-weight: bold; font-size: 33px; padding-bottom: 10px">
        Markdown文档
      </div>
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
import Navigation from "../Common/Navigation";
import MetaArticle from "../article/MetaArticle";
export default {
  name: "ArticleHome",
  components: { Navigation, MetaArticle },
  data() {
    return {
      pageSize: 3,
      pageNum: 1,
      totalPage: 1,
      articles: [],
    };
  },
  methods: {
    search(query) {
      this.$axios
        .get("/article/search", {
          params: {
            pageSize: this.pageSize,
            pageNum: this.pageNum,
            query: query,
          },
        })
        .then((res) => {
          // console.log(res.Data.VoList)
          if (!res.Data.VoList) {
            this.articles = [];
            this.totalPage = 1;
            this.$message({
              type: "warning",
              message: "没有搜到结果~",
            });
            return;
          } else {
            this.articles = res.Data.VoList;
            this.totalPage = res.Data.TotalPage;
          }
        });
    },
    changePage(currentNum) {
      this.pageNum = currentNum;
      this.search(this.$route.query.query);
    },
    getQuery(query) {
      // let targetURL = `/article/home?query=${query}`
      // window.history.pushState('', '', targetURL);
      this.search(query);
    },
  },
  mounted() {
    // console.log(this.$route.query.query)
    this.search(this.$route.query.query);
  },
};
</script>

<style scoped>
.background {
  background: url("../../assets/articleBg.jpg") no-repeat;
  background-size: 100% 100%;
  height: calc(100vh - 61px);
  width: 100%;
  filter: blur(2px);
}

.main {
  margin-top: 20px;
  width: 400px;
  margin-left: 30%;
  text-align: left;
  position: absolute;
  top: 60px;
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
</style>