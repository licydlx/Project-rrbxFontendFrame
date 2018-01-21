var e_npro_prem_trial = (function() {
	$(document).on("click", "#buy-now", function() {
		$(this).addClass("active").text("立即购买");
		$("#container .prem-trial").css("top", "0");
	});

	$(document).on("click", "#pt-close", function() {
		$("#buy-now").removeClass("active").text("保费试算");
		$("#container .prem-trial").css("top", "100%");
		$("#prem").text("60元");
	});
	/*	$("#container").on("click", "#f-trigger", clickFt);
		function clickFt() {
			var that = $(this).prev();
			if (that.hasClass('active')) {
				that.removeClass("active");
			} else {
				that.addClass("active");
			};
		}*/
	$("#container").on("click", "#pt-sp-nav a", function() {
		var that = $(this),
			tag = that.attr("data-tag"),
			prem = that.attr("data-price"),
			amnt = that.attr("data-value"),
			scheme = that.attr("data-id");
		if (!that.hasClass("active")) {
			that.closest('ul').find('a').removeClass('active');
			that.addClass("active");
		}
		if (tag == 0) {
			$("#pt-sp-content li:first-child span:nth-child(2)").text("10万");
			$("#pt-sp-content li:nth-child(2) span:nth-child(2)").text("1万");
			$("#prem").text("60元");

			localStorage.setItem('prem', prem);
			localStorage.setItem('amnt', amnt);
			localStorage.setItem('scheme', scheme);
		} else if (tag == 1) {
			$("#pt-sp-content li:first-child span:nth-child(2)").text("20万");
			$("#pt-sp-content li:nth-child(2) span:nth-child(2)").text("2万");
			$("#prem").text("120元");
			localStorage.setItem('prem', prem);
			localStorage.setItem('amnt', amnt);
			localStorage.setItem('scheme', scheme);
		} else if (tag == 2) {
			$("#pt-sp-content li:first-child span:nth-child(2)").text("30万");
			$("#pt-sp-content li:nth-child(2) span:nth-child(2)").text("3万");

			$("#prem").text("180元");
			localStorage.setItem('prem', prem);
			localStorage.setItem('amnt', amnt);
			localStorage.setItem('scheme', scheme);
		};
	});
})();

export default e_npro_prem_trial;