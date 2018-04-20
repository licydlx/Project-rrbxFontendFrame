import premAjax from '../../../../Static/js/depend/datas/premAjax.js';
import {
	consultServie,
	dateModal
} from '../../../../Static/js/common/modal.js';
import dateUnit from '../../../../Static/js/depend/tools/dateUnit.js';
import selectDate from '../../../../Static/js/depend/tools/selectDate.js';
import npro_support_plan_tab from '../../../../Moudle/npro/npro_support_plan_tab.js';

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
	// 逻辑:根据保障方案变化改变方案id及保额并重新计算保费
	// 条件:经典版:id,保额;尊享版:id,保额;
	$("#pt-sp-nav").on('click', 'a', function(event) {
		event.preventDefault();
		let that = $(this),
			[productSeriesId, periodPremium, insAmount, insureId, tag] =
			['data-id', 'data-price', 'data-value', 'data-insureid', 'data-tag'].map(function(value, index) {
				return that.attr(value);
			});
		if (!that.hasClass("active")) {
			that.closest('ul').find('a').removeClass('active');
			that.addClass("active");
			tabLogic(tag);

			parsObj.productSeriesId = productSeriesId;
			parsObj.periodPremium = periodPremium;
			parsObj.extraParams.insureId = insureId;

			getPrem();
		}
	});
	const tabLogic = (tag) => {
		$("#pt-sp-content").empty().append(npro_support_plan_tab(renderData.insurancePlan[tag]));
	}

	// 逻辑:根据出生日期变化重新计算保费
	// 条件:被保人年龄区间 --大于50周岁,小于90周岁
	new selectDate($("#birthday"), "birthday", '1960-01-01', 91, -49, birthday).init();

	function birthday(value) {
		var flag = dateUnit.getAgeRangeState(value, {
			"age": 50
		}, {
			"age": 90
		});

		if (!flag) {
			new dateModal(null, "stateIndform", "被保人年龄最小50周岁，最大90周岁").init().show();
			return false;
		} else {
			parsObj.extraParams.birthday = value;
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