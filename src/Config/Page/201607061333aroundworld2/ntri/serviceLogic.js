// 平台识别
// if (GV && Object.is(GV.sceneType, '3')) {
// 	$(".mg-b-footer").css("margin-bottom", "1rem");
// };
// const productConfig = require('../../config.json');
import npro_support_plan_tab from '../../../../Moudle/npro/npro_support_plan_tab.js';

const serviceLogic = function(obj) {
	console.log(obj);
	var ajaxData = obj.trialSet.pars;
	getPrem(ajaxData);
	$("#pt-sp-nav").on('click', 'a', function(event) {
		event.preventDefault();

		let that = $(this),
			[productSeriesId, insureId, tag] =
			['data-id', 'data-insureid', 'data-tag'].map(function(value, index) {
				return that.attr(value);
			});

		if (!that.hasClass("active")) {
			that.closest('ul').find('a').removeClass('active');
			that.addClass("active");

			tabLogic(tag);

			ajaxData.productSeriesId = productSeriesId;
			ajaxData.extraParams.insureId = insureId;
			getPrem(ajaxData);
		}
	});

	const tabLogic = (tag) => {
		$("#pt-sp-content").empty().append(npro_support_plan_tab(obj.insurancePlan[tag]));
	}

	// 获取保费
	function getPrem(pars) {
		const promise = new Promise(function(resolve, reject) {
			var data = JSON.stringify(pars);
			$.ajax({
				type: "POST",
				url: "https://uatapi2.renrenbx.com/mobile/nproduct/trialCalculation",
				data: "productId=" + pars.rrbxProductId + "&data=" + data,
				beforeSend: function() {},
				success: function(data) {
					if (data.code == 10000) {
						resolve(data.response);
					};
				},
				error: function(xhr, type) {},
				complete: function(xhr, status) {}
			});	
		});
		promise.then(function(value) {
			setPremText(value);
		}, function(error) {
			console.log(error);
		});

	}

	$(".tab").on('click', 'a', function(event) {
		event.preventDefault();
		var that = $(this);
		if (!that.hasClass("active")) {
			that.closest('ul').find('a').removeClass('active');
			that.addClass("active");
		}

		ajaxData.extraParams.ageRange = that.attr("data-id");
		getPrem(ajaxData);
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
				getPrem(ajaxData, setPremText());
			}
		});
	});

	function setPremText(pars) {
		$("#prem").text(pars+"元");
		obj.trialSet.result.prem = pars;
		localStorage.setItem(obj.trialSet.pars.rrbxProductId, JSON.stringify(obj));
	}
};
export default serviceLogic;