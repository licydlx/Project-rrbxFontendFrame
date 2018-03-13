var e_buy_fold = function() {
	class Accordion {
		constructor(el, multiple) {
			this.el = el || {};
			this.multiple = multiple || false;
			var relatedPerson = this.el;
			relatedPerson.on('click', {
				el: this.el,
				multiple: this.multiple
			}, this.dropdown);
		}
		dropdown(e) {
			var $el = e.data.el,
				$this = $(this),
				$next = $this.next();
			$next.slideToggle();
			$this.parent().toggleClass('open');
		}
	}
	new Accordion($('.box .header'), false);
}
export default e_buy_fold;