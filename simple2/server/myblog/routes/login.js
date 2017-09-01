var express = require('express'); //调用express模块  
var router = express.Router();  //调用模块的Router方法
var User = require('../models/user');   // 调用刚才封装好的user类
var crypto = require("crypto"); // 这个是加密用，nodejs本身提供


router.get('/', function (req, res, next) {
    res.render('login')
});

router.post('/', function (req, res, next) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password, 'utf-8').digest('base64');

    var newUser = new User({   //生成一个User的实例，并赋给他name和passowrd属性
        name: req.body.name
    })
    newUser.get(function (err, user) {
        if (!user) {    //用户名不存在
            return res.send({errorName: res.locals.message.errorName});
        }
        else if (user) { //如果第二个参数存在，说明用户名重复了，那么监测密码是否相同
            if (user.password === password) {   //密码正确，登录成功
                req.session.user = user;
                req.session.success = res.locals.message.login_success;
                return res.send({success: '/'});
            } else {
                return res.send({errorPW: res.locals.message.errorPW});
            }
        }
        else if (err) {  //如果报错，返回报错信息
            console.log(err);
            return res.send({
                error: err
            });
        }

    })
})
module.exports = router; 