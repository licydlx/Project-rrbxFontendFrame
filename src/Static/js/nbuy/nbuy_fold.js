var e_buy_fold = function() {
	$('#container').on('click', '.box > .header', function(event) {
		event.preventDefault();
		var $this = $(this),
			$next = $this.next();
		$next.slideToggle();
		$this.parent().toggleClass('open');
	});
}
export default e_buy_fold;