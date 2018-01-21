var e_npro_header = setTimeout(function() {
	$("#container .pro-text").css("left", "0");
	setTimeout(function() {
		$("#container .pro-text p").show();
	},500);

	setTimeout(function() {
		$("#container .pro-text").css("left", "100%");
		$("#container .pro-text p").hide();
		$("#container .pt-right").addClass('pt-show');
	}, 3000);

	$("#container").on("click", ".pt-right", function() {
		$("#container .pro-text").css("left", "0");
		$(this).removeClass('pt-show');

		setTimeout(function() {
			$("#container .pro-text p").show();
			$("#container .pt-left").addClass('pt-show');
		}, 500);
	});

	$("#container").on("click", ".pt-left", function() {
		$("#container .pro-text").css("left", "100%");
		$(this).removeClass('pt-show');
		$("#container .pro-text p").hide();
		setTimeout(function() {
			$("#container .pro-text p").hide();
			$("#container .pt-right").addClass('pt-show');
		}, 500);
	});
}, 600);

export default e_npro_header;