var express = require('express'); //调用express
var router = express.Router();  //生成express的Router方法的一个实例

//处理函数
router.get('/', function (req, res, next) {  //捕获根url
    if (!('language' in req.session) || req.session.language === 'zh_cn')
        req.session.language = 'eng';   //更改属性
    else
        req.session.language = 'zh_cn';
    res.redirect('/');  //重定向
});

module.exports = router;  