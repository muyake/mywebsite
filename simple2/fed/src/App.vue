<template>
  <div id='contenter'>
    <cnode-head v-on:exit="changeLoginStatus" v-bind:username="username" :isLogin="isLogin"></cnode-head>
    <router-view name='main' v-on:login="changeLoginStatus"></router-view>
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
    changeLoginStatus:function(){     
      if(localStorage.getItem('isLogin')=='true'){
         this.isLogin=true;
      }else{
        this.isLogin=false;
      }
      if(localStorage.getItem('username')){
        this.username=localStorage.getItem('username');   
      }  
    },
    userInfo() {          
      var isLogin=  localStorage.getItem('isLogin');
      if(isLogin=='true'){
        this.isLogin=true;
        this.username=localStorage.getItem('username');         
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
  padding: 10px 0;
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
