var express = require('express'); //调用express
var captchapng = require('../lib/captchapng');
var router = express.Router(); //生成express的Router方法的一个实例

//处理函数
router.get('/', function(req, res, next) { //捕获根url
  var num=parseInt(Math.random()*9000+1000);
    var p = new captchapng(80,30,num); // width,height,numeric captcha
        req.session.captcha=num.toString();
        p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
        p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

        var img = p.getBase64();
        var imgbase64 = new Buffer(img,'base64');
        res.writeHead(200, {
            'Content-Type': 'image/png'
        });
        console.log(2111);
        console.log( req.session.captcha);
        res.end(imgbase64);
});

module.exports = router;