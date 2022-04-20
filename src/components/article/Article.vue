<template>
  <div class="outer">
    <div class="top">
      <Navigation />
    </div>
    <div class="main">
      <div class="editor">
        <div
          v-for="anchor in titles"
          :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
          @click="handleAnchorClick(anchor)"
        >
          <a style="cursor: pointer">{{ anchor.title }}</a>
        </div>
        <v-md-preview :text="text"></v-md-preview>
      </div>
      <div class="meta">
        标题: {{title}}<br/>
        作者: {{authorName}}
        <el-backtop :bottom="backBottom" :right="backRight" ></el-backtop>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "../common/Navigation.vue";
export default {
  name: "Article",
  components: {Navigation},
  data() {
    return {
      backBottom: 320,
      backRight: 225,
      articleId: -1,
      authorId: -1,
      title: "题目",
      text: `
# heading 1
contentcontentcontent
contentcontentcontent
contentcontentcontent
contentcontentcontent
contentcontentcontent

## heading 2
contentcontentcontent
contentcontentcontent
contentcontentcontent
contentcontentcontent
contentcontentcontent

### heading 3
contentcontentcontent
contentcontentcontent
contentcontentcontent
contentcontentcontent
contentcontentcontent

## heading 2
contentcontentcontent
contentcontentcontent
contentcontentcontent
contentcontentcontent
contentcontentcontent

### heading 3
contentcontentcontent
contentcontentcontent
contentcontentcontent
contentcontentcontent
contentcontentcontent
`,
      authorName: "作者用户名",
      titles: [],
    }
  },
  methods: {
    turnToAuthor() {
    },
    getArticle(articleId){
      return this.$axios.get("/article/", {params: {id: articleId}}).then((res) => {
        // console.log(res)
        if (res.Code != 1) {
          if (res.Code == 105) {
            alert("请重新登录")
            return
          }
          alert("加载文章出错")
          return
        }
        this.articleId = res.Data.Article.Id
        this.title = res.Data.Article.Title
        this.text = res.Data.Article.Content
        this.authorId = res.Data.Article.AuthorId
        this.authorName = res.Data.AuthorName
      })
    },
    handleAnchorClick(anchor) {
      const { preview } = this.$refs;
      const { lineIndex } = anchor;

      const heading = preview.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);

      if (heading) {
        preview.scrollToTarget({
          target: heading,
          scrollContainer: window,
          top: 60,
        });
      }
    },
  },
  mounted() {
    // this.getArticle(17).then(() => {
    //   const anchors = this.$refs.preview.$el.querySelectorAll('h1,h2,h3,h4,h5,h6');
    //   const titles = Array.from(anchors).filter((title) => !!title.innerText.trim());
  
    //   if (!titles.length) {
    //     this.titles = [];
    //     return;
    //   }
  
    //   const hTags = Array.from(new Set(titles.map((title) => title.tagName))).sort();
  
    //   this.titles = titles.map((el) => ({
    //     title: el.innerText,
    //     lineIndex: el.getAttribute('data-v-md-line'),
    //     indent: hTags.indexOf(el.tagName),
    //   }));

    // })
    console.log(this.$refs)
    const anchors = this.$refs.preview.$el.querySelectorAll('h1,h2,h3,h4,h5,h6');
      const titles = Array.from(anchors).filter((title) => !!title.innerText.trim());
  
      if (!titles.length) {
        this.titles = [];
        return;
      }
  
      const hTags = Array.from(new Set(titles.map((title) => title.tagName))).sort();
  
      this.titles = titles.map((el) => ({
        title: el.innerText,
        lineIndex: el.getAttribute('data-v-md-line'),
        indent: hTags.indexOf(el.tagName),
      }));
  },
};
</script>

<style scoped>

.outor {
  overflow-y: scroll
}

.editor {
  float: left;
  width: 70vw;
  border-right: 1px solid black;
}

/* .main {
  overflow-y: scroll
} */

.meta {
  position: fixed;
  left: 75vw;
  padding-top: 50px;
  padding-bottom: 50px;
  line-height: 50px;
  top: 20vh;
  width: 15vw;
  border: 1px solid black;
  font-size: 25px;
}
</style>