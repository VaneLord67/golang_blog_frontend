<template>
  <div class="outer">
    <Navigation />
    <el-timeline class="main">
      <MetaArticle
        v-for="article in articles"
        :key="article.Id"
        :title="article.Title"
        :id="article.Id"
        :authorName="article.AuthorName"
      />
    </el-timeline>
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
      pageSize: 10,
      pageNum: 1,
      totalPage: 1,
      articles: [],
    };
  },
  // props: ["query"],
  methods: {
    search(query) {
      this.$axios
        .get("/article/search", {
          params: {
            pageSize: this.pageSize,
            pageNum: this.pageNum,
            query: this.$route.query.query,
          },
        })
        .then((res) => {
          // console.log(res)
          this.articles = res.Data
        });
    },
  },
  mounted() {
    // console.log(this.$route.query)
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
</style>