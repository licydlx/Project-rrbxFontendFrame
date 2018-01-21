import npro_support_plan_tab from '../../../Moudle/npro/npro_support_plan_tab.js';
var e_npro_prem_trial = function(obj) {
	var data = [{
		'id': '1',
		'value': '1-15天'
	}, {
		'id': '2',
		'value': '16-30天'
	}, {
		'id': '3',
		'value': '31-60天'
	}, {
		'id': '4',
		'value': '61-90天'
	}, {
		'id': '5',
		'value': '91-180天'
	}, {
		'id': '6',
		'value': '全年(最长366天)'
	}];
	var productId = JSON.parse(localStorage.getItem('productId')),
		ls = localStorage.getItem(productId);
	if (ls) {
		ls = JSON.parse(ls);
		$("#prem").text(ls.buyPrice + '元').attr('data-value', ls.buyPrice);
		$("#pt-sp-nav a").removeClass('active');
		$("#pt-sp-nav a[data-tag=" + ls.tag + "]").addClass("active");

		$("#showRela").text(data[parseInt(ls.dataVal) - 1].value).attr("data-id", ls.dataVal);
		tabLogic(ls.tag);
	} else {
		var defaultPlan = $("#pt-sp-nav .active");
		localStorage.setItem(productId, JSON.stringify({
			'productSeriesId': defaultPlan.attr("data-id"),
			'insureId': defaultPlan.attr("data-insureid"),
			'dataVal': $("#showRela").attr("data-id"),
			'periodPremium': defaultPlan.attr("data-price"),
			'buyPrice': $("#prem").attr("data-id"),
			'tag': defaultPlan.attr("data-tag")
		}));
	}

	/* 保费试算 */
	/* ydlx */
	/* 2018-1-10 */
	var dataSet = {
		"ASAP1": {
			"1": 170,
			"2": 280,
			"3": 390,
			"4": 500,
			"5": 650,
			"6": 1000
		},
		"ASAP2": {
			"1": 320,
			"2": 450,
			"3": 580,
			"4": 650,
			"5": 700,
			"6": 1100
		},
		"ASAP3": {
			"1": 490,
			"2": 620,
			"3": 750,
			"4": 880,
			"5": 1400,
			"6": 2200
		}
	};

	var showRelaDom = document.querySelector('#showRela'),
		relaIdDom = document.querySelector('#relaId');

	showRelaDom.addEventListener('click', function() {
		var relaId = showRelaDom.dataset['id'],
			bankSelect = new IosSelect(1, [data], {
				container: '.container',
				title: '期限选择',
				itemHeight: 50,
				itemShowCount: 3,
				oneLevelId: relaId,
				showAnimate: true,
				callback: function(selectOneObj) {
					relaIdDom.value = selectOneObj.id;
					showRelaDom.innerHTML = selectOneObj.value;
					showRelaDom.dataset['id'] = selectOneObj.id;
					showRelaDom.dataset['value'] = selectOneObj.value;
					clacPrem("", "", selectOneObj.id, "");
				}
			});
	});

	function clacPrem(productSeriesId, insureId, id, tag) {
		if (insureId == "") {
			insureId = $("#pt-sp-nav .active").attr("data-insureid");
		};
		if (id == "") {
			id = $("#showRela").attr("data-id");
		};
		if (tag == "") {
			tag = $("#pt-sp-nav .active").attr("data-tag");
		};
		var buyPrice = dataSet[insureId][id],
			prem = dataSet[insureId]["1"];
		$("#prem").text(dataSet[insureId][id] + "元").attr("data-id", dataSet[insureId][id]);

		var lsObj = JSON.parse(localStorage.getItem(productId));
		lsObj.insureId = insureId;
		lsObj.periodPremium = prem;
		lsObj.buyPrice = buyPrice;
		lsObj.dataVal = id;
		lsObj.tag = tag;
		if (productSeriesId != "") {
			lsObj.productSeriesId = productSeriesId;
		};
		localStorage.setItem(productId, JSON.stringify(lsObj));
	}

	$(document).on("click", "#pt-close", function() {
		window.history.go(-1);
	});

	$(document).on("click", "#pt-sp-nav a", function() {
		var that = $(this),
			tag = that.attr("data-tag"),
			prem = that.attr("data-price"),
			insureId = that.attr("data-insureid"),
			scheme = that.attr("data-id"),
			tag = that.attr("data-tag");

		if (!that.hasClass("active")) {
			that.closest('ul').find('a').removeClass('active');
			that.addClass("active");

			tabLogic(tag);
		}
		clacPrem(scheme, insureId, "", tag);
	});

	function tabLogic(tag) {
		var content = $("#sp-content");
		switch (tag) {
			case "0":
				$("#pt-sp-content").empty().append(npro_support_plan_tab(obj.insurancePlan[tag]));
				break;
			case "1":
				$("#pt-sp-content").empty().append(npro_support_plan_tab(obj.insurancePlan[tag]));
				break;
		}
	}
};

export default e_npro_prem_trial;