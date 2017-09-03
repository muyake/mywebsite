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
}
mainObj = {
    getUserInfo: function() {

    },
    search: function(time) {
        alert(time);
    },
    showAll: function() {

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
            $('#myModal').modal({ keyboard: false, backdrop: false });
        });

        //模态框显示时，执行的代码。
        $('#myModal').on('show.bs.modal', function() {
            self.resetAddFrom();
        });
        $('#btnadd').on('click', function() {
            var flag = true;
            var addDate = $('#addDate').val()
            if (addDate) {
                $('#dt_alert').css("visibility", "hidden");
            } else {
                $('#dt_alert').css("visibility", "visible");
                flag = false;
            }
            var destination = $('#destination').val()
            console.log(destination);
            var Consignee = $('#Consignee').val()
            console.log(Consignee);
            var telephone = $('#telephone').val()
            if (pub.checkTel(telephone)) {
                $('#telephone_alert').css("visibility", "hidden");
            } else {
                $('#telephone_alert').css("visibility", "visible");
                flag = false;
            }
            console.log(telephone);
            var interchange = $('#interchange').val()
            console.log(interchange);
            var interchangeTel = $('#interchangeTel').val()
            console.log(interchangeTel);
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
        this.bindEvent();
    }
}
mainObj.init();
