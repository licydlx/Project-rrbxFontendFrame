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
		var type = $this.attr("data-type");
		var state = validate.contrast($this.val(), type);
		if (state) {
			$this.closest("li").addClass('right');
			/*storeValue(a, $this);*/
		} else {
			$this.closest("li").addClass('error');
		};
	});

	/*	function storeValue(obj, that) {
			var belong = that.attr("data-belong"),
			type = that.attr("data-type");

			if (belong && type) {
				obj[belong][type] = $.trim(that.text());
			};
			
		}*/

};
export default e_nbuy_validate;