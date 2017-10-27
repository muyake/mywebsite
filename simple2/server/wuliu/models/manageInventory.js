var db = require('./db')

function ManageInventory(manageInventory) { // 这是一个inventory类，传递的参数是一个对象，这个对象可以具有两个属性，分别是name和password  


    this.userid = parseInt(manageInventory.userid);
    this.size = parseInt(manageInventory.size);
    this.pageNow = parseInt(manageInventory.pageNow);
    this.searchdate=manageInventory.searchdate;
}


// 这个是删除方法  
ManageInventory.prototype.getList = function(callback) {
    var self = this;
    if (!this.userid) { //如果在没账号/密码的情况下就调用插入方法，则提示错误并返回  
        console.log("You can't getList inventory information without id!");
        return callback("You can't getList inventory information without id!");
    }

    var takeCount = (self.pageNow - 1) * self.size;
    var returnobj = {};

    db.con(function(connect) {
        connect.query('SELECT * FROM inventory WHERE userid = ? order by id desc limit ? , ?', [self.userid, takeCount, self.size], function(err, result) {
            if (err) { //报错  
                console.log("'SELECT  FROM inventory WHERE id =" + self.id + " error, the err information is " + err);
                return callback(err);
            }

            if (result.length) { //查询到的话，数组是有元素的（即length > 0）  
                returnobj.objarr = result;
            } else {
                returnobj.objarr = [];
            }
            connect.query('SELECT count(*) as totalcount FROM inventory WHERE userid = ?', [self.userid], function(err, result) {
                if (err) { //报错  
                    console.log("'SELECT  FROM inventory WHERE id =" + self.id + " error, the err information is " + err);
                    return callback(err);
                }
                returnobj.totalpage = result[0].totalcount;
                returnobj.totalpage = Math.ceil(returnobj.totalpage / self.size);
                console.log("断点3");
                return callback(null, returnobj)
            });
        });
    });

};

// 这个是删除方法  
ManageInventory.prototype.getSearchData = function(callback) {
    var self = this;
    if (!this.userid) { //如果在没账号/密码的情况下就调用插入方法，则提示错误并返回  
        console.log("You can't getList inventory information without id!");
        return callback("You can't getList inventory information without id!");
    }

    var takeCount = (self.pageNow - 1) * self.size;
    var returnobj = {};

    db.con(function(connect) {
        console.log(self.searchdate);
        connect.query('SELECT * FROM inventory WHERE addDate= ? and userid = ? order by id desc limit ? , ?', [self.searchdate,self.userid, takeCount, self.size], function(err, result) {
            if (err) { //报错  
                console.log("'SELECT  FROM inventory WHERE id =" + self.id + " error, the err information is " + err);
                return callback(err);
            }

            if (result.length) { //查询到的话，数组是有元素的（即length > 0）  
                returnobj.objarr = result;
            } else {
                returnobj.objarr = [];
            }
            connect.query('SELECT count(*) as totalcount FROM inventory WHERE userid = ?', [self.searchdate,self.userid], function(err, result) {
                if (err) { //报错  
                    console.log("'SELECT  FROM inventory WHERE addDate= ? and  id =" + self.id + " error, the err information is " + err);
                    return callback(err);
                }
                returnobj.totalpage = result[0].totalcount;
                returnobj.totalpage = Math.ceil(returnobj.totalpage / self.size);
                console.log("断点3");
                return callback(null, returnobj)
            });
        });
    });

};
module.exports = ManageInventory;