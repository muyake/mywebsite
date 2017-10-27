<template>
  <div class="form-horizontal">
    <fieldset>
      <legend> 登录</legend>
      <div class="control-group" v-bind:class="{error:!noUserNameError}">
        <label for="username" class="control-label">用户名</label>
        <div class="controls">
          <input id="username" name="username" type="text" v-model="username" class="input-xlarge">
          <p id="name-alert" class="help-block" v-bind:class="{displayNONE:noUserNameError}">{{userNameError}}</p>
        </div>
      </div>
      <div class="control-group" v-bind:class="{error:!noPasswordError}">
        <label for="password" class="control-label">密码</label>
        <div class="controls">
          <input id="password" name="password" v-model="password" type="password" class="input-xlarge">
          <p id="pw-alert" class="help-block" v-bind:class="{displayNONE:noPasswordError}">{{passwordError}}</p>
        </div>
      </div>
      <div class="form-actions">        
        <router-link  to="/reg"  class="btn btn-default"> 立即注册 </router-link> 
        <button id="submit" v-on:click='login' style="margin-left:30px;" class="btn btn-primary">登录</button>
      </div>
    </fieldset>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      username: '',
      password: '',
      noUserNameError: true,
      userNameError: '',
      noPasswordError: true,
      passwordError: ''
    }
  },
  created() {
    //this.getData()
  },
  methods: {
    login() {
      const self = this;
      var user = {
        name: self.username,
        password: self.password
      }
      var flag = true;
      //禁止用户名、密码为空
      if (user.name.length === 0) {
        self.userNameError = '用户名不能为空';
        self.noUserNameError = false;
        flag = false;
      } else {
        self.userNameError = '';
        self.noUserNameError = true;
      }

      //禁止用户名、密码为空
      if (user.password.length === 0) {
        self.hasError = true;
        self.passwordError = '密码不能为空';
        self.noPasswordError = false;
        flag = false;
        return;
      } else {
        self.passwordError = '';
        self.noPasswordError = true;
      }
      if (flag) {
        this.$http({
          url: '/api/login',
          method: 'post',
          params: user
        }).then((res) => {
          if (res.data.code==0) {
            localStorage.setItem('userid',res.data.userinfo.id);
            localStorage.setItem('username',res.data.userinfo.name);
            localStorage.setItem('isLogin','true');
            self.$router.push('/');
          } else {
            self.noUserNameError = false;
            self.passwordError = '用户名或密码不正确';
            self.noPasswordError = false;
          }
        }).catch((res) => {
          console.log('登录信息请求错误 ', res);
        });
      }

    },
  }
}

</script>
<style>
.article_list {
  margin: auto;
}

</style>
