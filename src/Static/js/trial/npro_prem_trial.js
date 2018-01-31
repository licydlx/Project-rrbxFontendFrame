import npro_support_plan_tab from '../../../Moudle/npro/npro_support_plan_tab.js';
const e_npro_prem_trial = function(obj) {
	
	let productId = JSON.parse(localStorage.getItem('productId')),
		defaultPlan = $("#pt-sp-nav .active");
	localStorage.setItem(productId, JSON.stringify({
		'productSeriesId': defaultPlan.attr("data-id"),
		'insureId': defaultPlan.attr("data-insureid"),
		'periodPremium': defaultPlan.attr("data-price"),
		'prem': defaultPlan.attr("data-price"),
		'amnt': defaultPlan.attr("data-value"),
		'tag': defaultPlan.attr("data-tag")
	}));

	$("#pt-sp-nav").on('click', 'a', function(event) {
		event.preventDefault();

		let that = $(this),
			[productSeriesId, insureId, periodPremium, prem, amnt, tag] =
			['data-id', 'data-insureid', 'data-price', 'data-price', 'data-value', 'data-tag'].map(function(value, index) {
				return that.attr(value);
			});

		if (!that.hasClass("active")) {
			that.closest('ul').find('a').removeClass('active');
			that.addClass("active");

			tabLogic(tag);
			clacPrem({
				productSeriesId,
				insureId,
				periodPremium,
				prem,
				amnt,
				tag
			});
		}
	});

	const clacPrem = (pars) => {
		let storageObj = JSON.parse(localStorage.getItem(productId));
		for (let i in storageObj) {
			storageObj[i] = pars[i];
		}

		$("#prem").text(pars["prem"] + "元");
		localStorage.setItem(productId, JSON.stringify(storageObj));
	}

	const tabLogic = (tag) => {
		$("#pt-sp-content").empty().append(npro_support_plan_tab(obj.insurancePlan[tag]));
	}

};

export default e_npro_prem_trial;