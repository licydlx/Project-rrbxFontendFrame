import {
	consultServie,
	dateModal
} from '../../../../Static/js/common/modal.js';
import dateUnit from '../../../../Static/js/depend/tools/dateUnit.js';
import premAjax from '../../../../Static/js/depend/datas/premAjax.js';
import selectDate from '../../../../Static/js/depend/tools/selectDate.js';
import selectOne from '../../../../Static/js/depend/tools/selectOne.js';

import insuYearData from './insuYearData.js';
import amntData from './amntData.js';
import exemptData from './exemptData.js';
import payendyearData from './payendyearData.js';

const serviceLogic = function(a) {
	var renderData = a[0],
		rrbxSetObj = a[1];
	// 初始化 保費參數值(由投保页回退回来) (多层级 对象 深拷贝)
	var parsObj = JSON.parse(JSON.stringify(rrbxSetObj.insuredPars.parsInit));
	// 客服咨询
	new consultServie("consultService", "#service", "#service-pop").init();
	// =============================
	// 业务逻辑
	// =============================
	getPrem();
	// 逻辑:根据保障额度变化重新计算保费
	// 条件:5:5万,10:10万,15:15万,20:20万,25:25万,30:30万,35:35万
	new selectOne($("#insuYear"), "期限选择", insuYearData, insuYear).init();

	function insuYear(content, value) {
		parsObj.extraParams.insuYear = value;
		getPrem();
		return true;
	}

	// 逻辑:根据出生日期变化重新计算保费
	// 条件:被保人年龄区间 --大于28天,小于50周岁
	new selectDate($("#birthday"), "birthday", '2000-01-01', 50, 0, birthday).init();

	function birthday(value) {
		var flag = dateUnit.getAgeRangeState(value, {
			"ageDay": 28
		}, {
			"age": 50
		});

		if (!flag) {
			new dateModal(null, "stateIndform", "被保人年龄最小28天，最大50周岁").init().show();
			return false;
		} else {
			parsObj.extraParams.birthday = value;
			getPrem();
			return true;
		};
	}

	// 逻辑:根据性别变化重新计算保费
	// 条件:men:男性，women:女性
	$(".singleSelect").on('click', 'a', function(event) {
		event.preventDefault();
		var $this = $(this),
			tagId = $this.closest(".content").attr("id"),
			value = $this.attr("data-id");

		if (!$this.closest("li").hasClass("active")) {
			$this.closest(".content").find("li").removeClass("active");
			$this.closest("li").addClass("active");
		}

		parsObj.extraParams.sex = $this.attr("data-id");
		getPrem();
	});

	// 逻辑:根据保障额度变化重新计算保费
	// 条件:5:5万,10:10万,15:15万,20:20万,25:25万,30:30万,35:35万
	new selectOne($("#amnt"), "保额选择", amntData, amnt).init();

	function amnt(content, value) {
		var curBirthday = $("#birthday").val(),
			curAge = dateUnit.getAgeFromBirthday(curBirthday),
			amntMax = amntJudge(curAge.age);
		if (parseInt(value) > amntMax) {
			new dateModal(null, "stateIndform", `在该年龄段,最大保额不超过${amntMax}万元`).init().show();
			return false;
		} else {
			parsObj.extraParams.amnt = value;
			getPrem();
			return true;
		};

	}

	function amntJudge(age) {
		var amnt;
		if (age >= 0 && age <= 17) {
			amnt = 60;
		}
		if (age >= 18 && age <= 40) {
			amnt = 50;
		}
		if (age >= 41 && age <= 45) {
			amnt = 30;
		}
		if (age >= 46 && age <= 50) {
			amnt = 20;
		}
		return amnt;
	}
	// 逻辑:根据缴费方式变化重新计算保费
	// 条件:1000:一次交清,3:3年,5:5年,10:10年,15:15年,20:20年
	new selectOne($("#payendyear"), "缴费方式选择", payendyearData, payendyear).init();

	function payendyear(content, value) {
		parsObj.extraParams.payendyear = value;

		// 逻辑:根据年龄限制缴费年期
		// 条件:age > 45 缴费年期最大15年
		var curBirthday = $("#birthday").val(),
			curAge = dateUnit.getAgeFromBirthday(curBirthday);
		if (curAge.age > 40 && curAge.age <= 45 && parseInt(value) > 15) {
			new dateModal(null, "stateIndform", `在该年龄段,最大缴费年期不超过15年`).init().show();
			return false;
		} else if (curAge.age > 45 && curAge.age <= 50 && parseInt(value) > 10) {
			new dateModal(null, "stateIndform", `在该年龄段,最大缴费年期不超过10年`).init().show();
			return false;
		} else {
			// 逻辑:根据缴费方式判断改变缴费年期
			// 条件:1000:一次交清，12:其他年交
			parsObj.extraParams.payIntv = Object.is(value, "1000") ? "0" : "12";
			// 逻辑:根据缴费方式判断改变是否购买豁免险
			if (Object.is(value, "1000")) {
				parsObj.extraParams.exempt = "0";
				$("#exempt").attr("data-id", "0").attr("value", "否");
			}
			getPrem();
			return true;
		}
	}

	// 逻辑:根据是否购买豁免险变化重新计算保费
	// 条件:0:否,1是 （注意：一次交清不能购买豁免险）
	new selectOne($("#exempt"), "缴费方式选择", exemptData, exempt).init();

	function exempt(content, value) {
		var py = $("#payendyear").attr("data-id");
		if (Object.is(py, "1000")) {
			new dateModal(null, "stateIndform", "一次交清不能购买豁免险").init().show();
			return false;
		} else {
			parsObj.extraParams.exempt = value;
			getPrem();
			return true;
		};
	}

	// 逻辑: 根据算参数获取保费,并存储公共数据对象
	// 条件: 试算参数对象:ntriObj;公共数据对象:rrbxSetObj
	function getPrem() {
		var ntriObj = parsObj.rrbx;
		ntriObj["extraParams"] = parsObj.extraParams;

		premAjax(ntriObj, function(value) {
			$("#prem").text(value + "元");

			parsObj.extraParams.prem = value;
			rrbxSetObj.insuredPars.pars = parsObj;
			localStorage.setItem(rrbxSetObj.insuredPars.parsInit.rrbx.rrbxProductId, JSON.stringify(rrbxSetObj));
		});
	}

	// =============================
	// 业务逻辑
	// =============================
};
export default serviceLogic;