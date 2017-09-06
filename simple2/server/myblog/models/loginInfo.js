function LoginInfo() {

}


LoginInfo.prototype.setLoginInfo = function(app) {
    var self = this;
    app.use(function(req, res, next) {
        //这个是示例，定义一个动态视图助手变量

        //如果有语言设置，则设置为对应的语言，否则，设置为中文；
        res.locals = self.getPacks(req.session.language)

        //下面两个因为要调用req和res，所以特殊设置
        res.locals.user = function() {
            if ('session' in req && 'user' in req.session) {
                res.locals.username = req.session.username;
                return req.session.user;
            } else
                return null;
        };

        //这里不能用error这个变量名
        res.locals.err = function() {
            //如果session不存在，或者session中没有err属性
            if (!'session' in req || !'err' in req.session)
                return null; //返回空
            //否则返回err，并将session中的err重置为空（因此只返回一次）
            var err = req.session.err;
            req.session.err = null;
            return err;
        };

        //注册成功的提示
        res.locals.success = function() {
            //原理同err
            if (!'session' in req || !'success' in req.session)
                return null;
            var success = req.session.success;
            req.session.success = null;
            return success;
        }
        next();
    })
}


module.exports = LoginInfo;