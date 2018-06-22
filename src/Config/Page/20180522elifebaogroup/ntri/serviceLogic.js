import premAjax from '../../../../Static/js/depend/datas/premAjax.js';
import dateUnit from '../../../../Static/js/depend/tools/dateUnit.js';
import {
	consultServie,
	dateModal
} from '../../../../Static/js/common/modal.js';
import npro_support_plan_tab from '../../../../Moudle/npro/npro_support_plan_tab.js';
import selectDate from '../../../../Static/js/depend/tools/selectDate.js';
import selectOne from '../../../../Static/js/depend/tools/selectOne.js';
import socialSecurityData from './socialSecurityData.js';

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

	// 逻辑: 切换方案
	// 条件:
	$("#pt-sp-nav").on('click', 'a', function(event) {
		event.preventDefault();

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
		}
	});

	const tabLogic = (tag) => {
		$("#pt-sp-content").empty().append(npro_support_plan_tab(renderData.insurancePlan[tag]));
	}

	// 被保人出生日期
	new selectDate($("#birthday"), "birthday", '2000-01-01', 66, 1, birthday).init();

	function birthday(value) {
		var flag = dateUnit.getAgeRangeState(value, {
			"ageDay": 28
		}, {
			"age": 65
		});

		if (!flag) {
			new dateModal(null, "stateIndform", "被保人年龄最小28天，最大65周岁").init().show();
			return false;
		} else {
			parsObj.extraParams.birthday = value;
			getPrem();
			return true;
		};
	}

	// 逻辑:选择保障期限
	// 条件:...
	new selectOne($("#socialSecurity"), "保障期限", socialSecurityData, socialSecurity).init();

	function socialSecurity(content, value){
		parsObj.extraParams.socialSecurity = value;
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