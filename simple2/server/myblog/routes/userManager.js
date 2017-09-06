var express = require('express'); //调用express
var router = express.Router(); //生成express的Router方法的一个实例
var userManager = require('../models/userManager');
var User = require('../models/user'); // 调用刚才封装好的user类  
var url = require('url');
//处理函数
router.get('/', function(req, res, next) { //捕获根url
	res.render('userManager');
});
router.get('/getUserList', function(req, res, next) {
	var userList = new userManager();
	userList.getList(function(err, result) {
		if (err) {
			res.send({
				code: 500,
				data: "错误描述" + err
			})
		} else if (result === null) { //空数据
			res.send({
				code: 501,
				data: "服务器已经没有更多数据了"
			})
		} else {

			res.send({
				code: 200,
				data: result,
				offset: result.offset
			});
		}
	});
});
router.post('/delUser', function(req, res, next) {
	//var arg = url.parse(req.url, true).query;

	var user = new User({
		id: req.body.id
	});
	user.delete(function(err, result) {
		if (err) { //如果报错，返回报错信息
			console.log(err);
			return res.send({
				error: err
			});
		}
		if (result) { //如果第二个参数存在，说明用户名重复了，返回提示
			return res.send({
				code: 200,
				msg: "删除成功."
			});
		}
	})

});
module.exports = router;