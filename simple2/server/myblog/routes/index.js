var express = require('express'); //调用express
var router = express.Router(); //生成express的Router方法的一个实例

//处理函数
router.get('/', function(req, res, next) { //捕获根url
	res.render('main');
});

module.exports = router;