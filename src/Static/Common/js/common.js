// 描述:页面全局绑定事件

const common = function(config) {
	if (!config.PZ.eventPZ.common) alert("请配置common事件");
	if (config.PZ.eventPZ.belong == "npro") {
		$("#container").on("click", ".trigger", function(event) {
			event.preventDefault();
			let that = $(this).prev();
			that.hasClass('active') ? that.removeClass("active") : that.addClass("active");
		});
	}

	if (config.PZ.eventPZ.belong == "nbuy") {
		$('#container').on('click', '.box > .header', function(event) {
			event.preventDefault();
			var $this = $(this),
				$next = $this.next();
			$next.slideToggle();
			$this.parent().toggleClass('open');
		});
	}

};

export default common;