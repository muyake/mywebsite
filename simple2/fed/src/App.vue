<template>
  <div id='contenter'>
    <cnode-head v-bind:username="username" :isLogin="isLogin"></cnode-head>
    <router-view name='main'></router-view>
    <router-view name='side' ref='child'></router-view>
  </div>
</template>
<script>
import cnodeHead from './components/header';
export default {
  name: 'app',
  data() {
    return {
      isLogin: false,
      username: '',
    };
  },
  components: {
    cnodeHead,
  },
  watch: {
    // authorName(val) {
    //     this.$refs.child.name = val;
    // },
  },
  created() {
    this.userInfo();
  },
  methods: {
    userInfo() { 
       this.$http({
        url: 'http://localhost:881/users/getUserInfo',
        method: 'get',       
      }).then((res) => {
        this.isLogin = res.isLogin;
        if(this.isLogin){
            this.username= res.userinfo.name;
            this.id= res.userinfo.id;
        }
      }).catch((res) => {
        console.log('登录信息请求错误 ', res);
      });
    }
  },
};

</script>
<style>
#contenter {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 6rem;
  display: flex;
  justify-content: space-around;
  font-size: 22px;
  word-break: break-all;
}

body,
div,
span,
a,
p,
ul,
li {
  margin: 0;
  padding: 0;
}

</style>
