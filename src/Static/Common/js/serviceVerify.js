// 描述:点击立即购买后,验证已输入的参数是否正确
import validate from '../../Depend/validate.js';
const serviceVerify = function() {
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
export default serviceVerify;