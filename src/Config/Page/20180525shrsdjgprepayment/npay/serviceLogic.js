var urlParams = window.location.search;
(window.onpopstate = function() {
	var match,
		pl = /\+/g,
		search = /([^&=]+)=?([^&]*)/g,
		decode = function(s) {
			return decodeURIComponent(s.replace(pl, " "));
		},
		query = window.location.search.substring(1);
	urlParams = {};
	while (match = search.exec(query))
		urlParams[decode(match[1])] = decode(match[2]);
})();

const ajaxData = {
	'orderNo': urlParams.orderNo,
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
	$("#orderNo").attr("value",urlParams.orderNo);
	var L = JSON.parse(localStorage.getItem("20180525shrsdjgprepayment")),
	P = L.insuredPars.pars.rrbx.extraParams.prem;
	$("#prem").attr("value",P);

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