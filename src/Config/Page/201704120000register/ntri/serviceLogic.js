import premAjax from '../../../../Static/js/depend/datas/premAjax.js';
import {
	consultServie,
	dateModal
} from '../../../../Static/js/common/modal.js';
import dateUnit from '../../../../Static/js/depend/tools/dateUnit.js';
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
	// 条件:普惠版:id,保额;尊享版:id,保额;
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

	// 逻辑:根据有无附加险重新计算保费
	// 条件:0:无；1:有；
	// 逻辑:根据附加被保人-父母重新计算保费
	// 条件:0:未选；1:选中；
	// 逻辑:根据附加被保人-配偶重新计算保费
	// 条件:0:未选；1:选中；
	// 逻辑:根据附加被保人-子女重新计算保费
	// 条件:0:未选；1:选中；
	// 逻辑:根据附加被保人-其他重新计算保费
	// 条件:0:未选；1:选中；
	$("#container").on('click', '.singleSelect a', function(event) {
		event.preventDefault();
		var $this = $(this),
			tagId = $this.closest("ul").attr("id"),
			value = $this.attr("data-id");

		if (!$this.closest("li").hasClass("active")) {
			$this.closest("ul").find("li").removeClass("active");
			$this.closest("li").addClass("active");

			parsObj.extraParams[tagId] = value;
			getPrem();
		}
	});

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