var express = require('express'); //调用express模块
var router = express.Router();  //调用模块的Router方法

//登出只需要清空session的user属性即可
router.get('/', function (req, res, next) {
    req.session.user = null;
    res.redirect('/');
})
module.exports = router; 