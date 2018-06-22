const ajaxData = {
	'orderNo': GV.orderNo,
	'holderUserName': '',
	'bankCode': '',
	'cardCode': '',
	'bankProvinceCode': '',
	'bankCityCode': ''
}

const handle = {
	bankCode: function(content, value) {
		ajaxData.bankCode = value;
		return true;
	},
	bankAreaData: function(value) {
		ajaxData.bankProvinceCode = value.selectOneObj.id;
		ajaxData.bankCityCode = value.selectTwoObj.id;
		return true;
	}
}

const serviceLogic = function(a) {
	$("#orderNo").attr("value",GV.orderNo);
	$("#prem").attr("value",GV.payMoney);

	$("#container").on('blur', 'input', function(event) {
		event.preventDefault();
		var key = $(this).attr("id");
		ajaxData[key] = $(this).val();
	});
};

export {
	ajaxData,
	handle,
	serviceLogic
};