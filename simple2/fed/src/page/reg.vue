<template>
  <div class="form-horizontal">
    <fieldset>
        <legend> 注册 </legend>
        <div class="control-group" v-bind:class="{error:!noUserNameError}">
            <label for="username" class="control-label">用户名 </label>
            <div class="controls">
                <input id="username" type="text" v-model="username"  name="username" class="input-xlarge">            
                <p id="usrname-error" class="help-block" v-bind:class="{displayNONE:noUserNameError}"> {{userNameError}} </p>                
            </div>
        </div>
         <div class="control-group" v-bind:class="{error:!noPasswordError}">
              <label for="password" class="control-label">密码 </label>
          <div class="controls">
                <input id="password" type="password" v-model="password"  name="password" class="input-xlarge">

                <p id="pw-alert" class="help-block" v-bind:class="{displayNONE:noPasswordError}">{{passwordError}}</p>
            </div>
        </div>
        <div class="control-group" v-bind:class="{error:!noRepeatPasswordError}">
            <label for="captcha" class="control-label"> 重复密码 </label>
            <div class="controls">
                <input id="password-repeat" type="password" v-model="repeatpassword"   name="password-repeat" class="input-xlarge">
                <p id="pw-rp-error" class="help-block" v-bind:class="{displayNONE:noRepeatPasswordError}"> {{repeatPasswordError}} </p>
            </div>
        </div>
        <div class="control-group" v-bind:class="{error:!noCaptchaError}">
            <label for="captcha" class="control-label"> 验证码 </label>
            <div class="controls">
                <input id="captcha" type="text" name="captcha" v-model="captcha"  class="input-xlarge"><img src="http://localhost:882/getCaptcha" style="background:silver;margin:0 5px;" class="captcha">
                <p id="cc-error" class="help-block" v-bind:class="{displayNONE:noCaptchaError}"> {{captchaError}} </p>
            </div>
        </div> 
        <div class="form-actions">
            <button id="submit-button" v-on:click='reg' style="margin-right:30px;" class="btn btn-primary">注册</button> <router-link  to="/login"  class="btn btn-default"> 登录 </router-link> </div>
    </fieldset>
</div>
</template>
<script>
export default {
  data() {
    return {     
      username: '',
       noUserNameError: true,      
      userNameError: '',
      password: '',
      noPasswordError: true,
      passwordError: '',

        repeatpassword: '',
      noRepeatPasswordError: true,
      repeatPasswordError: '',
      captcha:'',
      noCaptchaError:true,
      captchaError:''
    }
  },
  created() {
    this.getData()
  },
  methods: {   
    getData(){ 
        if(localStorage.getItem('isLogin')=='true'){
           this.$router.push('/');
        }
    },
    reg() {
      const self = this;
      var user = {
        name: self.username,
        password: self.password,
        captcha:self.captcha
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
        self.passwordError = '密码不能为空';
        self.noPasswordError = false;
        flag = false;        
      } else {
        self.passwordError = '';
        self.noPasswordError = true;
      }


   if (user.captcha.length === 0) {        
        self.captchaError = '验证码不能为空';
        self.noCaptchaError = false;
        flag = false;
        
      } else {
       self.captchaError = '';
        self.noCaptchaError = true;
      }


   //禁止用户名、密码为空
      if (user.password != self.repeatpassword) {
        
        self.repeatPasswordError = '两次密码不一致，请重新输入';
        self.noRepeatPasswordError = false;
        flag = false;        
      } else {
        self.passwordError = '';
        self.noRepeatPasswordError = true;
      }
     
      if (flag) {        
        this.$http({
          url: 'http://localhost:882/reg',
          method: 'post',
          data: user
        }).then((res) => {
          if (res.data.code==0) {
            // localStorage.setItem('userid',res.data.userinfo.id);
            // localStorage.setItem('username',res.data.userinfo.name);
            // localStorage.setItem('isLogin','true');
            //self.$emit()
           // this.$emit('login')    
            self.$router.push('/login');
          } else if(res.data.code==0) {
          self.captchaError = '验证码不能不正确';
        self.noCaptchaError = false;
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