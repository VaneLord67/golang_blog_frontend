<template>
  <div class="outer">
    <Navigation :valid=false />
    <div class="background" @keyup.enter="enterSearch()">
        <div class="input">
        <div class="search">Search</div>
        <el-input
            placeholder="请输入内容 键下回车搜索"
            prefix-icon="el-icon-search"
            v-model="inputText"
        >
        </el-input>
        </div>
    </div>
  </div>
</template>

<script>
import Navigation from '../Common/Navigation';
export default {
  name: "HomePage",
  components: {
      Navigation
  },
  data() {
      return {
          inputText: "",
      }
  },
  methods: {
    enterSearch() {
      // console.log("enter search")
      // if (this.inputText == '') return
      this.$router.push({name: 'ArticleHome', query: {query: this.inputText}})
    }
  },
};
</script>

<style scoped>
.outer {
    height: 100vh;
    overflow-y: hidden;
}

.search {
    color: black;
}

.background {
  background: url("../../assets/HomePageBG.jpeg") no-repeat;
  background-size: 100% 100%;
  height: 100vh;
}  

.input {
  font-size: 50px;
  padding-top: 20vh;
  padding-left: 15vw;
  padding-right : 48vw;
}

</style>