<template>
  <div class="outer">
    <Navigation :valid="false" />
    <div class="background" @keyup.enter="enterSearch()">
      <div class="input">
        <div class="search">Search</div>
        <el-input placeholder="请输入内容 键下回车搜索" prefix-icon="el-icon-search" v-model="inputText">
        </el-input>
      </div>
      <el-tooltip class="item" effect="dark" content="友情链接~" placement="right-end">
        <a class="op" href="https://novel.tomsawyer2.xyz/" target="_blank"> </a>
      </el-tooltip>
    </div>
    <div class="footer">
      <div style="margin:0 auto; padding:10px 0;">
        <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502050225" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
          <img src="../../../public/备案图标.png" style="float:left;"/>
          <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">京公网安备 11010502050225号 
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a href="https://beian.miit.gov.cn/" target="_blank">京ICP备2022021219号-1</a>&nbsp;&nbsp;&nbsp;&nbsp;
            <i class="el-icon-chat-dot-round"></i>
            联系我: <a href="mailto:HUSTerD724@gmail.com">HUSTerD724@gmail.com</a>
          </p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "../common/Navigation.vue";
export default {
  name: "HomePage",
  components: {
    Navigation,
  },
  data() {
    return {
      inputText: "",
    };
  },
  methods: {
    enterSearch() {
      // console.log("enter search")
      // if (this.inputText == '') return
      this.$router.push({
        name: "ArticleHome",
        query: { query: this.inputText },
      });
    },
  },
};
</script>

<style scoped>
a {
  color: gray;
}

.footer {
  position: absolute;
  width: 100%;
  /* height: 30px; */
  bottom: 0px;
  text-align: center;
  background-color: black;
  color: gray;
}

.op {
  width: 80px;
  height: 80px;
  background: url(https://blog.tomsawyer2.xyz/pics/myAvatar.jpg) no-repeat;
  background-size: cover;
  border-radius: 50%;
  position: absolute;
  left: 68%;
  top: 65%;
  cursor: pointer;
}

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
  padding-right: 48vw;
}

@media screen and (max-width: 450px) {
  .background {
    background: none;
  }

  .op {
    display: none;
  }

  .input {
    padding-left: 0;
    padding-right: 0;
    padding-top: 31vh;
    width: 80vw;
    margin: auto;
  }

}
</style>