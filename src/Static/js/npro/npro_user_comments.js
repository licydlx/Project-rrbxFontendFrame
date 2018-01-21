var e_npro_user_comments = (function() {
	$("#container").on("click", "#uc-trigger", clickFt);
	function clickFt() {
		var that = $(this).prev();
		if (that.hasClass('active')) {
			that.removeClass("active");
		} else {
			that.addClass("active");
		};
	}
})();

export default e_npro_user_comments;