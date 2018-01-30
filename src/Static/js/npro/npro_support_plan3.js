import npro_support_plan_tab from '../../../Moudle/npro/npro_support_plan_tab.js';

const e_npro_support_plan3 = (obj) => {
	let clickSn = (event) => {
			event.preventDefault();
			let that = $(event.target);
			let [tag, tar] = [that.attr("data-tag"), $("#sp-wire")];
			if (!that.hasClass("active")) {
				that.closest('ul').find('a').removeClass('active');
				that.addClass("active");
				tabLogic(tag, tar);
			};
		},
		clickSc = (event) => {
			event.preventDefault();
			let that = $(this),
				sii = that.find(".sp-icon-img");
			that.find("+ .sp-con-details").toggle();
			if (!sii.hasClass('active')) {
				sii.addClass("active");
			} else {
				sii.removeClass("active");
			};
		},
		tabLogic = (tag, tar) => {
			switch (tag) {
				case "0":
					tar.css("margin-left", "0");
					break;
				case "1":
					tar.css("margin-left", "33.33%");
					break;
				case "2":
					tar.css("margin-left", "66.66%");
					break;
			}
			$("#sp-content").empty().append(npro_support_plan_tab(obj.insurancePlan[tag]));
		};

	$("#sp-nav").on("click", "a", clickSn);
	$("#sp-content").on("click", "a", clickSc);
};

export default e_npro_support_plan3;