import validate from '../../../Depend/custom/validate.js';
const e_nbuy_validate = function() {
	$("#container").on("focus", "input", function() {
		$(this).closest(".item").removeAttr('data-state');
	});

	$("#container").on("blur", "input", function() {
		let that = $(this);
		if (that.attr("readonly")) {
			return;
		}
		let verify = that.attr("data-verify"),
			state = validate.contrast(that.val(), verify);
		state ? that.closest(".item").attr('data-state','right') : that.closest(".item").attr('data-state','error');
	});
};
export default e_nbuy_validate;