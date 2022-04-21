<template>
  <div class="outer">
    <Navigation />
    <el-timeline class="main">
      <h2>Markdown文档</h2>
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
import Navigation from "../Common/Navigation";
import MetaArticle from '../article/MetaArticle'
export default {
  name: "ArticleHome",
  components: { Navigation, MetaArticle},
  data() {
    return {
      pageSize: 5,
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
          // console.log(res)
          this.articles = res.Data.VoList
          this.totalPage = res.Data.TotalPage
        });
    },
    changePage(currentNum) {
      this.pageNum = currentNum
      this.search(this.$route.query.query)
    }
  },
  mounted() {
    // console.log(this.$route.query.query)
    this.search(this.$route.query.query)
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