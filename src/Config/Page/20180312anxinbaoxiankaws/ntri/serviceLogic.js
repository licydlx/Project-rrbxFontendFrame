import {
	consultServie,
	dateModal
} from '../../../../Static/js/common/modal.js';

import premAjax from '../../../../Static/js/depend/datas/premAjax.js';
import selectDate from '../../../../Static/js/depend/tools/selectDate.js';
import selectOne from '../../../../Static/js/depend/tools/selectOne.js';
import dateUnit from '../../../../Static/js/depend/tools/dateUnit.js';

const serviceLogic = function(a) {
	var renderData = a[0],
		rrbxSetObj = a[1];
	// 初始化 保費參數值(由投保页回退回来) (多层级 对象 深拷贝)
	var parsObj = JSON.parse(JSON.stringify(rrbxSetObj.insuredPars.parsInit));
	getPrem(rrbxSetObj);
	// 客服咨询
	new consultServie("consultService", "#service", "#service-pop").init();
	// =============================

	// 投保人出生日期
	new selectDate($("#holderBirthday"), "birthday", '1992-02-02', 60, -20, holderBirthday).init();

	function holderBirthday(value) {
		var flag = dateUnit.getAgeRangeState(value, {
			"age": 20
		}, {
			"age": 60
		});

		if (!flag) {
			new dateModal(null, "stateIndform", "投保人年龄最小20岁，最大60岁").init().show();
			return false;
		} else {
			parsObj.extraParams.holderBirthday = value;
			getPrem(rrbxSetObj);
			return true;
		};
	}
	// 被保人出生日期
	new selectDate($("#insuredBirthday"), "birthday", '2017-02-02', 9, 0, insuredBirthday).init();

	function insuredBirthday(value) {
		var flag = dateUnit.getAgeRangeState(value, {
			"ageDay": 60
		}, {
			"age": 9
		});

		if (!flag) {
			new dateModal(null, "stateIndform", "被保人年龄最小60天，最大9岁").init().show();
			return false;
		} else {
			parsObj.extraParams.insuredBirthday = value;
			getPrem(rrbxSetObj);
			return true;
		};
	}
	// 被保人性别
	$(".singleSelect").on('click', 'a', function(event) {
		event.preventDefault();
		var $this = $(this);
		var tagId = $this.closest(".content").attr("id");
		var val = $this.attr("data-id");

		if (!$this.closest("li").hasClass("active")) {
			$this.closest(".content").find("li").removeClass("active");
			$this.closest("li").addClass("active");
		}

		switch (tagId) {
			case 'zjhm':
				if (Object.is(val,'true')) {
					console.log("true");
					riskCodesArray.push('QMLD012');
					console.log(riskCodesArray);
				} else {
					console.log("false");
					riskCodesArray.remove('QMLD012');
					console.log(riskCodesArray);
				};
				parsObj.extraParams.riskCodes = riskCodesArray.join(',');
				break;
			case "sex":
				parsObj.extraParams[tagId] = val;	
				break;
		}
		getPrem(rrbxSetObj);
	});

	// 保额选择
	new selectOne($("#amnt"), "保额选择", renderData.amnt, coverageFunc).init();

	function coverageFunc(value) {
		parsObj.extraParams.amnt = value;
		getPrem(rrbxSetObj);
	}

	// 缴费年限
	new selectOne($("#payEndYear"), "缴费年限", renderData.payEndYear, payEndYear).init();

	function payEndYear(value) {
		parsObj.extraParams.payEndYear = value;
		getPrem(rrbxSetObj);
	}

	// 缴费频率
	new selectOne($("#payIntv"), "缴费频率", renderData.payIntv, payIntv).init();

	function payIntv(value) {
		parsObj.extraParams.payIntv = value;
		getPrem(rrbxSetObj);
	}

	// 数组 原型 增加 remove 方法
	// 作者:ydlx
	// 日期:2018-3-13
	Array.prototype.indexOf = function(val) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] == val) return i;
		}
		return -1;
	};
	Array.prototype.remove = function(val) {
		var index = this.indexOf(val);
		if (index > -1) {
			this.splice(index, 1);
		}
	};

	// 附加险多选
	var riskCodesArray = [];
	$("#riskCodes").on('click', 'a', function(event) {
		event.preventDefault();
		var that = $(this);
		if (!that.hasClass("active")) {
			that.addClass("active");
			riskCodesArray.push(that.attr("data-id"));

		} else {
			that.removeClass("active");
			riskCodesArray.remove(that.attr("data-id"));
		}
		parsObj.extraParams.riskCodes = riskCodesArray.join(',');

		getPrem(rrbxSetObj);
	});


	// 住院津贴
	new selectOne($("#ylAmnt"), "住院津贴", renderData.ylAmnt, ylAmnt).init();

	function ylAmnt(value) {
		// 津贴有无影响附加险
		if (value == 0) {
			riskCodesArray.remove("QMLH001");
		} else {
			riskCodesArray.push("QMLH001");
		};
		parsObj.extraParams.riskCodes = riskCodesArray.join(',');
		parsObj.extraParams.ylAmnt = value;
		getPrem(rrbxSetObj);
	}

	// 获取保费 并 存储rrbxSet
	function getPrem(rrbxSetObj) {
		var ntriObj = parsObj.rrbx;
		ntriObj["extraParams"] = parsObj.extraParams;

		premAjax(ntriObj, function(value) {
			$("#prem").text(value + "元");
			parsObj.extraParams.prem = value;
			rrbxSetObj.insuredPars.pars = parsObj;
			localStorage.setItem(rrbxSetObj.insuredPars.parsInit.rrbx.rrbxProductId, JSON.stringify(rrbxSetObj));
		});
	}
};
export default serviceLogic;