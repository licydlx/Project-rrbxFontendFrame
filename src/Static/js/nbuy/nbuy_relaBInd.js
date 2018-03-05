const e_nbuy_relaBind = function(a) {
	var data = [{
		'id': '01',
		'value': '本人'
	}, {
		'id': '40',
		'value': '子女'
	}, {
		'id': '50',
		'value': '父母'
	}, {
		'id': '10',
		'value': '配偶'
	}];
	$('.selectRela').on('click', function() {
		var that = $(this),
			relaIdDom = that.find('.showRela');
		var relaId = that,
			bankSelect = new IosSelect(1, [data], {
				container: '.container',
				title: '关系选择',
				itemHeight: 50,
				itemShowCount: 3,
				oneLevelId: relaId,
				showAnimate: true,
				callback: function(selectOneObj) {
					relaIdDom.text(selectOneObj.value).attr('data-id',selectOneObj.id).attr('data-value',selectOneObj.value);
				}
			});
	});
};
export default e_nbuy_relaBind;