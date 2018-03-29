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
	// 客服咨询
	new consultServie("consultService", "#service", "#service-pop").init();

	getPrem();
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
	// =============================

	// 单选 事件委托绑定  
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

	// 投保人出生日期
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

	// 保额选择
	new selectOne($("#amnt"), "保额选择", renderData.data.amnt, amnt).init();

	function amnt(content, value) {
		parsObj.extraParams.amnt = value;
		getPrem();
		return true;
	}

	// 缴费年限
	new selectOne($("#payEndYear"), "缴费年限", renderData.data.payEndYear, payEndYear).init();

	function payEndYear(content, value) {
		parsObj.extraParams.payEndYear = value;
		parsObj.extraParams.payIntv = Object.is(value,"1") ? "D":"Y";
		getPrem();
		return true;
	}

	// 逻辑:附加险
	// 条件:WDDG:主险；WSDA：i保轻疾险；WSWP：豁免轻疾险
	new selectOne($("#riskCodes"), "附加险", renderData.data.riskCodes, riskCodes).init();

	var orginX = parsObj.extraParams.riskCodes;
	function riskCodes(content, value) {
		var x = [];
		if (!Object.is(value,"null")) x.push(value);

		parsObj.extraParams.riskCodes = orginX.split(',').concat(x).join(',');
		getPrem();
		return true;
	}


	// 获取保费 并 存储rrbxSet
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
};
export default serviceLogic;