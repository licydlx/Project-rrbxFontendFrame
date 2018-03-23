import {
	consultServie,
	dateModal
} from '../../../../Static/js/common/modal.js';
import premAjax from '../../../../Static/js/depend/datas/premAjax.js';
import selectDate from '../../../../Static/js/depend/tools/selectDate.js';
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

	getPrem(rrbxSetObj);
	
	// 保障计划
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
			getPrem(rrbxSetObj);
		}
	});
	const tabLogic = (tag) => {
		$("#pt-sp-content").empty().append(npro_support_plan_tab(renderData.insurancePlan[tag]));
	}

	// 日期选择 实例化
	new selectDate($("#birthday"), "birthday", parsObj.extraParams.birthday, 51, -17, birthday).init();

	function birthday(value) {
		var flag = dateUnit.getAgeRangeState(value, {
			"age": 18
		}, {
			"age": 50
		});

		if (!flag) {
			new dateModal(null, "stateIndform", "被保人年龄最小18周岁，最大50周岁").init().show();
			return false;
		} else {
			parsObj.extraParams.birthday = value;

			getPrem(rrbxSetObj);
			return true;
		};
	}

	// 单选 委托绑定
	// 作者:ydlx
	// 日期:2018-03-23
	$(".singleSelect").on('click', 'a', function(event) {
		event.preventDefault();
		var $this = $(this),
			tagId = $this.closest(".content").attr("id"),
			val = $this.attr("data-id");

		if (!$this.closest("li").hasClass("active")) {
			$this.closest(".content").find("li").removeClass("active");
			$this.closest("li").addClass("active");
		}
		switch (tagId) {
			// 性别
			case "sex":
				parsObj.extraParams[tagId] = val;
				break;
		}
		getPrem(rrbxSetObj);
	});


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