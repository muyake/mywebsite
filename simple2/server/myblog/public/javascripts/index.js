$(document).ready(function () {

    //清空输入框
    $("#clearBlog").click(function () {
        $("#textarea").val("");
    })
    var lastSubmit = null;
    var timeer = null;
    var successSubmit = null;
    //防止连续点击
    function ErrorAlert() {
        if (new Date() - lastSubmit < 3000) {
            clearTimeout(timeer);
        }
        lastSubmit = new Date();
        timeer = setTimeout(function () {
            $("#submitError").addClass("displayNONE");
        }, 3000);
    }

    //提交输入框
    $("#postBlog").click(function () {
        //防止重复发表，因此需要间隔10秒
        if (successSubmit && new Date() - successSubmit < 10000) {
            //这里是警告提示，防止连续发送消息
            $("#submitError").text("你发的太快了，喝喝茶吧！距离下次可以发送消息的时间还有：" + (10 - (new Date() - successSubmit) / 1000).toFixed(0) + " 秒。");
            $("#submitSuccess").addClass("displayNONE");
            $("#submitError").removeClass("displayNONE");
            //防止连续点击
            ErrorAlert()
            return;
        }

        var text = $("#textarea").val();
        if (text.length === 0) {    //禁止发送空内容
            $("#submitError").text("请填写输入内容");
            $("#submitError").removeClass("displayNONE");
            //防止连续点击
            ErrorAlert()
            return;
        }
        var length = 0;
        //获取输入长度，英文字母为1，中文汉字为2
        for (var i = 0; i < text.length; i++) {
            if (text[i].match(/[^\x00-\xff]/ig) != null)
                length += 2;
            else
                length += 1;
        }
        if (length > 255) {
            $("#submitError").text("字符长度过长，限制字符长度为255个字节，你的文本长度为" + length + "个字节");
            $("#submitError").removeClass("displayNONE");
            ErrorAlert()
            return;
        }

        //先清除输入框再提交
        $("#textarea").val("");
        successSubmit = new Date();
        $.post('/post', {text: text}, function (item) {
            console.log(item);
            if (item.code == 403) {
                location.href = item.data;
            }
            else if (item.code == 500) {
                successSubmit = 0;
                $("#submitError").text(item.data);
                $("#submitError").removeClass("displayNONE");
                setTimeout(function () {
                    $("#submitError").addClass("displayNONE");
                }, 3000);
            } else if (item.code == 200) {
                $("#submitSuccess").text(item.data);
                $("#submitError").addClass("displayNONE");
                $("#submitSuccess").removeClass("displayNONE");
                setTimeout(function () {
                    $("#submitSuccess").addClass("displayNONE");
                }, 3000);
            }
        })
    })


    var lastLoad = 0;   //初始时间设置为0
    var lastLoadCount = 0;  //偏移量，防止读取到重复数据
    var loadingBlog = null; //加载用的定时器
    //加载更多的内容
    function loadMoreContent() {
        //控制加载间隔，时间差大于2秒，且当前不处于加载中
        if (new Date() - lastLoad > 2000 && $("#scrollToFoot").innerHTML !== "加载中~~~") {
            lastLoad = new Date();
            $("#scrollToFoot")[0].innerHTML = "加载中~~~";
            //设置重置，假如超时10秒，那么允许再次提交
            setTimeout(function () {
                if ($("#scrollToFoot").innerHTML === "加载中~~~") {
                    $("#scrollToFoot").text("加载失败");
                }
            }, 10000);
            $.get('/loadblog/' + lastLoadCount, function (obj) {
                console.log(obj);
                //这里假设item的格式：
                if (obj.code === 500) {
                    $("#scrollToFoot").text("加载失败");
                } else if (obj.code === 501) {  //加载完毕
                    $("#scrollToFoot").text(obj.data);
                    lastLoad = new Date() + 10000000;   //禁止继续请求
                    clearInterval(loadingBlog);
                } else {
                    obj.data.forEach(function (item) {
                        $("#content").append('<div class="span4"><h2>' + item.user + '说</h2>' +
                            '<p>' + item.text + '</p></div>');
                    })
                    $("#scrollToFoot").innerHTML = "滚动到底部然后加载内容";
                    lastLoadCount += obj.offset;
                }
            })
        }
    }

    //加载完毕时，加载一次内容
    loadMoreContent();
    //向下滚动时加载内容
    loadingBlog = setInterval(function () {
        if ($(document).height() - $(window).scrollTop() - $(window).height() < 200) {
            loadMoreContent();
        }
    }, 100);
})  