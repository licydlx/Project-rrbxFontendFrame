var e_npro_consult = (function() {
	var html = "";
	html += '<section id="service-pop" class="app-fix hide">';
	html += '<div class="order">';
	html += '<ul>';
/*	html += '<li data-nav="reservation">预约专业保险顾问</li>';*/
	html += '<li><a href="tel:400-772-2928">客服电话 400-772-2928</a></li>';
	html += '</ul>';
	html += '<aside cancel="">取消</aside>';
	html += '</div>';
	html += '<div class="shadow" cancel=""></div>';
	html += '</section>';

	$("body").append(html);

	// 打开客服咨询弹框
	$("#container").on("click", "#service", function() {
		$("#service-pop").removeClass("hide");
	});

	// 取消客服咨询弹框
	$('#service-pop [cancel]').click(function() {
		servicePopHide();
	});

	// 客服咨询
	$('#service-pop li').click(function() {
		var me = $(this);
		var nav = me.data('nav');
		servicePopHide(function() {
			if (nav == 'reservation') {
				showReservation();
			}
		});
	});

	function servicePopHide(callback) {
		$(".order").addClass("fade");
		setTimeout(function() {
			$(".app-fix").addClass("hide");
			$(".order").removeClass("fade");
			if (callback) callback();
		}, 450);
	}
})();

export default e_npro_consult;