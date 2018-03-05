const selectDate = function() {
	// 初始化时间
	var now = new Date(),
		nowYear = now.getFullYear(),
		nowMonth = now.getMonth() + 1,
		nowDate = now.getDate(),
		// 数据初始化
		formatYear = function(nowYear) {
			var arr = [];
			for (var i = nowYear - 5; i <= nowYear + 5; i++) {
				arr.push({
					id: i + '',
					value: i + '年'
				});
			}
			return arr;
		},
		formatMonth = function() {
			var arr = [];
			for (var i = 1; i <= 12; i++) {
				arr.push({
					id: i + '',
					value: i + '月'
				});
			}
			return arr;
		},
		formatDate = function(count) {
			var arr = [];
			for (var i = 1; i <= count; i++) {
				arr.push({
					id: i + '',
					value: i + '日'
				});
			}
			return arr;
		},
		yearData = function(callback) {
			callback(formatYear(nowYear))
		},
		monthData = function(callback) {
			callback(formatMonth());
		},
		dateData = function(year, month, callback) {
			if (/^(1|3|5|7|8|10|12)$/.test(month)) {
				callback(formatDate(31));
			} else if (/^(4|6|9|11)$/.test(month)) {
				callback(formatDate(30));
			} else if (/^2$/.test(month)) {
				if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
					callback(formatDate(29));
				} else {
					callback(formatDate(28));
				}
			} else {
				throw new Error('month is illegal');
			}
		};

	return {
		'yearData': yearData,
		'monthData': monthData,
		'dateData': dateData
	};
}

export default selectDate;