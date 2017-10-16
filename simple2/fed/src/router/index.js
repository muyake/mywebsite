// 引用模板
import index from '../page/index.vue'
import login from '../page/login.vue'
import reg from '@/page/reg';

// 配置路由
export default [{
	path: '/',
	name: 'main',
	components: {
		main: index,
	},
}, {
	path: '/login',
	name: 'login',
	components: {
		main: login,
	},
}, {
	path: '/reg',
	name: 'reg',
	components: {
		main: reg,
	},
}]