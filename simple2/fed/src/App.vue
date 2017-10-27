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
      id:'111',    
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
      //  this.$http({
      //   url: '/api/users/getUserInfo',
      //   method: 'get',       
      // }).then((res) => {
      //   this.isLogin = res.isLogin;
      //   if(this.isLogin){
      //       this.username= res.userinfo.name;
      //       this.id= res.userinfo.id;
      //   }else{
      //      this.$router.push('/login');
      //   }
      // }).catch((res) => {
      //   console.log('登录信息请求错误 ', res);
      // });
      var isLogin=  localStorage.getItem('isLogin');
      if(isLogin=='true'){
        this.$router.push('/');
      }else{
        this.$router.push('/login');
      }
    }
  },
};

</script>
<style>
#contenter {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  width: 1300px;
  margin:0 auto;
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
