const e_npro_header = function() {
	let [proText, proTextState, proLeft, proRight] =
	[$("#container .pro-text"), $("#container .pro-text p"), $("#container .pt-left"), $("#container .pt-right")];

	proText.css("left", "0");

	setTimeout(function() {
		proTextState.show();
	}, 500);

	setTimeout(function() {
		proText.css("left", "100%");
		proTextState.hide();
		proRight.addClass('pt-show');
	}, 3000);

	$("#container").on("click", ".pt-right", function() {
		proText.css("left", "0");
		$(this).removeClass('pt-show');

		setTimeout(function() {
			proTextState.show();
			proLeft.addClass('pt-show');
		}, 500);
	});

	$("#container").on("click", ".pt-left", function() {
		proText.css("left", "100%");
		$(this).removeClass('pt-show');
		proTextState.hide();
		setTimeout(function() {
			proTextState.hide();
			proRight.addClass('pt-show');
		}, 500);
	});
};

export default e_npro_header;