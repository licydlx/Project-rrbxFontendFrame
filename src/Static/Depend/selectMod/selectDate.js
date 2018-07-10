class selectDate {
	constructor(bindDom, type, defaultDate, prevYear, nextYear, func) {
		// 初始化时间
		this.now = new Date();
		this.nowYear = this.now.getFullYear();
		switch (type) {
			case 'birthday':
				this.nowMonth = this.now.getMonth() + 1 > 9 ? this.now.getMonth() + 1 : "0" + (this.now.getMonth() + 1);
				this.nowDate = this.now.getDate() > 9 ? this.now.getDate() : "0" + (this.now.getDate());
				break;
			case 'confirmedDate':
				this.nowMonth = this.now.getMonth() + 1 > 9 ? this.now.getMonth() + 1 : "0" + (this.now.getMonth() + 1);
				this.nowDate = this.now.getDate() + 1 > 9 ? this.now.getDate() + 1 : "0" + (this.now.getDate() + 1);
				break;
			case 'confirmedDate5':
				this.nowMonth = this.now.getMonth() + 1 > 9 ? this.now.getMonth() + 1 : "0" + (this.now.getMonth() + 1);
				this.nowDate = this.now.getDate() + 5 > 9 ? this.now.getDate() + 5 : "0" + (this.now.getDate() + 5);
				break;
			default:
				console.log('我是日期选择器');
		}
		this.bindDom = bindDom;
		this.defaultDate = defaultDate ? defaultDate : this.nowYear + '-' + this.nowMonth + '-' + this.nowDate;
		this.prevYear = parseInt(prevYear);
		this.nextYear = parseInt(nextYear);
		this.func = func || undefined;
	}
	init() {
		var that = this,
			DOM = that.bindDom,
			defaultDateArray = that.defaultDate.split("-");
		DOM.attr('data-year', parseInt(defaultDateArray[0]));
		DOM.attr('data-month', parseInt(defaultDateArray[1]));
		DOM.attr('data-date', parseInt(defaultDateArray[2]));
		DOM.attr('value', that.defaultDate);
		DOM.attr("data-id", that.defaultDate);
		DOM.bind('click', function() {
			var oneLevelId = DOM.attr('data-year'),
				twoLevelId = DOM.attr('data-month'),
				threeLevelId = DOM.attr('data-date');
			var iosSelect = new IosSelect(3, [that.YMD().yearData, that.YMD().monthData, that.YMD().dateData], {
				title: '日期选择',
				itemHeight: 35,
				oneLevelId: oneLevelId,
				twoLevelId: twoLevelId,
				threeLevelId: threeLevelId,
				showAnimate: true,
				callback: function(selectOneObj, selectTwoObj, selectThreeObj) {
					var MONTH = parseInt(selectTwoObj.id),
						DATE = parseInt(selectThreeObj.id);
					MONTH = MONTH > 9 ? MONTH : "0" + MONTH;
					DATE = DATE > 9 ? DATE : "0" + DATE;
					var startDate = selectOneObj.value + '-' + MONTH + '-' + DATE;
					if (that.func) {
						if (!that.func(startDate)) {
							return;
						};
					};
					DOM.attr('data-year', selectOneObj.id);
					DOM.attr('data-month', selectTwoObj.id);
					DOM.attr('data-date', selectThreeObj.id);
					DOM.attr("value", startDate);
					DOM.attr("data-id", startDate);
				}
			});
		});
	}
	formatYear(nowYear) {
		var that = this,
			arr = [];
		for (var i = nowYear - that.prevYear; i <= nowYear + that.nextYear; i++) {
			arr.push({
				id: i + '',
				value: i
			});
		}
		return arr;
	}
	formatMonth() {
		var arr = [];
		for (var i = 1; i <= 12; i++) {
			arr.push({
				id: i + '',
				value: i
			});
		}
		return arr;
	}
	formatDate(count) {
		var arr = [];
		for (var i = 1; i <= count; i++) {
			arr.push({
				id: i + '',
				value: i
			});
		}
		return arr;
	}
	YMD() {
		var that = this;
		var yearData = function(callback) {
			callback(that.formatYear(that.nowYear))
		}

		var monthData = function(year, callback) {
			callback(that.formatMonth());
		}

		var dateData = function(year, month, callback) {
			if (/^(1|3|5|7|8|10|12)$/.test(month)) {
				callback(that.formatDate(31));
			} else if (/^(4|6|9|11)$/.test(month)) {
				callback(that.formatDate(30));
			} else if (/^2$/.test(month)) {
				if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
					callback(that.formatDate(29));
				} else {
					callback(that.formatDate(28));
				}
			} else {
				throw new Error('month is illegal');
			}
		}
		return {
			"yearData": yearData,
			"monthData": monthData,
			"dateData": dateData
		}
	}
}
export default selectDate;