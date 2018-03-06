const e_npro_common = function() {
	$("#container").on("click", ".trigger", function(event) {
		event.preventDefault();
		let that = $(this).prev();
		that.hasClass('active') ? that.removeClass("active") : that.addClass("active");
	});
};

export default e_npro_common;