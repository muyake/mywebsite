var statistics = {
	startTime: '',
	endTime: '',
	statistics: function() {
		var self = this;
		$.ajax({
			url: '/statistics/getStatistics',
			data: {
				userid: userid,
				startTime: self.startTime,
				endTime: self.endTime,
			},
			type: 'GET',
			success: function(response) {
				if (response.code == 200) {
					self.renderTable(response.data);
				}
			},
		})
	},
	renderTable: function(data) {
		$('.userTable tbody').empty();
		var trList = '';
		var self = this;
		data.forEach(function(item) {
			item.totalfreight = item.totalfreight || 0;
			item.totaltransit = item.totaltransit || 0;
			trList = '<tr>\
                    <td>' + self.startTime + '</td>\
                    <td>' + self.endTime + '</td><td>' + item.totalfreight + '</td><td>' + item.totaltransit + '</td></tr>';
		});
		$('.userTable tbody').append(trList);
	},
	bindEvent: function() {
		var self = this;
		$('.returnDetails').on('click', function() {
			window.location.href = '/index';
		});
		$('.searchBtn').on('click', function() {
			self.startTime = $('#startTime').val();
			self.endTime = $('#endTime').val();
			if (!pub.checkDate(self.startTime)) {
				components.toastFun('起始日期格式不正确！', 1000);
				return;
			}
			if (!pub.checkDate(self.endTime)) {
				components.toastFun('截至日期格式不正确！');
				return;
			}
			if (self.endTime < self.startTime) {
				components.toastFun('起始日期不能大于截至日期！');
				return;
			}
			self.statistics();
		})
	},
	init: function() {
		this.bindEvent();
		laydate.render({
			elem: '#startTime'
		});
		laydate.render({
			elem: '#endTime'
		});
	},
}

$(document).ready(function() {
	statistics.init();
})