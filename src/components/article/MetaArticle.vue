<template>
  <el-timeline-item placement="top" color="#0bbd87" size="large">
    <el-card class="metaArticle">
      <div style="margin-left: 60px; cursor:pointer;" @click="readArticle()">
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
      this.$router.push({ name: "article", query: { id: this.id, valid: true } });
    },
  },
};
</script>

<style scoped>

</style>