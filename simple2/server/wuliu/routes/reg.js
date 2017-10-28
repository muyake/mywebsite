var express = require('express'); // 调用express模块  
var router = express.Router(); // 调用模块的Router方法  
var User = require('../models/user'); // 调用刚才封装好的user类  
var crypto = require("crypto"); // 这个是加密用，nodejs本身提供  


router.get('/', function(req, res, next) {
    res.render('reg', {
        user: function() {
            if (req.session.user) {
                console.log(req.session.user);
                return req.session.user;
            } else           
                return null;
        }
    });
});

router.post('/', function(req, res, next) { //当路由捕捉到url为/reg的post请求时，会执行以下函数  
    var captcha=req.body.captcha;
    console.log('我是验证码'+captcha);
    if(captcha&&captcha.length>0){
        console.log(req.session);
        if(captcha!==req.session.captcha){
             return res.send({
                code:1,
                error: '验证码不正确'
            });
        }
    }else{
         return res.send({

                error: '验证码不能为空'
            });
    }
    // 获取md5这个对象；（表示调用这个对象的方法，加密的形式是MD5）；  
    var md5 = crypto.createHash('md5');
    // 调用md5的update方法，update的第一个参数是被处理的内容，第二个是可选的，但如果要对中文进行处理，那么就需要加上'utf-8'这个参数；  
    // 因此，我们的密码其实可以支持中文（理论上）  
    // digest指的是以什么形式进行编码，这里选择了base64，除此之外，还有hex（十六进制）、binary（二进制）这两种方法；  
    var password = md5.update(req.body.password, 'utf-8').digest('base64');

    var newUser = new User({ //生成一个User的实例，并赋给他name和passowrd属性  
            name: req.body.name,
            password: password //这里的password是加密过的（存储在数据库里也是加密过后的形式）  
        })
        //判断用户是否存在
    newUser.get(function(err, result) {
        if (err) { //如果报错，返回报错信息
            console.log(err);
            return res.send({
                 code:2,
                error: err
            });
        }
        if (result) { //如果第二个参数存在，说明用户名重复了，返回提示
            return res.send({
                code:2,
                error: "用户名已经存在"
            });
        }
        newUser.save(function(err, result) {
            if (err) { //如果存入时报错
                return res.send({
                    code:2,
                    error: err,
                });
            }
            newUser.get(function (err1, result1) {
                req.session.userinfo =result1;
                req.session.success = "注册成功！"; //添加session的注册成功信息
                req.session.isLogin=true;
                res.send({ //发送一个对象，属性为success，值为/
                    success: "/index"
                })
                return;
            })

        })

    });

})
module.exports = router;