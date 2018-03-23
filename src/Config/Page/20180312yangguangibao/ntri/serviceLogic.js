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
	// 附加险多选
	var riskCodesArray = [];

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
		var $this = $(this),
			tagId = $this.closest(".content").attr("id"),
			value = $this.attr("data-id");

		if (!$this.closest("li").hasClass("active")) {
			$this.closest(".content").find("li").removeClass("active");
			$this.closest("li").addClass("active");
		}

		switch (tagId) {
			case 'zjhm':
				var code = $this.attr("data-code");
				Object.is(value, '0') ? riskCodesArray.remove(code) : Object.is(riskCodesArray.indexOf(code), -1) ? riskCodesArray.push(code) : '';
				parsObj.extraParams.riskCodes = riskCodesArray.join(',');
				break;
			case 'holdersex':
				parsObj.extraParams[tagId] = value;
				break;
			case "insuredsex":
				parsObj.extraParams[tagId] = value;
				break;
		}
		getPrem(rrbxSetObj);
	});

	// 保额选择
	new selectOne($("#basicAmnt"), "保额选择", renderData.data.basicAmnt, basicAmnt).init();

	function basicAmnt(content, value) {
		parsObj.extraParams.basicAmnt = value;

		// 附加险初始化
		parsObj.extraParams.specificAmnt = "0";
		parsObj.extraParams.severeAmnt = "0";
		var specificAmnt = $('#specificAmnt'),
			severeAmnt = $('#severeAmnt');
		specificAmnt.attr('value', '0元').attr("data-id","0");
		severeAmnt.attr('value', '0元').attr("data-id","0");
		riskCodesArray.remove(specificAmnt.attr("data-code"));
		riskCodesArray.remove(severeAmnt.attr("data-code"));
		parsObj.extraParams.riskCodes = riskCodesArray.join(',');

		getPrem(rrbxSetObj);
		return true;
	}

	// 缴费年限
	new selectOne($("#payEndYear"), "缴费年限", renderData.data.payEndYear, payEndYear).init();

	function payEndYear(content, value) {
		parsObj.extraParams.payEndYear = value;
		getPrem(rrbxSetObj);
		return true;
	}

	// 缴费频率
	new selectOne($("#payIntv"), "缴费频率", renderData.data.payIntv, payIntv).init();

	function payIntv(content, value) {
		parsObj.extraParams.payIntv = value;
		getPrem(rrbxSetObj);
		return true;
	}

	// 住院津贴
	new selectOne($("#ylAmnt"), "住院津贴", renderData.data.ylAmnt, ylAmnt).init();

	function ylAmnt(content, value) {
		// 津贴有无影响附加险
		var code = content.attr("data-code");
		Object.is(value, '0') ? riskCodesArray.remove(code) : Object.is(riskCodesArray.indexOf(code), -1) ? riskCodesArray.push(code) : '';
		parsObj.extraParams.riskCodes = riskCodesArray.join(',');
		parsObj.extraParams.ylAmnt = value;
		getPrem(rrbxSetObj);

		return true;
	}

	// 特定疾病保额
	new selectOne($("#specificAmnt"), "特种疾病", renderData.data.specificAmnt, specificAmnt).init();

	function specificAmnt(content, value) {
		if (value > parseInt(parsObj.extraParams.basicAmnt) * 2) {
			new dateModal(null, "stateIndform", "附加险保额最高为基本保额的2倍").init().show();
			return false;
		};

		var code = content.attr("data-code");
		Object.is(value, '0') ? riskCodesArray.remove(code) : Object.is(riskCodesArray.indexOf(code), -1) ? riskCodesArray.push(code) : '';
		parsObj.extraParams.riskCodes = riskCodesArray.join(',');
		parsObj.extraParams.specificAmnt = value;
		getPrem(rrbxSetObj);

		return true;
	}

	// 重疾保额
	new selectOne($("#severeAmnt"), "重疾保额", renderData.data.severeAmnt, severeAmnt).init();

	function severeAmnt(content, value) {
		if (value > parseInt(parsObj.extraParams.basicAmnt) * 2) {
			new dateModal(null, "stateIndform", "附加险保额最高为基本保额的2倍").init().show();
			return false;
		};

		var code = content.attr("data-code");
		Object.is(value, '0') ? riskCodesArray.remove(code) : Object.is(riskCodesArray.indexOf(code), -1) ? riskCodesArray.push(code) : '';
		parsObj.extraParams.riskCodes = riskCodesArray.join(',');
		parsObj.extraParams.severeAmnt = value;
		getPrem(rrbxSetObj);

		return true;
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