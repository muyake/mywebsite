var express = require('express'); //调用express
var router = express.Router(); //生成express的Router方法的一个实例
var Inventory = require('../models/inventory');
var ManageInventory = require('../models/manageInventory');
var User = require('../models/user'); // 调用刚才封装好的user类  
var url = require('url');
//处理函数
router.get('/getInventoryList', function(req, res, next) {
    console.log(22);
    var arg = url.parse(req.url, true).query;
    console.log(arg.userid);
    var manageInventory = new ManageInventory({
        userid: arg.userid,
        size: arg.size,
        pageNow: arg.pageNow
    });
    manageInventory.getList(function(err, result) {
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
//处理函数
router.get('/get', function(req, res, next) {
    var arg = url.parse(req.url, true).query;
    var manageInventory = new ManageInventory({
        userid: arg.userid,
        size: arg.size,
        pageNow: arg.pageNow,
        searchdate: arg.addDate,
    });
    manageInventory.getSearchData(function(err, result) {
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
router.post('/delInventory', function(req, res, next) {
    //var arg = url.parse(req.url, true).query;

    var inventory = new Inventory({
        id: req.body.id
    });
    inventory.delete(function(err, result) {
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


router.post('/inventorySave', function(req, res, next) { //当路由捕捉到url为/reg的post请求时，会执行以下函数  
    var inventory = new Inventory({ //生成一个User的实例，并赋给他name和passowrd属性  
        userid: req.body.userid,
        addDate: req.body.addDate,
        Consignee: req.body.Consignee,
        destination: req.body.destination,
        telephone: req.body.telephone,
        interchange: req.body.interchange,
        interchangeTel: req.body.interchangeTel,
        product: req.body.product,
        freight: req.body.freight,
        transit: req.body.transit,
        pack: req.body.pack,
        weight: req.body.weight,
        count: req.body.count,

    });
    console.log("ss" + req.body.transit);
    inventory.save(function(err, result) {
        console.log('1111');
        if (err) { //如果存入时报错
            return res.send({
                error: err
            });
        }
        req.session.success = "注册成功！"; //添加session的注册成功信息
        res.send({
            code: 200,
            msg: "添加成功."
        });
        return;
    })
})

router.post('/inventoryEdit', function(req, res, next) { //当路由捕捉到url为/reg的post请求时，会执行以下函数  
    console.log('111');
    var inventory = new Inventory({ //生成一个User的实例，并赋给他name和passowrd属性  
        id: req.body.id,
        userid: req.body.userid,
        addDate: req.body.addDate,
        Consignee: req.body.Consignee,
        destination: req.body.destination,
        telephone: req.body.telephone,
        interchange: req.body.interchange,
        interchangeTel: req.body.interchangeTel,
        product: req.body.product,
        freight: req.body.freight,
        transit: req.body.transit,
        pack: req.body.pack,
        weight: req.body.weight,
        count: req.body.count,
    });
    inventory.edit(function(err, result) {
        //console.log('1111');
        if (err) { //如果存入时报错
            return res.send({
                error: err
            });
        }
        req.session.success = "修改成功！"; //添加session的注册成功信息
        res.send({
            code: 200,
            msg: "修改成功."
        });
        return;
    })
})
module.exports = router;