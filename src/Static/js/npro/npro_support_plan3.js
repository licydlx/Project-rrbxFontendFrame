import npro_support_plan_tab from '../../../Moudle/npro/npro_support_plan_tab.js';
var e_npro_support_plan3 = function(obj) {
	$("#sp-nav").on("click", "a", clickSn);

	function clickSn() {
		var that = $(this),
			tag = that.attr("data-tag"),
			tar = $("#sp-wire");
		if (!that.hasClass("active")) {
			that.closest('ul').find('a').removeClass('active');
			that.addClass("active");
			tabLogic(tag, tar);
		};
	}

	function tabLogic(tag, tar) {
		var content = $("#sp-content");
		switch (tag) {
			case "0":
				tar.css("margin-left", "0");
				$("#sp-content").empty().append(npro_support_plan_tab(obj.insurancePlan[tag]));
				break;
			case "1":
				tar.css("margin-left", "33.33%");
				$("#sp-content").empty().append(npro_support_plan_tab(obj.insurancePlan[tag]));
				break;
			case "2":
				tar.css("margin-left", "66.66%");
				$("#sp-content").empty().append(npro_support_plan_tab(obj.insurancePlan[tag]));
				break;
		}
	}
	$("#sp-content").on("click", "a", clickSc);

	function clickSc() {
		var that = $(this),
			sii = that.find(".sp-icon-img");
		that.find("+ .sp-con-details").toggle();
		if (!sii.hasClass('active')) {
			sii.addClass("active");
		} else {
			sii.removeClass("active");
		};
	}
};

export default e_npro_support_plan3;