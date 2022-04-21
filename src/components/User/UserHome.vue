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
import MetaArticle from "../article/MetaArticle";
import Navigation from "../Common/Navigation";
import { getToken } from "@/utils/storage.js";
export default {
  name: "UserHome",
  components: { Navigation, MetaArticle },
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      totalPage: 1,
      articles: [],
      token: getToken(),
    };
  },
  methods: {
    getMetaArticles() {
      this.$axios.get("/article/all", { params: { pageNum: this.pageNum, pageSize: this.pageSize } }).then((res) => {
        // console.log(res)
        this.articles = res.Data.List
        this.totalPage = res.Data.TotalPage
      })
    },
  },
  mounted() {
    this.getMetaArticles()
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

@media screen and (max-width: 400px) {
  .main {
    margin-top: 50px;
    margin-left: 0px;
    width: 70vw;
  }
}
</style>