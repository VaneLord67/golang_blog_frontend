<template>
  <div class="outer">
    <div class="top">
      <Navigation />
    </div>
    <div class="main">
      <div class="editor">
        <v-md-editor
          :class="editorClass"
          mode=""
          :left-toolbar="leftToolbar"
          :right-toolbar="rightToolbar"
          v-model="text"
          :include-level="[1, 3]"
          :default-show-toc="showToc"
          @save="UpdateContent()"
        />
      </div>
      <div class="meta">
        标题: {{ title }}<br /><br />
        作者: {{ authorName }}
        <el-backtop :bottom="backBottom" :right="backRight">UP</el-backtop>
      </div>
      <div class="tools" v-if="permission">
        <el-tooltip
          class="item"
          effect="dark"
          content="编辑该Markdown文档"
          placement="left-start"
        >
          <el-button
            @click="Update()"
            type="primary"
            icon="el-icon-edit"
            circle
          ></el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="删除该Markdown文档"
          placement="right-start"
        >
          <el-button
            @click="Delete()"
            type="danger"
            icon="el-icon-delete"
            circle
          ></el-button>
        </el-tooltip>
        <br />
        <!-- <br/> -->
        <el-tooltip
          class="item"
          effect="dark"
          content="更新标题"
          placement="left-end"
          style="margin-top: 10px"
        >
          <el-button
            @click="UpdateTitle()"
            type="warning"
            icon="el-icon-upload2"
            circle
          ></el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="预览"
          placement="right-end"
        >
          <el-button
            @click="Preview()"
            type="success"
            icon="el-icon-view"
            circle
          ></el-button>
        </el-tooltip>
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
      backBottom: 50,
      backRight: 350,
      articleId: -1,
      authorId: -1,
      title: "",
      // text: '# Hello!\n# Hello!\n ',
      text: "",
      authorName: "",
      titles: [],
      editorClass: "magicHidden",
      leftToolbar: "",
      rightToolbar: "toc",
      permission: false,
    };
  },
  methods: {
    turnToAuthor() {},
    getArticle(articleId) {
      return this.$axios
        .get("/article/", { params: { id: articleId } })
        .then((res) => {
          // console.log(res)
          // console.log(res.Code)
          if (res && res.Code != 1) {
            this.$message({
              type: "error",
              message: res.Message,
            });
            return;
          }
          this.articleId = res.Data.Article.Id;
          this.title = res.Data.Article.Title;
          this.text = res.Data.Article.Content;
          this.authorId = res.Data.Article.AuthorId;
          this.authorName = res.Data.AuthorName;
        });
    },
    Delete() {
      this.$confirm("此操作将永久删除该文档, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .delete("/article/", { params: { id: this.articleId } })
            .then((res) => {
              // console.log(res)
              if (res.Code != 1) {
                this.$message({
                  type: "error",
                  message: res.Message,
                });
                return;
              }
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.$router.push({ path: "/user/home" });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    Update() {
      this.editorClass = "";
      this.leftToolbar =
        "undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code | save";
      this.rightToolbar = "preview toc sync-scroll fullscreen";
    },
    Preview() {
      this.editorClass = "magicHidden";
      this.leftToolbar = "";
      this.rightToolbar = "toc";
    },
    UpdateTitle() {
      this.$prompt("请输入新标题", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: this.title,
      })
        .then(({ value }) => {
          let dto = { title: value, articleId: this.articleId };
          this.$axios.post("/article/title", dto).then((res) => {
            //   console.log(res);
            if (res.Code != 1) {
              this.$message({
                type: "error",
                message: res.Message,
              });
              return;
            }
            this.$message({
              type: "success",
              message: "更新成功",
            });
            this.title = value;
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消更新标题",
          });
        });
    },
    GetPermission() {
      this.$axios
        .get("/article/permission", { params: { articleId: this.articleId } })
        .then((res) => {
          // console.log(res);
          // console.log("articleId = " + this.articleId)
          if (res.Code != 1) {
            this.$message({
              type: "warning",
              message: "获取权限异常",
            });
          }
          this.permission = res.Data;
        });
    },
    UpdateContent() {
      let dto = { articleId: this.articleId, content: this.text };
      this.$axios.post("/article/content", dto).then((res) => {
        // console.log(res)
        if (res.Code != 1) {
          this.$message({
            type: "warning",
            message: res.Message,
          });
          return;
        }
        this.$message({
          type: "success",
          message: "更新文档内容成功",
        });
      });
    },
  },
  mounted() {
    this.articleId = this.$route.query.id;
    if (this.$route.query.valid) {
      this.GetPermission();
    }
    this.getArticle(this.$route.query.id);
    // this.getArticle(17);
  },
};
</script>

<style>
.magicHidden
  .v-md-editor__right-area
  .v-md-editor__main
  .v-md-editor__editor-wrapper {
  display: none;
}
</style>

<style scoped>
.editor {
  float: left;
  text-align: left;
  width: 70vw;
  margin-left: 38px;
}

.tools {
  float: right;
  position: fixed;
  left: 75vw;
  padding-top: 50px;
  padding-bottom: 50px;
  top: 55vh;
  width: 15vw;
  font-size: 25px;
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