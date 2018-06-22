import premAjax from '../../../../Static/js/depend/datas/premAjax.js';
import {
	consultServie
} from '../../../../Static/js/common/modal.js';
import npro_support_plan_tab from '../../../../Moudle/npro/npro_support_plan_tab.js';
import {
	dateModal
} from '../../../../Static/js/common/modal.js';
import selectOne from '../../../../Static/js/depend/tools/selectOne.js';

import insuYearData from './insuYearData.js';
import exAmntData from './exAmntData.js';
import ageRangData from './ageRangData.js';

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
	var covData = {
		"plan": [10, 30, 50],
		"age": [20, 50],
		"added": [0, 10, 20, 40, 40]
	};

	getPrem();
	// 逻辑: 切换方案
	// 条件:
	$("#pt-sp-nav").on('click', 'a', function(event) {
		event.preventDefault();
		var ageTag = parseInt($("#ageRang").attr("data-id")),
			dataTag = parseInt($(this).attr("data-tag")),
			addedTag = parseInt($("#exAmnt").attr("data-id"));

		if (covData.plan[dataTag] + covData.added[addedTag] > covData.age[ageTag]) {
			new dateModal(null, "stateIndform", "所选总保额超过该年龄段最高保额").init().show();
		} else {
			let that = $(this),
				[productSeriesId, insureId, tag, periodPremium] =
				['data-id', 'data-insureid', 'data-tag', 'data-price'].map(function(value, index) {
					return that.attr(value);
				});
			if (!that.hasClass("active")) {
				that.closest('ul').find('a').removeClass('active');
				that.addClass("active");

				parsObj.rrbx.periodPremium = periodPremium;
				parsObj.rrbx.productSeriesId = productSeriesId;
				parsObj.extraParams.insureId = insureId;

				tabLogic(tag);
				getPrem();
			};
		}
	});

	const tabLogic = (tag) => {
		$("#pt-sp-content").empty().append(npro_support_plan_tab(renderData.insurancePlan[tag]));
	}

	// 逻辑:选择保障期限
	// 条件:...
	new selectOne($("#insuYear"), "保障期限", insuYearData, insuYear).init();

	function insuYear(content, value) {
		parsObj.extraParams.insuYear = value;
		parsObj.extraParams.insuYearFlagType = Object.is(value, "1") ? "Y" : "M";
		getPrem();
		return true;
	}

	// 逻辑:选择附加保额
	// 条件:...
	new selectOne($("#exAmnt"), "附加保额", exAmntData, exAmnt).init();

	function exAmnt(content, value) {
		var ageTag = parseInt($("#ageRang").attr("data-id")),
			dataTag = parseInt($("#pt-sp-nav a.active").attr("data-tag")),
			addedTag = parseInt(value);
		if (covData.plan[dataTag] + covData.added[addedTag] > covData.age[ageTag]) {
			new dateModal(null, "stateIndform", "所选总保额超过该年龄段最高保额").init().show();
			return false;
		} else {
			parsObj.extraParams.exAmnt = value;
			getPrem();
			return true;
		}
	}

	// 逻辑:选择年龄范围
	// 条件:...
	new selectOne($("#ageRang"), "年龄范围", ageRangData, ageRang).init();

	function ageRang(content, value) {
		var ageTag = parseInt(value),
			dataTag = parseInt($("#pt-sp-nav a.active").attr("data-tag")),
			addedTag = parseInt($("#exAmnt").attr("data-id"));

		if (covData.plan[dataTag] + covData.added[addedTag] > covData.age[ageTag]) {
			new dateModal(null, "stateIndform", "所选总保额超过该年龄段最高保额").init().show();
			return false;
		} else {
			parsObj.extraParams.ageRang = value;
			getPrem();
			return true;
		}
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