var db = require('./db')

function Inventory(inventory) { // 这是一个User类，传递的参数是一个对象，这个对象可以具有两个属性，分别是name和password  
 
    this.id = inventory.id;
    this.userid=inventory.userid;
    this.addDate=inventory.addDate;
     this.Consignee=inventory.Consignee;
      this.destination=inventory.destination;
       this.telephone=inventory.telephone;
        this.interchange=inventory.interchange;
        this.interchangeTel=inventory.interchangeTel;
        this.freight=inventory.freight;
}

// 这个是插入方法  
Inventory.prototype.save = function(callback) {
        var self = this;   
        console.log('Inventory save')
        db.con(function(connect) {

            // 数据库的表名为user，字段名为name和password  
            connect.query("INSERT INTO inventory(userid,addDate,Consignee,destination,telephone,interchange,interchangeTel,freight) VALUES (?,?,?,?,?,?,?,?)",                 [self.userid, self.addDate,self.Consignee,self.destination,self.telephone,self.interchange,self.interchangeTel,self.freight], function(err, result) {
              

                if (err) { //如果出错，那么错误信息作为回调函数的参数返回  
                    console.log("INSERT name:" + self.name + ", password:" + self.password + " error, the err information is " + err);
                    return callback(err);
                }
                callback(null, result); //如果正常执行，那么第一个参数为null（无错误），第二个参数为返回的结果  
            })
        })
    }
    // 这个是查询方法  
Inventory.prototype.get = function(callback) {
    var self = this;
    if (this.name.length == 0) { //如果在没账号/密码的情况下就调用插入方法，则提示错误并返回  
        console.log("You can't select user information without NAME!");
        return callback("You can't select user information without NAME!");
    }
    var selectResult;
    db.con(function(connect) {
        connect.query('SELECT * FROM user WHERE name = ?', [self.name], function(err, result) {
            if (err) { //报错  
                console.log("select name:" + self.name + " error, the err information is " + err);
                return callback(err);
            }
            //注意，这里返回的是带账号和密码的，另外，理论上是有可能有多个元素的，但由于在注册时，用户名限制了重复，因此只会返回一个  
            selectResult = result; //这里的result是一个数组，只包含一个元素（或者是空）  
            if (selectResult.length) { //查询到的话，数组是有元素的（即length > 0）  
                return callback(null, selectResult[0]) //这里的selectResult就是user对象，包含name和password属性  
            } else {
                return callback(null, null); //如果查询不到，两个参数都为空  
            }
        })
    })
};
// 这个是编辑方法  
Inventory.prototype.edit = function(callback) {

};
// 这个是删除方法  
Inventory.prototype.delete = function(callback) {
    var self = this;
    if (!this.id) { //如果在没账号/密码的情况下就调用插入方法，则提示错误并返回  
        console.log("You can't delete user information without id!");
        return callback("You can't delete user information without id!");
    }
    db.con(function(connect) {
        connect.query('DELETE  FROM user WHERE id = ?', [self.id], function(err, result) {
            if (err) { //报错  
                console.log("'DELETE  FROM user WHERE id =" + self.id + " error, the err information is " + err);
                return callback(err);
            }
            return callback(null, true) //这里表示删除成功
        })
    })
};
module.exports = Inventory;