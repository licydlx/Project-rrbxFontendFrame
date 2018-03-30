import {
	consultServie,
	dateModal
} from '../../../../Static/js/common/modal.js';

import premAjax from '../../../../Static/js/depend/datas/premAjax.js';
import selectDate from '../../../../Static/js/depend/tools/selectDate.js';
import selectOne from '../../../../Static/js/depend/tools/selectOne.js';
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
			"data-id": value.selectOneObj.id + "," + value.selectTwoObj.id + "," + value.selectThreeObj.id,
			"value": value.selectOneObj.value + "," + value.selectTwoObj.value + "," + value.selectThreeObj.value
		});
		areaTag = false;
		limitAreaArray.forEach(function(x, y, z) {
			if (Object.is(x, value.selectTwoObj.id)) {
				areaTag = true;
			} else {
				$("#amnt").attr("value", "10");
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
		if (Object.is(areaTag, false) && parseInt(value) > 30) {
			new dateModal(null, "stateIndform", "您所在地区不支持30万以上保额").init().show();
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
		parsObj.extraParams.payEndYear = value;
		parsObj.extraParams.payIntv = Object.is(value, "1") ? "D" : "Y";
		getPrem();
		return true;
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
			localStorage.setItem(rrbxSetObj.insuredPars.parsInit.rrbx.rrbxProductId, JSON.stringify(rrbxSetObj));
		});
	}

	/**
	 * 	业务逻辑区域 end
	 */
};
export default serviceLogic;