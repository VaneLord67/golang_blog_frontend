<template>
  <div class="outer">
    <div class="top">
      <Navigation />
    </div>
    <div class="main">
      <div class="editor">
        <v-md-editor
          mode="preview"
          left-toolbar=""
          right-toolbar="preview toc sync-scroll fullscreen"
          v-model="text"
          :include-level="[1, 3]"
          :default-show-toc="showToc"
        />
      </div>
      <div class="meta">
        标题: {{ title }}<br/><br/>
        作者: {{ authorName }}
        <el-backtop :bottom="backBottom" :right="backRight"></el-backtop>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "../Common/Navigation";
export default {
  name: "Article",
  components: { Navigation },
  data() {
    return {
      showToc: true,
      backBottom: 320,
      backRight: 225,
      articleId: -1,
      authorId: -1,
      title: "题目",
      text: '# Hello!',
      authorName: "作者用户名",
      titles: [],
    };
  },
  methods: {
    turnToAuthor() {},
    getArticle(articleId) {
      return this.$axios
        .get("/article/", { params: { id: articleId } })
        .then((res) => {
          // console.log(res)
          if (res.Code != 1) {
            if (res.Code == 105) {
              alert("请重新登录");
              this.$router.push({path: '/login'})
              return;
            }
            alert("加载文章出错");
            return;
          }
          this.articleId = res.Data.Article.Id;
          this.title = res.Data.Article.Title;
          this.text = res.Data.Article.Content;
          this.authorId = res.Data.Article.AuthorId;
          this.authorName = res.Data.AuthorName;

          this.text = "[[toc]] \n" + this.text
        });
    },
  },
  mounted() {
    this.getArticle(this.$route.query.id);
  },
};
</script>

<style scoped>

.editor {
  float: left;
  text-align: left;
  width: 70vw;
  /* border-right: 1px solid black; */
}

.meta {
  position: fixed;
  left: 75vw;
  padding-top: 50px;
  padding-bottom: 50px;
  line-height: 50px;
  top: 20vh;
  width: 15vw;
  border-left: 1px solid black;
  font-size: 25px;
}
</style>