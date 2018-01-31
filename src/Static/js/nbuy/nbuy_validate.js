import validate from '../../../Depend/custom/validate.js';
const e_nbuy_validate = function() {
	$("#container").on("focus", "input", function() {
		$(this).closest("li").removeAttr('class');
	});

	$("#container").on("blur", "input", function() {
		let that = $(this),
			verify = that.attr("data-verify"),
			state = validate.contrast(that.val(), verify);

		if (that.attr("readonly")) {
			return;
		}
		state ? that.closest("li").addClass('right') : that.closest("li").addClass('error');
	});
};
export default e_nbuy_validate;