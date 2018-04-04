import {
	consultServie,
	dateModal
} from '../../../../Static/js/common/modal.js';

import {
	alertPrem
} from '../../../../Static/js/depend/common.js';

import premAjax from '../../../../Static/js/depend/datas/premAjax.js';

import selectOne from '../../../../Static/js/depend/tools/selectOne.js';
import selectDate from '../../../../Static/js/depend/tools/selectDate.js';
import selectArea from '../../../../Static/js/depend/tools/selectArea.js';

import dateUnit from '../../../../Static/js/depend/tools/dateUnit.js';
import areaData from '../nbuy/area.js';
import limitAreaArray from './limitAreaArray.js';

const serviceLogic = function(a) {
	var renderData = a[0],
		rrbxSetObj = a[1];
	// 初始化 保費參數值(由投保页回退回来) (多层级 对象 深拷贝)
	var parsObj = JSON.parse(JSON.stringify(rrbxSetObj.insuredPars.parsInit));
	// 客服咨询
	new consultServie("consultService", "#service", "#service-pop").init();

	/**
	 * 	业务逻辑区域 start
	 */
	// 逻辑:初始值,获取保费
	// 条件:..
	getPrem();

	// 逻辑:根据保额重新计算保费
	// 条件:..
	var areaTag;
	new selectArea($("#limitArea"), "所在地区", areaData, limitArea).init();

	function limitArea(value) {
		parsObj.extraParams.limitArea = JSON.stringify({
			'data-id': value.selectOneObj.id + ',' + value.selectTwoObj.id + ',' + value.selectThreeObj.id,
			'value': value.selectOneObj.value + ',' + value.selectTwoObj.value + ',' + value.selectThreeObj.value
		});
		areaTag = false;
		limitAreaArray.forEach(function(x, y, z) {
			if (Object.is(x, value.selectTwoObj.id)) {
				areaTag = true;
			} else {
				$("#amnt").attr("value", "10万元");
				parsObj.extraParams.amnt = "10";
			}
		});
		getPrem();
		return true;
	}

	// 逻辑:根据被保人出生日期重新计算保费
	// 条件:..
	new selectDate($("#insuredBirthday"), "birthday", '2000-01-01', 60, 0, insuredBirthday).init();

	function insuredBirthday(value) {
		var flag = dateUnit.getAgeRangeState(value, {
			"ageDay": 30
		}, {
			"age": 50
		});

		if (!flag) {
			new dateModal(null, "stateIndform", "被保人年龄最小30天，最大50岁").init().show();
			return false;
		} else {
			parsObj.extraParams.insuredBirthday = value;
			getPrem();
			return true;
		};
	}

	// 逻辑:根据保额重新计算保费
	// 条件:..
	new selectOne($("#amnt"), "保额选择", renderData.data.amnt, amnt).init();

	function amnt(content, value) {
		// 被保人年龄
		var age = dateUnit.getAgeFromBirthday(parsObj.extraParams.insuredBirthday).age;

		if (age >= 18 && age <= 40 && Object.is(areaTag, false) && parseInt(value) > 30) {
			new dateModal(null, "stateIndform", "您所在地区不支持30万以上保额").init().show();
			return false;
		} else if (age <= 50 && age >= 41 && parseInt(value) > 20) {
			new dateModal(null, "stateIndform", "您的年龄段不支持20万以上保额").init().show();
			return false;
		} else {
			parsObj.extraParams.amnt = value;
			getPrem();
			return true;
		}
	}

	// 逻辑:事件委托绑定 单选
	// 条件:..
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
			case "insuredSex":
				parsObj.extraParams[tagId] = value;
				break;
		}
		getPrem();
	});

	// 逻辑:根据缴费年限重新计算保费
	// 条件:..
	new selectOne($("#payEndYear"), "缴费年限", renderData.data.payEndYear, payEndYear).init();

	function payEndYear(content, value) {
		// 被保人年龄
		var age = dateUnit.getAgeFromBirthday(parsObj.extraParams.insuredBirthday).age;
		if (age > 45 && parseInt(value) > 4) {
			new dateModal(null, "stateIndform", "您的年龄段不支持10年以上缴费").init().show();
			return false;
		} else if (age > 40 && age <= 45 && parseInt(value) > 6) {
			new dateModal(null, "stateIndform", "您的年龄段不支持20年以上缴费").init().show();
			return false;
		} else {
			parsObj.extraParams.payEndYear = value;
			parsObj.extraParams.payIntv = Object.is(value, "1") ? "D" : "Y";
			getPrem();
			return true;
		};
	}

	// 逻辑:根据附加险重新计算保费
	// 条件:WDDG:主险；WSDA：i保轻疾险；WSWP：豁免轻疾险
	new selectOne($("#riskCodes"), "附加险", renderData.data.riskCodes, riskCodes).init();

	var orginX = parsObj.extraParams.riskCodes;

	function riskCodes(content, value) {
		var x = [];
		if (!Object.is(value, "null")) x.push(value);
		parsObj.extraParams.riskCodes = orginX.split(',').concat(x).join(',');
		getPrem();
		return true;
	}


	// 逻辑:获取保费 并 存储rrbxSet
	// 条件:核保参数:ntriObj;全局参数:rrbxSetObj
	function getPrem() {
		var ntriObj = parsObj.rrbx;
		ntriObj["extraParams"] = parsObj.extraParams;

		premAjax(ntriObj, function(value) {
			$("#prem").text(value + "元");
			parsObj.extraParams.prem = value;
			rrbxSetObj.insuredPars.pars = parsObj;

			// 投保费用限制
			insureFilter(value);
			localStorage.setItem(rrbxSetObj.insuredPars.parsInit.rrbx.rrbxProductId, JSON.stringify(rrbxSetObj));
		});
	}

	// 逻辑:投保条件过滤
	// 条件:保费累计20万及以上需身份证复印件等等
	var payYear = {
		"1": 1,
		"4": 10,
		"6": 20,
		"8": 30,
		"9": 60
	};

	function insureFilter(prem) {
		var birthday = parsObj.extraParams.insuredBirthday;
		var age = dateUnit.getAgeFromBirthday(birthday).age;
		var num = payYear[parsObj.extraParams.payEndYear];
		var totalPrem = Object.is(num, "60") ? (60 - age) * prem : prem * num;
		if (totalPrem > 200000) {
			alertPrem({
				"title": "温馨提示",
				"textOne": "您好,根据保监会规定,累计保费总额不得高于20万元(年交保费*交费年期)",
				"textTwo": "建议您降低基本额度,分成2~3次投保,保障权益不变!",
				"buttonText": "了解",
				"footerText": {
					"title": "客服电话",
					"tel": "400-772-2928"
				}
			});
			return;
		};
	}

	/**
	 * 	业务逻辑区域 end
	 */
};
export default serviceLogic;