var mainObj = {
    getUserInfo: function() {

    },
    status: 0, //0代表全部，1代表检索结果
    searchData: {
        date: ""
    },
    renderTable: function(data) {
        $('.userTable tbody').empty();
        var trList = '';
        data.forEach(function(item) {
            var keys = Object.keys(item);
            keys.forEach(function(item2) {
                item[item2] = item[item2] || '';
            })
            trList += '<tr data-id=' + item.id + ' data-userid=' + item.userid + ' data-transit=' + item.transit + ' data-product=' + item.product + ' data-interchange=' + item.interchange + '  data-addDate=' + item.addDate + '  data-destination=' + item.destination + '  data-consignee=' + item.Consignee + '  data-telephone=' + item.telephone + '  data-interchangeTel=' + item.interchangeTel + '  data-freight=' + item.freight + ' >\
                        <td>' + item.addDate + '</td>\
                        <td>' + item.destination + '</td>\
                        <td>' + item.Consignee + '</td>\
                        <td>' + item.telephone + '</td>\
                        <td>' + item.interchange + '</td>\
                        <td>' + item.interchangeTel + '</td>\
                         <td>' + item.product + '</td>\
                        <td>' + item.freight + '</td>\
                          <td>' + item.transit + '</td>\
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
    search: function(nowpage, getPager) {
        var self = this;
        $.ajax({
            url: '/inventory/get',
            type: 'get',
            data: {
                userid: userid,
                addDate: self.searchData.date,
                size: 25,
                pageNow: nowpage,
            },
            success: function(response) {
                console.log(response);
                if (response.code == 200) {
                    self.renderTable(response.data.objarr);
                    if (!getPager) {
                        self.renderPager(response.data.totalpage, nowpage);
                    }
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
                size: 25,
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
            if (self.status == 0) {
                self.showAll(n, true);
            } else {
                self.search(n, true);
            }

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
                    if (self.status == 0) {
                        self.showAll(1);
                    } else {
                        self.search(1);
                    }

                    components.toastFun('删除成功');
                }
            }
        })
    },
    resetAddFrom: function(status) {
        var containStr = status == 0 ? "#addModal" : "#editModal";
        $(containStr + ' .addDate').val('');
        $(containStr + ' .destination').val('');
        $(containStr + ' .Consignee').val('');
        $(containStr + ' .telephone').val('');
        $(containStr + ' .interchange').val('');
        $(containStr + ' .interchangeTel').val('');
        $(containStr + ' .freight').val('');
        $(containStr + ' .telephone_alert').css({
            'visibility': 'hidden'
        });
        $(containStr + ' .interchangeTel_alert').css({
            'visibility': 'hidden'
        });
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
        var product = $(containStr + ' .product').val();

        var freight = $(containStr + ' .freight').val();
        if (isNaN(freight)) {
            $(containStr + ' .freight_alert').css("visibility", "visible");
            flag = false;
        } else {
            $(containStr + ' .freight_alert').css("visibility", "hidden");
        }

        var transit = $(containStr + ' .transit').val();
        if (isNaN(transit)) {
            $(containStr + ' .transit_alert').css("visibility", "visible");
            flag = false;
        } else {
            $(containStr + ' .transit_alert').css("visibility", "hidden");
        }
        if (!flag) {
            return;
        }

        var inventory = {
            userid: userid,
            addDate: addDate,
            Consignee: Consignee,
            destination: destination,
            telephone: telephone,
            interchange: interchange,
            interchangeTel: interchangeTel,
            product: product,
            freight: freight,
            transit: transit,
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
                    if (self.status == 0) {
                        self.showAll(1);
                    } else {
                        self.search(1);
                    }
                }
            })
        }
    },
    bindEvent: function() {
        var self = this;
        $('.searchBtn').on('click', function() {
            var time = $('#searchTime').val();
            self.status = 1;
            self.searchData.date = time;
            self.search(1);
        });
        $('.showAllBtn').on('click', function() {
            self.status = 0;
            $('#searchTime').val('');
            self.showAll(1);
        });
        $('.addBtn').on('click', function() {
            $("#addModalLabel").text("新增");
            $('#addModal').modal({
                keyboard: false,
                backdrop: 'static',
            });
        });
        $('.statisticsBtn').on('click', function() {
            window.location.href = '/statistics';
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
            $('#editModal .product').val(tr.attr('data-product'));
            $('#editModal .transit').val(tr.attr('data-transit'));
            $('#btnedit').attr('data-id', tr.attr('data-id'));
            $('#editModal').modal({
                keyboard: false,
                backdrop: 'static',
            });

        });
        //模态框显示时，执行的代码。
        $('#addModal').on('show.bs.modal', function() {

            self.resetAddFrom(0);
        });
        $('#editModal').on('hide.bs.modal', function() {

            self.resetAddFrom(1);
        });
        $('#btnadd').on('click', function() {
            self.submitData(0);
        });
        $('#btnedit').on('click', function() {
            self.submitData(1);
        });

    },
    init: function() {
        laydate.render({
            elem: '#searchTime'
        });
        laydate.render({
            elem: '#addDate'
        });
        laydate.render({
            elem: '#editDate'
        });
        this.showAll(1);
        this.bindEvent();

        // $('#editModal').modal({
        //         keyboard: false,
        //         backdrop: 'static',
        //     });
    }
}
$(document).ready(function() {
    mainObj.init();
})