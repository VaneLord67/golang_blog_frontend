<template>
  <div class="outer">
    <Navigation/>
    <div class="background">
        <div class="input">
        <div class="search">Search</div>
        <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="inputText"
        >
        </el-input>
        </div>
    </div>
  </div>
</template>

<script>
import Navigation from '../common/Navigation.vue';
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
  methods: {},
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

::v-deep .el-input__inner{
          height: 55px;
        }
</style>