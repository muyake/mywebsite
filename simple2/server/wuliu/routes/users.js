var express = require('express');
var router = express.Router();
var BlogSubmit = require("../models/blog");

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/getUserInfo', function(req, res, next) {
    if (req.session.isLogin) {
        return res.send({
            code: 0,
            isLogin: req.session.isLogin,
            userinfo: {
                id: req.session.userinfo.id,
                name: req.session.userinfo.name
            }
        });
    } else {
        return res.send({
            code: 1,
            isLogin: false,
            userinfo: null
        });
    }
});
router.get('/:count', function(req, res, next) {
    var blog = new BlogSubmit({
        username: null,
        text: null
    })
    blog.getAll(req.params.count, function(err, result) {
        if (err) {
            res.send({
                code: 500,
                data: "错误描述" + err
            })
        } else if (result === null) { //空数据
            res.send({
                code: 501,
                data: "服务器已经没有更多数据了2"
            })
        } else {
            res.send({
                code: 200,
                data: result,
                offset: result.offset
            });
        }
    })
});

module.exports = router;