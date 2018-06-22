const dataFlow = function(data) {
	// GV:全局变量; insuredPars:试算及投保参数; renderDate: 试算及投保页面数据
	// 作者:ydlx
	// 日期:2018-3-13
	localStorage.setItem(data.productId, JSON.stringify({
		'GV': GV,
		'insuredPars': {
			"pars": {
				"rrbx": {
					"rrbxProductId": data.productId,
					"productSeriesId": data.value.insurancePlan[0].id,
					"periodPremium": data.value.insurancePlan[0].price,
					"buyNum": 1,
					"insurantApplicantRelation": "00"
				},
				"extraParams": {
					"birthday":"2000-01-01",
					"sex":"0",
					"fjx":"0",
					"amnt":"10",
					"period":"1",
					"feeYear":"10",

					"holderApplicantStartID":"2010-01-01",
					"holderApplicantEndID":"2020-01-01",
					"insuredRecognizeeStartID":"2010-01-01",
					"insuredRecognizeeEndID":"2020-01-01"

				}
			},
			"parsInit": {
				"rrbx": {
					"rrbxProductId": data.productId,
					"productSeriesId": data.value.insurancePlan[0].id,
					"periodPremium": data.value.insurancePlan[0].price,
					"buyNum": 1,
					"insurantApplicantRelation": "00"
				},
				"extraParams": {
					"birthday":"2000-01-01",
					"sex":"0",
					"fjx":"0",
					"amnt":"10",
					"period":"1",
					"feeYear":"10",

					"holderApplicantStartID":"2010-01-01",
					"holderApplicantEndID":"2020-01-01",
					"insuredRecognizeeStartID":"2010-01-01",
					"insuredRecognizeeEndID":"2020-01-01"
				}
			}
		},
		"renderDate": {
			'insurePolicy': data.value.insurePolicy,
			"insurancePlan": null
		},
		"defaultPars": {
			"productId": data.productId,
			"rela": "00"
		}
	}));
}
export default dataFlow;