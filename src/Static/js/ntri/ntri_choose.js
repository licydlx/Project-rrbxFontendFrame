// import selectDate from './select_date.js';
// var select_date = new selectDate();
// 功能
import {
	getProductId
} from '../depend/common.js';
const e_ntri_choose = function(data) {
	/* 下拉日期模块 待优化 */
	/* ydlx */
	/* 2018-2-11 */
	// 初始化时间
	var now = new Date();
	var nowYear = now.getFullYear();
	var nowMonth = now.getMonth() + 1;
	var nowDate = now.getDate();
	// 数据初始化
	function formatYear(nowYear) {
		var arr = [];
		for (var i = nowYear - 60; i <= nowYear - 18; i++) {
			arr.push({
				id: i + '',
				value: i + '年'
			});
		}
		return arr;
	}

	function formatMonth() {
		var arr = [];
		for (var i = 1; i <= 12; i++) {
			arr.push({
				id: i + '',
				value: i + '月'
			});
		}
		return arr;
	}

	function formatDate(count) {
		var arr = [];
		for (var i = 1; i <= count; i++) {
			arr.push({
				id: i + '',
				value: i + '日'
			});
		}
		return arr;
	}
	var yearData = function(callback) {
		callback(formatYear(nowYear))

	}
	var monthData = function(year, callback) {
		callback(formatMonth());

	};
	var dateData = function(year, month, callback) {
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
	/* 下拉日期模块 待优化 */
	/* ydlx */
	/* 2018-2-11 */
	var chooseDom = $('.optional');
	chooseDom.each(function(index, val) {
		var dataId = $(val).attr('id'),
			valDom = $('#' + dataId),
			selectedDom = valDom.find('.selected');
		valDom.click(function(event) {
			event.preventDefault();
			switch (dataId) {
				case 'olOne':
					new IosSelect(3, [yearData, monthData, dateData], {
						title: '日期选择',
						itemHeight: 35,
						oneLevelId: '1',
						twoLevelId: '2',
						threeLevelId: '3',
						showAnimate: true,
						showLoading: true,
						callback: function(selectOneObj, selectTwoObj, selectThreeObj) {
							selectedDom.attr('data-value', selectOneObj.id + ',' + selectTwoObj.id + ',' + selectThreeObj.id);
							selectedDom.text(selectOneObj.id + '-' + selectTwoObj.id + '-' + selectThreeObj.id);
						}
					});
					break;
				case 'olTwo':
					new IosSelect(1, [data.olTwo], {
						container: '.container',
						title: '保额选择',
						itemHeight: 35,
						itemShowCount: 4,
						oneLevelId: selectedDom.attr('data-value'),
						showAnimate: true,
						callback: function(selectObj) {
							selectedDom.attr('data-tag', selectObj.tag);
							selectedDom.attr('data-value', selectObj.id);
							selectedDom.find('.value').text(selectObj.value);
						}
					});
					break;
				case 'olThree':
					new IosSelect(1, [data.olThree], {
						container: '.container',
						title: '保额选择',
						itemHeight: 35,
						itemShowCount: 4,
						oneLevelId: selectedDom.attr('data-value'),
						showAnimate: true,
						callback: function(selectObj) {
							selectedDom.attr('data-tag', selectObj.tag);
							selectedDom.attr('data-value', selectObj.id);
							selectedDom.find('.value').text(selectObj.value);
						}
					});
					break;
				case 'olFour':
					new IosSelect(1, [data.olFour], {
						container: '.container',
						title: '保额选择',
						itemHeight: 35,
						itemShowCount: 2,
						oneLevelId: selectedDom.attr('data-value'),
						showAnimate: true,
						callback: function(selectObj) {
							selectedDom.attr('data-tag', selectObj.tag);
							selectedDom.attr('data-value', selectObj.id);
							selectedDom.find('.value').text(selectObj.value);
						}
					});
					break;
				case 'olFive':
					new IosSelect(1, [data.olFive], {
						container: '.container',
						title: '保期选择',
						itemHeight: 35,
						itemShowCount: 4,
						oneLevelId: selectedDom.attr('data-value'),
						showAnimate: true,
						callback: function(selectObj) {
							selectedDom.attr('data-tag', selectObj.tag);
							selectedDom.attr('data-value', selectObj.id);
							selectedDom.text(selectObj.value);
						}
					});
					break;
			}
		});
	});

	// 默认 参数 
	var productId = getProductId(),
		DataSet = JSON.parse(localStorage.getItem(productId)),
		calPars = [],
		itemkindSet = ['A01', null, null];
	DataSet.trialResult = {
		'productSeriesId': 14861,
		'periodPremium': 1.5,
		'dataVal': '1',
		'itemkind': 'A01',
		'prem': 1.5
	}
	storage();
	// 保费计算参数
	$("#container").find(".optional .selected").each(function(index, value) {
		calPars.push($(value).attr('data-value'));
	});

	$('.prem-trial').on('DOMNodeInserted', '.selected', function() {
		var seq = $(this).attr('data-seq'),
			tag = $(this).attr('data-tag');
		if (seq == 3) {
			DataSet.trialResult.dataVal = $(this).attr('data-tag');
		} else {
			if (tag) {
				itemkindSet[seq] = tag;
			} else {
				itemkindSet[seq] = null;
			};
			var newSet = [];
			itemkindSet.forEach(function(value, index) {
				if (value) {
					newSet.push(value);
				};
			})
			DataSet.trialResult.itemkind = newSet.join(',');
		};
		calPars[seq] = $(this).attr('data-value');
		calPrem(calPars);
		storage();
	});

	function storage() {
		localStorage.setItem(productId, JSON.stringify(DataSet));
	};
	// 计算保费
	function calPrem(pars) {
		var prem = (parseInt(pars[0]) + parseInt(pars[1]) + parseInt(pars[2])) * parseInt(pars[3]) / 100;
		$("#prem").text(prem + "元").attr("data-value", prem);
		DataSet.trialResult.prem = prem;
	};
};

export default e_ntri_choose;