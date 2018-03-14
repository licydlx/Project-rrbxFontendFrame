import env from '../../../../Config/env.js';
// 获取保费
function premAjax(pars, func) {
	// var o1 = {
	// 	"rrbxProductId": "20170905zhaoshangzawl",
	// 	"extraParams": {
	// 		"amnt": "5",
	// 		"ylAmnt": "50",
	// 		"payEndYear": "5",
	// 		"payIntv": "1",
	// 		"riskcodes": "QMLH001",
	// 		"sex": "men",
	// 		"holderBirthday": "1992-02-02",
	// 		"insuredBirthday": "2017-02-02"
	// 	},
	// 	"productSeriesId": "14831"
	// }

	// var o2 = {
	// 	"rrbxProductId": "20170905zhaoshangzawl",
	// 	"productSeriesId": "14831",
	// 	"periodPremium": 100,
	// 	"buyNum": 1,
	// 	"insurantApplicantRelation": "03",
	// 	"extraParams": {
	// 		"holderOccupationCode": "",
	// 		"holderProvince": "",
	// 		"holderCity": "",
	// 		"holderDistrict": "",
	// 		"holderBirthday": "1992-02-02",
	// 		"insuredBirthday": "2017-02-02",
	// 		"payEndYear": "5",
	// 		"payIntv": "1",
	// 		"ylAmnt": "50",
	// 		"sex": "men",
	// 		"riskcodes": "QMLH001",
	// 		"amnt": "5",
	// 		"prem": "608.72"
	// 	}
	// }
	const promise = new Promise(function(resolve, reject) {
		var data = JSON.stringify(pars);
		$.ajax({
			type: "POST",
			url: env + "/mobile/nproduct/trialCalculation",
			data: "productId=" + pars.rrbxProductId + "&data=" + data,
			beforeSend: function() {},
			success: function(data) {
				if (data.code == 10000) {
					resolve(data.response);
				};
			},
			error: function(xhr, type) {},
			complete: function(xhr, status) {}
		});
	});
	promise.then(function(value) {
		if (func) {
			func(value)
		};
	}, function(error) {
		console.log(error);
	});
}

export default premAjax;