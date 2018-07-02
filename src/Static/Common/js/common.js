const common = function(PZ) {
	if (!PZ.eventPZ.common) alert("请配置common事件");
	if (PZ.eventPZ.belong == "npro") {
		$("#container").on("click", ".trigger", function(event) {
			event.preventDefault();
			let that = $(this).prev();
			that.hasClass('active') ? that.removeClass("active") : that.addClass("active");
		});
	}
};

export default common;