$(document).ready(function () {
    var time = 0;
    $("#submit").click(function () {
        var user = {
            name: $("#username").val(),
            password: $("#password").val()
        }

        //禁止用户名、密码为空
        if (user.name.length === 0) {
            $("#name-alert").text("用户名不能为空");
            return;
        } else if (user.password.length === 0) {
            $("#pw-alert").text("密码不能为空");
            return;
        }


        if (new Date() - time < 3000)
            return
        time = new Date();
        //发起ajax请求
        $.post(" login", user, function (data) {
            if ("errorName" in data) {
                $("#name-alert").removeClass("displayNONE")
                $("#name-alert").text(data.errorName);
                $("#name-alert").parent().parent().addClass("error");
                setTimeout(function () {
                    $("#name-alert").addClass("displayNONE")
                    $("#name-alert").parent().parent().removeClass("error");
                }, 2000)
                time = 0;
            } else if ("errorPW" in data) {    //
                $("#pw-alert").removeClass("displayNONE")
                $("#pw-alert").text(data.errorPW);
                $("#pw-alert").parent().parent().addClass("error");
                setTimeout(function () {
                    $("#pw-alert").addClass("displayNONE")
                    $("#pw-alert").parent().parent().removeClass("error");
                }, 2000)
                time = 0;
            } else if ("success" in data) {
                location.href = data.success;    //注册成功则重定向
            }
        })
    })
})
