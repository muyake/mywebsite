var pub = {
	checkTel: function(value) {
		var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
		var isMob = /^1[34578]\d{9}$/;
		// var value = document.getElementById("ss").value.trim();
		if (isMob.test(value) || isPhone.test(value)) {
			return true;
		} else {
			return false;
		}
	},
	checkDate: function(str) {
		var date = str;
		var result = date.match(/((^((1[8-9]\d{2})|([2-9]\d{3}))(-)(10|12|0?[13578])(-)(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(11|0?[469])(-)(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(0?2)(-)(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)(-)(0?2)(-)(29)$)|(^([3579][26]00)(-)(0?2)(-)(29)$)|(^([1][89][0][48])(-)(0?2)(-)(29)$)|(^([2-9][0-9][0][48])(-)(0?2)(-)(29)$)|(^([1][89][2468][048])(-)(0?2)(-)(29)$)|(^([2-9][0-9][2468][048])(-)(0?2)(-)(29)$)|(^([1][89][13579][26])(-)(0?2)(-)(29)$)|(^([2-9][0-9][13579][26])(-)(0?2)(-)(29)$))/);
		if (result == null) {
			//alert("请输入正确的日期格式");
			return false;
		} else {
			return true;
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