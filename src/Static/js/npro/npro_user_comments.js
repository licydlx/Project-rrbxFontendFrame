const e_npro_user_comments = (() => {
	var clickFt = function(event) {
		event.preventDefault();
		let that = $(this).prev();
		that.hasClass('active') ? that.removeClass("active") : that.addClass("active");
	}
	$("#container").on("click", "#uc-trigger", clickFt);
})();

export default e_npro_user_comments;