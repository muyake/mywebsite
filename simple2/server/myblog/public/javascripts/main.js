pub = {
    checkTel: function(value) {
        var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
        var isMob = /^1[34578]\d{9}$/;
        // var value = document.getElementById("ss").value.trim();
        if (isMob.test(value) || isPhone.test(value)) {
            return true;
        } else {
            return false;
        }
    }
};

var components = {
    /**
     * 重写确认框 fun:函数对象 params:参数列表， 可以是数组
     */
    confirm: function(fun, params) {
        if ($("#myConfirm").length > 0) {
            $("#myConfirm").remove();
        }
        var html = "<div class='modal fade' id='myConfirm' >" + "" + "<div class='modal-dialog' style='z-index:2901; '>" + "<div class='modal-content'>" + "<div class='modal-header'  style='font-size:16px; '>" + "<span class='glyphicon glyphicon-envelope'>&nbsp;</span>确认信息！<button type='button' class='close' data-dismiss='modal'>" + "<span style='font-size:20px;  ' class='glyphicon glyphicon-remove'></span><tton></div>" + "<div class='modal-body text-center' id='myConfirmContent' style='font-size:18px; '>" + "是否要删除日期:" + params.addDate + ",收货人:" + params.Consignee + "的这条数据？" + "</div>" + "<div class='modal-footer ' style=''>" + "<button class='btn btn-danger ' id='confirmOk' >确定<tton>" + "<button class='btn btn-info ' data-dismiss='modal'>取消<tton>" + "</div>" + "</div></div></div>";
        $("body").append(html);

        $("#myConfirm").modal("show");

        $("#confirmOk").on("click", function() {
            $("#myConfirm").modal("hide");
            fun(params); // 执行函数
        });
    }
};
mainObj = {
    getUserInfo: function() {

    },
    search: function(time) {
        alert(time);
    },
    showAll: function() {
        $.ajax({
            url: '/inventory/getInventoryList',
            type: 'get',
            data: {},
            success: function(data) {
                if (data.code == 200) {
                    var trList = data.data.reduce(function(str, item) {
                        return str + '<tr data-id=' + item.id + ' data-userid=' + item.userid + '  data-addDate=' + item.addDate + '  data-destination=' + item.destination + '  data-consignee=' + item.Consignee + '  data-telephone=' + item.telephone + '  data-interchangeTel=' + item.interchangeTel + '  data-freight=' + item.freight + ' >\
                        <td>' + item.addDate + '</td>\
                        <td>' + item.destination + '</td>\
                        <td>' + item.Consignee + '</td>\
                        <td>' + item.telephone + '</td>\
                        <td>' + item.interchange + '</td>\
                        <td>' + item.interchangeTel + '</td>\
                        <td>' + item.freight + '</td>\
                        <td>\
                        <button type="button" class="btn btn-default edit btn-sm" style="margin-right:15px;">编辑</button>\
                        </td>\
                        <td>\
                        <button type="button" class="btn btn-default del btn-sm" style="margin-right:15px;">删除</button>\
                        </td>\
                </tr>'
                    });
                    $('.userTable tbody').append(trList);
                }
            }
        })
    },
    delete: function(id) {
        $.ajax({
            type: 'post',
            url: '/inventory/delInventory',
            data: {
                id: id
            },
            success: function(response) {
                if (response.code == 200) {

                }
            }
        })
    },
    resetAddFrom: function() {
        $('#addDate').val('');
        $('#destination').val('');
        $('#Consignee').val('');
        $('#telephone').val('');
        $('#interchange').val('');
        $('#interchangeTel').val('');
        $('#freight').val('')
    },
    bindEvent: function() {
        var self = this;
        $('.searchBtn').on('click', function() {
            var time = $('#searchTime').val();
            self.search(time);
        });
        $('.showAllBtn').on('click', function() {
            self.showAll();
        });
        $('.addBtn').on('click', function() {
            $("#myModalLabel").text("新增");
            $('#myModal').modal({
                keyboard: false,
                backdrop: false
            });
        });
        $('.userTable').on('click', '.del', function() {
            var id = $(this).closest('tr').attr('data-id');
            var addDate = $(this).closest('tr').attr('data-addDate');
            var Consignee = $(this).closest('tr').attr('data-consignee');
            var inventory = {
                id: id,
                addDate: addDate,
                Consignee: Consignee
            };
            components.confirm(function(inventory) {
                self.delete(inventory.id);
            }, inventory);
        });
        //模态框显示时，执行的代码。
        $('#myModal').on('show.bs.modal', function() {
            self.resetAddFrom();
        });
        $('#btnadd').on('click', function() {
            var flag = true;
            var addDate = $('#addDate').val();
            if (addDate) {
                $('#dt_alert').css("visibility", "hidden");
            } else {
                $('#dt_alert').css("visibility", "visible");
                flag = false;
            }
            var destination = $('#destination').val();

            var Consignee = $('#Consignee').val();

            var telephone = $('#telephone').val();
            if (pub.checkTel(telephone)) {
                $('#telephone_alert').css("visibility", "hidden");
            } else {
                $('#telephone_alert').css("visibility", "visible");
                flag = false;
            }
            var interchange = $('#interchange').val();

            var interchangeTel = $('#interchangeTel').val();

            if (pub.checkTel(interchangeTel)) {
                $('#interchangeTel_alert').css("visibility", "hidden");
            } else {
                $('#interchangeTel_alert').css("visibility", "visible");
                flag = false;
            }
            var freight = $('#freight').val();
            if (isNaN(freight)) {
                $('#freight_alert').css("visibility", "visible");
                flag = false;
            } else {
                $('#freight_alert').css("visibility", "hidden");
            }
            // if (flag) {
            //     var inventory = {
            //         userid: 1,
            //         addDate: addDate,
            //         Consignee: Consignee,
            //         destination: destination,
            //         telephone: telephone,
            //         interchange: interchange,
            //         interchangeTel: interchangeTel,
            //         freight: freight
            //     }
            //     $.post("/inventory/inventorySave", inventory, function(data) {
            //         console.log(data);
            //     })
            // }

            var inventory = {
                userid: 1,
                addDate: addDate,
                Consignee: Consignee,
                destination: destination,
                telephone: telephone,
                interchange: interchange,
                interchangeTel: interchangeTel,
                freight: freight
            }
            $.post("/inventory/inventorySave", inventory, function(data) {
                console.log(data);
            })
        });


    },
    init: function() {
        laydate.render({
            elem: '#searchTime'
        });
        laydate.render({
            elem: '#addDate'
        });
        this.showAll();
        this.bindEvent();
    }
}
mainObj.init();