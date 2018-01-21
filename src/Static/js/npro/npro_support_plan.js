var e_npro_support_plan = function() {
	$("#sp-nav").on("click", "a", clickSn);

	function clickSn() {
		var that = $(this);
		if (!that.hasClass("active")) {
			that.closest('ul').find('a').removeClass('active');
			that.addClass("active");
			var tag = that.attr("data-tag"),
				prem = that.attr("data-price"),
				amnt = that.attr("data-value"),
				scheme = that.attr("data-id"),
				tar = $("#sp-wire");
			if (tag == 0) {
				tar.css("margin-left", "0");
				$("#sp-content li:first-child span:nth-child(2)").text("10万");
				$("#sp-content li:nth-child(2) span:nth-child(2)").text("1万");
			} else if (tag == 1) {
				tar.css("margin-left", "33.3%");
				$("#sp-content li:first-child span:nth-child(2)").text("20万");
				$("#sp-content li:nth-child(2) span:nth-child(2)").text("2万");
			} else if (tag == 2) {
				tar.css("margin-left", "66.6%");
				$("#sp-content li:first-child span:nth-child(2)").text("30万");
				$("#sp-content li:nth-child(2) span:nth-child(2)").text("3万");
			};
		};
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

export default e_npro_support_plan;