const e_npro_faq = (() => {
	var clickFt = function(event){
		event.preventDefault();
		let that = $(this).prev();
		that.hasClass('active') ? that.removeClass("active") : that.addClass("active");
	}
	$("#container").on("click", "#f-trigger", clickFt);
})();

export default e_npro_faq;