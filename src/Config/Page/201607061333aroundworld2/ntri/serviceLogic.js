// 平台识别
// if (GV && Object.is(GV.sceneType, '3')) {
// 	$(".mg-b-footer").css("margin-bottom", "1rem");
// };
import npro_support_plan_tab from '../../../../Moudle/npro/npro_support_plan_tab.js';
import getPrem from '../../../../Static/js/depend/datas/premAjax.js';
import {
	consultServie
} from '../../../../Static/js/common/modal.js';

const serviceLogic = function(obj) {
	// 客服咨询
	new consultServie("consultService","#service","#service-pop").init();

	var initAgeRange = obj.initTrialSet.pars.extraParams.ageRange,
		initDataVal = obj.initTrialSet.pars.extraParams.dataVal,
		initInsureId = obj.initTrialSet.pars.extraParams.insureId,
		initPrem = obj.initTrialSet.result.prem;

	obj.trialSet.pars.extraParams.ageRange = initAgeRange;
	obj.trialSet.pars.extraParams.dataVal = initDataVal;
	obj.trialSet.pars.extraParams.insureId = initInsureId;
	obj.trialSet.result.prem = initPrem;

	var ajaxData = obj.trialSet.pars;
	getPrem(obj, ajaxData);
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
			tabLogic(tag);
			ajaxData.productSeriesId = productSeriesId;
			ajaxData.extraParams.insureId = insureId;
			obj.trialSet.result.periodPremium = periodPremium;
			getPrem(obj, ajaxData);
		}
	});
	const tabLogic = (tag) => {
		$("#pt-sp-content").empty().append(npro_support_plan_tab(obj.insurancePlan[tag]));
	}

	$(".tab").on('click', 'a', function(event) {
		event.preventDefault();
		var that = $(this);
		if (!that.hasClass("active")) {
			that.closest('ul').find('a').removeClass('active');
			that.addClass("active");
		}

		ajaxData.extraParams.ageRange = that.attr("data-id");
		getPrem(obj, ajaxData);
	});

	var selectedDom = $("#guaPeriod");

	selectedDom.click(function(event) {
		event.preventDefault();
		new IosSelect(1, [obj.guaPeriod], {
			container: '#container',
			title: '保期选择',
			itemHeight: 35,
			itemShowCount: 4,
			oneLevelId: selectedDom.attr('data-id'),
			showAnimate: true,
			callback: function(selectObj) {
				selectedDom.attr('data-id', selectObj.id);
				selectedDom.attr('value', selectObj.value);

				ajaxData.extraParams.dataVal = selectObj.id;
				getPrem(obj, ajaxData);
			}
		});
	});
};
export default serviceLogic;