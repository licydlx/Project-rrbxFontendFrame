import premAjax from '../../../../Static/js/depend/datas/premAjax.js';
import {
	consultServie,
	dateModal
} from '../../../../Static/js/common/modal.js';
import selectDate from '../../../../Static/js/depend/tools/selectDate.js';
import dateUnit from '../../../../Static/js/depend/tools/dateUnit.js';
import selectOne from '../../../../Static/js/depend/tools/selectOne.js';

import amntData from './amntData.js';
import feeYearData from './feeYearData.js';

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


	// 日期选择 实例化
	new selectDate($("#birthday"), "birthday", parsObj.extraParams.birthday, 56, 1, birthday).init();

	function birthday(value) {
		var flag = dateUnit.getAgeRangeState(value, {
			"ageDay": 28
		}, {
			"age": 55
		});

		if (!flag) {
			new dateModal(null, "stateIndform", "被保人年龄最小28天，最大55周岁").init().show();
			return false;
		} else {
			parsObj.extraParams.birthday = value;
			getPrem();
			return true;
		};
	}

	// 性别 特定疾病附加险 保障期限
	$(".singleSelect").on('click', 'a', function(event) {
		event.preventDefault();
		var $this = $(this),
			tagId = $this.closest(".content").attr("id"),
			val = $this.attr("data-id");

		if (!$this.closest("li").hasClass("active")) {
			$this.closest(".content").find("li").removeClass("active");
			$this.closest("li").addClass("active");
		}
		parsObj.extraParams[tagId] = val;
		getPrem();
	});


	new selectOne($("#amnt"), "保额选择", amntData, amnt).init();

	function amnt(content, value) {
		parsObj.extraParams.amnt = value;
		getPrem();
		return true;
	}

	new selectOne($("#feeYear"), "缴费年限", feeYearData, feeYear).init();

	function feeYear(content, value) {
		parsObj.extraParams.feeYear = value;
		getPrem();
		return true;
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