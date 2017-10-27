var express = require('express'); //调用express模块
var router = express.Router();  //调用模块的Router方法
var db = require('../models/db')
var BlogSubmit = require("../models/blog");
//给原生的Date添加一个方法，传递的参数是格式
Date.prototype.Format = function (fmt) { //author: meizz
    var obj = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var key in obj)
        if (new RegExp("(" + key + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (obj[key]) : (("00" + obj[key]).substr(("" + obj[key]).length)));

    console.log(fmt);
    return fmt; //返回值是格式化好之后的时间
}

router.post('/', function (req, res, next) {
    //如果不登录是不能发表的（这个是为了防止登录过期，但是页面还保持在登录时的情况）
    if (!req.session.user) {
        req.session.err = "请登录";        //因为这里，需要修改layout.jade
        return res.redirect('/login');
    }
    //console.log(req.session.user);
    //登录后值为（示例）
    //{ Id: 23,
    //    username: '1',
    //    userpassword: 'xMpCOKC5I4INzFCab3WEmw==' }
    var blog = new BlogSubmit({
        name: req.session.user.name,
        text: req.body.text
    })
    blog.save(function (err, result) {
        if (err) {
            return res.send({
                code: 500,
                data: "错误描述" + err
            })
        }
        return res.send({
            code: 200,
            data: "成功发表！"
        })
    })
})
module.exports = router;  