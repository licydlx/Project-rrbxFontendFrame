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
					"buyNum": 1
				},
				"extraParams": {
					"insuYear": "106",
					"birthday": "2000-01-01",
					"amnt": "5",
					"payendyear": "0",
					"payIntv": "0",
					"prem": "",

					"exempt": "0",
					"exemptPrem": "",

					"holderOccupationCode": "",
					"holderIdEndDate": "",
					"holderProvince": "",
					"holderCity": "",
					"holderCounty": "",

					"insuredOccupationCode": "",
					"insuredIdEndDate": "",
					"insuredProvince": "",
					"insuredCity": "",
					"insuredCounty": ""
				}
			},
			"parsInit": {
				"pars": {
					"rrbx": {
						"rrbxProductId": data.productId,
						"productSeriesId": data.value.insurancePlan[0].id,
						"periodPremium": data.value.insurancePlan[0].price,
						"buyNum": 1
					},
					"extraParams": {
						"insuYear": "106",
						"birthday": "2000-01-01",
						"amnt": "5",
						"payendyear": "0",
						"payIntv": "0",
						"prem": "",

						"exempt": "0",
						"exemptPrem": "",

						"holderOccupationCode": "",
						"holderIdEndDate": "",
						"holderProvince": "",
						"holderCity": "",
						"holderCounty": "",

						"insuredOccupationCode": "",
						"insuredIdEndDate": "",
						"insuredProvince": "",
						"insuredCity": "",
						"insuredCounty": ""
					}
				},
			}
		},
		"renderDate": {
			'insurePolicy': data.value.insurePolicy,
			"insurancePlan": null
		},
		"defaultPars": {
			"productId": data.productId,
			"rela": "01"
		}
	}));
}
export default dataFlow;