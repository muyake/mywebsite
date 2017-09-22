var express = require('express'); //调用express
var router = express.Router(); //生成express的Router方法的一个实例
var Statistics = require('../models/statistics');
var url = require('url');
//处理函数
router.get('/', function(req, res, next) { //捕获根url
	res.render('statistics');
});
router.get('/getStatistics', function(req, res, next) {
	console.log(22);
	var arg = url.parse(req.url, true).query;
	console.log(arg.userid);
	var st = new Statistics({
		userid: arg.userid,
		startTime: arg.startTime,
		endTime: arg.endTime,
	});
	st.getList(function(err, result) {
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
			});
		}
	});
});
module.exports = router;