var db = require('./db');

function UserManager() {

}
UserManager.prototype.getList = function(callback) {
	var selectResult;
	db.con(function(connect) {
		connect.query('SELECT * FROM user', function(err, result) {
			if (err) { //报错  
				console.log("select name:" + self.name + " error, the err information is " + err);
				return callback(err);
			}
			//注意，这里返回的是带账号和密码的，另外，理论上是有可能有多个元素的，但由于在注册时，用户名限制了重复，因此只会返回一个  
			selectResult = result; //这里的result是一个数组，只包含一个元素（或者是空）
			callback(null, selectResult);
		})
	})
}
UserManager.prototype.setLoginInfo = function(app) {
	var self = this;
	console.log(4444);
	app.use(function(req, res, next) {
			if ('session' in req && 'userinfo' in req.session && !! req.session['userinfo']) {
                res.locals.userinfo = req.session.userinfo;
                res.locals.isLogin = true;
                req.session.isLogin=true;

                //return true;
			} else {
                res.locals.isLogin = false;
                res.locals.userinfo =null;
                req.session.isLogin=false;
				//return false;
			}
		next();
	});

}
module.exports = UserManager;