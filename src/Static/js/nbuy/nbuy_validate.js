import validate from '../../../Depend/custom/validate.js';
var e_nbuy_validate = function(a) {
	$("#container").on("focus", "input", function() {
		$(this).closest("li").removeAttr('class');
	});

	$("#container").on("blur", "input", function() {
		var $this = $(this);
		if ($this.attr("readonly")) {
			return;
		}
		var verify = $this.attr("data-verify"),
		state = validate.contrast($this.val(), verify);
		if (state) {
			$this.closest("li").addClass('right');
		} else {
			$this.closest("li").addClass('error');
		};
	});
};
export default e_nbuy_validate;