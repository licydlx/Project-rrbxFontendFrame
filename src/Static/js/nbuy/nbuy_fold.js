var Accordion = function(el, multiple) {
	this.el = el || {};
	this.multiple = multiple || false;
	var relatedPerson = this.el;
	relatedPerson.on('click', {
		el: this.el,
		multiple: this.multiple
	}, this.dropdown);
}

Accordion.prototype.dropdown = function(e) {
	var $el = e.data.el,
		$this = $(this),
		$next = $this.next();
	$next.slideToggle();
	$this.parent().toggleClass('open');
}

export default Accordion;