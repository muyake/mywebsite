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
    },

    toastFun: function(text, delay) {
        var selector = document.querySelector(".toast");
        if (selector) {
            selector.parentNode.removeChild(selector);
        }
        var domdiv = document.createElement('div');
        domdiv.className = 'toast';
        domdiv.innerText = text;
        document.getElementsByTagName("body")[0].appendChild(domdiv);
        clearTimeout(toastTime);
        var toastTime = setTimeout(function() {
            var selector = document.querySelector(".toast");
            if (selector) {
                selector.parentNode.removeChild(selector);
            }
        }, delay || 2000);
    }
};
mainObj = {
    getUserInfo: function() {

    },
    renderTable: function(data) {
        $('.userTable tbody').empty();
        var trList = '';
        data.forEach(function(item) {
            trList += '<tr data-id=' + item.id + ' data-userid=' + item.userid + ' data-interchange=' + item.interchange + '  data-addDate=' + item.addDate + '  data-destination=' + item.destination + '  data-consignee=' + item.Consignee + '  data-telephone=' + item.telephone + '  data-interchangeTel=' + item.interchangeTel + '  data-freight=' + item.freight + ' >\
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
    },
    search: function(time) {
        var self = this;
        $.ajax({
            url: '/inventory/get',
            type: 'get',
            data: {
                userid: userid,
                addDate: time
            },
            success: function(response) {
                console.log(response);
                if (response.code == 200) {
                    self.renderTable(response.data);
                }
            }
        });
    },

    showAll: function(nowpage, getPager) {
        var self = this;
        $.ajax({
            url: '/inventory/getInventoryList',
            type: 'get',
            data: {
                userid: userid,
                size: 2,
                pageNow: nowpage,
            },
            success: function(data) {
                if (data.code == 200) {
                    self.renderTable(data.data.objarr);
                    if (!getPager) {
                        self.renderPager(data.data.totalpage, nowpage);
                    }
                }
            }
        })
    },
    renderPager: function(totalpage, nowpage) {
        var self = this;
        $('.pager').createPage(function(n) {
            self.showAll(n, true);
        }, {
            pageCount: totalpage || 1
        });
    },
    delete: function(id) {
        var self = this;
        $.ajax({
            type: 'post',
            url: '/inventory/delInventory',
            data: {
                id: id
            },
            success: function(response) {
                if (response.code == 200) {
                    self.showAll(1);
                    components.toastFun('删除成功');
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

    submitData: function(status) {
        var self = this;
        var containStr = status == 0 ? "#addModal" : "#editModal";
        var flag = true;

        var addDate = $(containStr + ' .addDate').val();
        if (addDate) {
            $(containStr + ' .dt_alert').css("visibility", "hidden");
        } else {
            $(containStr + ' .dt_alert').css("visibility", "visible");
            flag = false;
        }
        var destination = $(containStr + ' .destination').val();

        var Consignee = $(containStr + ' .Consignee').val();

        var telephone = $(containStr + ' .telephone').val();
        if (pub.checkTel(telephone)) {
            $(containStr + ' .telephone_alert').css("visibility", "hidden");
        } else {
            $(containStr + ' .telephone_alert').css("visibility", "visible");
            flag = false;
        }
        var interchange = $(containStr + ' .interchange').val();

        var interchangeTel = $(containStr + ' .interchangeTel').val();

        if (pub.checkTel(interchangeTel)) {
            $(containStr + ' .interchangeTel_alert').css("visibility", "hidden");
        } else {
            $(containStr + ' .interchangeTel_alert').css("visibility", "visible");
            flag = false;
        }
        var freight = $(containStr + ' .freight').val();
        if (isNaN(freight)) {
            $(containStr + ' .freight_alert').css("visibility", "visible");
            flag = false;
        } else {
            $(containStr + ' .freight_alert').css("visibility", "hidden");
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
        if (status == 0) {
            $.post("/inventory/inventorySave", inventory, function(data) {
                if (data.code == 200) {
                    $(containStr).modal('hide');
                    components.toastFun('添加成功');
                    self.showAll(1);
                }
            })
        } else {
            inventory.id = $('#btnedit').attr('data-id');
            $.post("/inventory/inventoryEdit", inventory, function(data) {
                if (data.code == 200) {
                    $(containStr).modal('hide');
                    components.toastFun('修改成功');
                    self.showAll(1);
                }
            })
        }

    },
    bindEvent: function() {
        var self = this;
        $('.searchBtn').on('click', function() {
            var time = $('#searchTime').val();
            self.search(time);
        });
        $('.showAllBtn').on('click', function() {
            self.showAll(1);
        });
        $('.addBtn').on('click', function() {
            $("#addModalLabel").text("新增");
            $('#addModal').modal({
                keyboard: false,
                backdrop: 'static',
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

        $('.userTable').on('click', '.edit', function() {
            var tr = $(this).closest('tr');
            var editForm = $('#editModal');
            $('#editModal .addDate').val(tr.attr('data-addDate'));
            $('#editModal .destination').val(tr.attr('data-destination'));
            $('#editModal .Consignee').val(tr.attr('data-Consignee'));
            $('#editModal .telephone').val(tr.attr('data-telephone'));
            $('#editModal .interchange').val(tr.attr('data-interchange'));
            $('#editModal .interchangeTel').val(tr.attr('data-interchangeTel'));
            $('#editModal .freight').val(tr.attr('data-freight'));
            $('#btnedit').attr('data-id', tr.attr('data-id'));
            $('#editModal').modal({
                keyboard: false,
                backdrop: 'static',
            });

        });
        //模态框显示时，执行的代码。
        $('#addModal').on('show.bs.modal', function() {
            self.resetAddFrom();
        });
        $('#btnadd').on('click', function() {
            self.submitData(0);
            // var flag = true;

            // var addDate = $('#addModal .addDate').val();
            // if (addDate) {
            //     $('#addModal .dt_alert').css("visibility", "hidden");
            // } else {
            //     $('#addModal .dt_alert').css("visibility", "visible");
            //     flag = false;
            // }
            // var destination = $('#addModal .destination').val();

            // var Consignee = $('#addModal .Consignee').val();

            // var telephone = $('#addModal .telephone').val();
            // if (pub.checkTel(telephone)) {
            //     $('#addModal .telephone_alert').css("visibility", "hidden");
            // } else {
            //     $('#addModal .telephone_alert').css("visibility", "visible");
            //     flag = false;
            // }
            // var interchange = $('#addModal .interchange').val();

            // var interchangeTel = $('#addModal .interchangeTel').val();

            // if (pub.checkTel(interchangeTel)) {
            //     $('#addModal .interchangeTel_alert').css("visibility", "hidden");
            // } else {
            //     $('#addModal .interchangeTel_alert').css("visibility", "visible");
            //     flag = false;
            // }
            // var freight = $('#addModal .freight').val();
            // if (isNaN(freight)) {
            //     $('#addModal .freight_alert').css("visibility", "visible");
            //     flag = false;
            // } else {
            //     $('#addModal .freight_alert').css("visibility", "hidden");
            // }
            // // if (flag) {
            // //     var inventory = {
            // //         userid: 1,
            // //         addDate: addDate,
            // //         Consignee: Consignee,
            // //         destination: destination,
            // //         telephone: telephone,
            // //         interchange: interchange,
            // //         interchangeTel: interchangeTel,
            // //         freight: freight
            // //     }
            // //     $.post("/inventory/inventorySave", inventory, function(data) {
            // //         console.log(data);
            // //     })
            // // }

            // var inventory = {
            //     userid: 1,
            //     addDate: addDate,
            //     Consignee: Consignee,
            //     destination: destination,
            //     telephone: telephone,
            //     interchange: interchange,
            //     interchangeTel: interchangeTel,
            //     freight: freight
            // }
            // $.post("/inventory/inventorySave", inventory, function(data) {
            //     if (data.code == 200) {
            //         $('#addModal').modal('hide');
            //         components.toastFun('添加成功');
            //         self.showAll(1);
            //     }
            // })
        });
        $('#btnedit').on('click', function() {
            self.submitData(1);
        });

    },
    init: function() {
        laydate.render({
            elem: 'searchTime'
        });
        laydate.render({
            elem: '#addDate'
        });
        laydate.render({
            elem: '#editDate'
        });
        this.showAll(1);
        this.bindEvent();
    }
}
$(document).ready(function() {
    mainObj.init();
})