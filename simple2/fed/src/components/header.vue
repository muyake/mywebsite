<template>
  <div class="navbar navbar-fixed-top">
    <div class="navbar-inner">
      <div class="container"><a data-toggle="collapse" data-target=".nav-collapse" class="btn btn-navbar"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></a><a href="/" class="brand">我是名称</a>
        <div class="nav-collapse">
          <ul class="nav">
            <template v-if="isLogin">
              <li><a href="javascript:void(0)">{{username}}</a></li>
              <li><a href="/logout">退出</a></li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'head',
  props: {
    isLogin:{
        type:Boolean,
        default:false,
    },
    username:{
        type:String,
        default:''
    }
  }
};

</script>
<style scoped>
@import url(../../static/css/bootstrap/css/bootstrap.min.css);
@import url(../style/style.scss);
.navbar-inner .container,
#contrainer {
  width: 1300px;
}

#contrainer {
  min-height: 780px;
}

</style>
