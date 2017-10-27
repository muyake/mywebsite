var db = require('./db')

function Statistics(st) { // 这是一个inventory类，传递的参数是一个对象，这个对象可以具有两个属性，分别是name和password  
    this.userid = st.userid;
    this.startTime = st.startTime;
    this.endTime = st.endTime;
}


// 这个是删除方法  
Statistics.prototype.getList = function(callback) {
    var self = this;
    if (!this.userid) { //如果在没账号/密码的情况下就调用插入方法，则提示错误并返回  
        console.log("You can't getList inventory information without id!");
        return callback("You can't getList inventory information without id!");
    }
    db.con(function(connect) {
        connect.query('SELECT SUM(transit) as totaltransit, SUM(freight) as totalfreight FROM inventory WHERE userid = ? and addDate >= ? and addDate <= ?', [self.userid, self.startTime, self.endTime], function(err, result) {
            if (err) { //报错  
                console.log("'SELECT  FROM inventory WHERE id =" + self.id + " error, the err information is " + err);
                return callback(err);
            }

            if (result.length) { //查询到的话，数组是有元素的（即length > 0）  
                return callback(null, result) //这里的selectResult就是user对象，包含name和password属性  
            } else {
                return callback(null, null); //如果查询不到，两个参数都为空  
            }
        })
    })
};

module.exports = Statistics;