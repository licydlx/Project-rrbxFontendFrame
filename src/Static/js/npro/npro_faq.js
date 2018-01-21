var e_npro_faq = (function () {
	$("#container").on("click", "#f-trigger", clickFt);
	function clickFt() {
		var that = $(this).prev();
		if (that.hasClass('active')) {
			that.removeClass("active");
		} else {
			that.addClass("active");
		};
	}
})();

export default e_npro_faq;