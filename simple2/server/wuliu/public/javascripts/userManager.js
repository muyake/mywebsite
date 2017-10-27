var lastLoadCount = 0; //偏移量，防止读取到重复数据
var loadingBlog = null; //加载用的定时器
//加载更多的内容
function loadMoreContent() {
    //控制加载间隔，时间差大于2秒，且当前不处于加载中      
    $.get('/userManager/getUserList', function(obj) {
        console.log(obj);
        //这里假设item的格式：
        if (obj.code === 500) {
            $("#scrollToFoot").text("加载失败");
        } else if (obj.code === 501) { //加载完毕
            $("#scrollToFoot").text(obj.data);
            clearInterval(loadingBlog);
        } else {
            var tr = '';
            obj.data.forEach(function(item) {
                tr += "<tr userid='" + item.id + "'>\
                  <td>" + item.name + "</td>\
                  <td><button type='button' class='btn btn-primary'>编辑</button></td>\
                  <td><button type='button' class='btn btn-primary del'>删除</button></td>\
                </tr>";
            });
            $(".userTable tbody").append(tr);
        }
    })
}
$('.userTable').on('click', '.del', function() {
    var userid = $(this).closest('tr').attr('userid');
    $.ajax({
        type: 'post',
        url: '/userManager/delUser',
        data: {
            id: userid
        },
        success: function(data) {
            console.log(data);
        }
    })
})
loadMoreContent();