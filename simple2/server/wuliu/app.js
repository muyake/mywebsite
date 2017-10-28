var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var index = require('./routes/index');
var users = require('./routes/users');
var reg = require('./routes/reg');
var login = require('./routes/login');
var lan = require('./routes/language');
var logout = require('./routes/logout');
var captcha = require('./routes/captcha');
var userManager = require('./routes/userManager');
var postBlog = require('./routes/post');
var inventory = require('./routes/inventory');
var statistics = require('./routes/statistics');
//var getUserList = require('./routes/getUserList');
var app = express();
//允许跨域访问
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});
//session  
var session = require('express-session');
app.use(session({
	secret: 'recommend 128 bytes random string',
	cookie: {
		maxAge: 3600 * 1000
	}
}));
//设置swig页面不缓存
swig.setDefaults({
	cache: false
})
var UserManagerObj = require('./models/userManager'); //多语言
var userManagerObj = new UserManagerObj();

userManagerObj.setLoginInfo(app);


// view engine setup
app.set('views', path.join(__dirname, 'views/swig'));
//app.set('view engine', 'jade');
// app.engine('.html', require('ejs').renderFile);
// app.set('view engine', 'html');

//app.set('views','./views/pages/');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//路由的处理
app.use('/index', checkLogin);
app.use('/statistics', checkLogin);
//app.use('/inventory', checkLogin);
app.use('/login', checkNotLogin); //已经等录了，就跳转到主页面
app.use('/reg', checkNotLogin); //已经等录了，就跳转到主页面

//必须在已登录情况下才能访问

//未登录检测（已登录情况下执行）
function checkNotLogin(req, res, next) {
	if (req.session.isLogin) {
		req.session.err = "已登录，请不要重复登录";
		return res.redirect('/index');
	}
	next();
}
//已登录检测（未登录情况下执行）
function checkLogin(req, res, next) {
	console.log('我是' + req.session.isLogin);
	if (!req.session.isLogin) {
		req.session.err = "你还没有登录，请登录";
		console.log(111);
		return res.redirect('/login');
	}
	next();
}
//跳转到首页
function redirectIndex(req, res, next) {
	return res.redirect('/index');
}
app.use('/inventory', inventory);
app.use('/logout', logout); //登出 
app.use('/userManager', userManager); //用户管理
app.use('/language', lan); //切换语言的
app.use('/index', index);
app.use('/users', users);


app.use('/reg', reg); //注册的，reg.js来处理  
app.use('/login', login); //登录的，login来处理
app.use('/post', postBlog); //提交博客
app.use('/loadblog', users); //用户主页，users来处理
app.use('/getCaptcha', captcha);
app.use('/statistics', statistics);
app.use('/', redirectIndex);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});
app.listen(882);
module.exports = app;