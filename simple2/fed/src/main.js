// 引用 vue 没什么要说的
import Vue from 'vue'
// 引用路由
import VueRouter from 'vue-router'
import Icon from 'vue-svg-icon/Icon';
// 光引用不成，还得使用
Vue.use(VueRouter)
	// 入口文件为 src/App.vue 文件 所以要引用
import App from './App.vue'
// 引用路由配置文件
import routes from './router/index'
// 引用工具文件
import utils from './utils/index.js'
import axios from 'axios';


 import ElementUI from 'element-ui';
 Vue.use(ElementUI);
 import 'element-ui/lib/theme-default/index.css'
Vue.component('icon', Icon);
// 将工具方法绑定到全局
Vue.prototype.$utils = utils
	// 使用配置文件规则
const router = new VueRouter({
		routes
	})
	// 引用API文件
import api from './api/index.js'
// 将API方法绑定到全局
Vue.prototype.$api = api;
Vue.prototype.$http = axios;


//import '../static/js/jquery-3.2.1.min.js'
import $ from 'jquery'
// 配置百度编辑器
import '../static/ue/ueditor.config.js'
import '../static/ue/ueditor.all.min.js'
import '../static/ue/lang/zh-cn/zh-cn.js'
import '../static/ue/ueditor.parse.min.js'

// 跑起来吧
var vm = new Vue({
	router,
	el: '#app',
	render: (h) => h(App)
})