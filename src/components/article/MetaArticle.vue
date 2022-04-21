<template>
  <el-timeline-item placement="top" color="#0bbd87" size="large">
    <el-card>
      <div style="margin-left: 60px" @click="readArticle()">
        <h4>{{ title }}</h4>
        <p>作者：{{ authorName }}</p>
      </div>
    </el-card>
  </el-timeline-item>
</template>

<script>
export default {
  name: "MetaArticle",
  data() {
    return {};
  },
  props: ["title", "authorName", "id"],
  methods: {
    readArticle() {
      this.$router.push({ name: "article", query: { id: this.id } });
    },
  },
};
</script>

<style scoped>
</style>