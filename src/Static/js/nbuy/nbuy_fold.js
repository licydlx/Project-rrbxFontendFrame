/*var fold = function(a) {*/
var Accordion = function(el, multiple) {
	this.el = el || {};
	this.multiple = multiple || false;
	/*var relatedPerson = this.el.find('.related-person');*/
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

		// if (!e.data.multiple) {
		// 	$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
		// };
	}
	/*var accordion = new Accordion($('#container'), false);*/
	/*	function loadScript(url, callback) {
			var script = document.createElement("script")
			script.type = "text/javascript";
			if (script.readyState) { //IE
				script.onreadystatechange = function() {
					if (script.readyState == "loaded" || script.readyState == "complete") {
						script.onreadystatechange = null;
						callback();
					}
				};
			} else { //Others
				script.onload = function() {
					callback();
				};
			}
			script.src = url;
			document.getElementsByTagName_r("head")[0].appendChild(script);
		}*/
	/*};*/

export default Accordion;