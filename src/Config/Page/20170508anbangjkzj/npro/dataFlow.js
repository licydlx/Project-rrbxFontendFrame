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
					"insurantApplicantRelation":"00"
				},
				"extraParams": {
					"birthday": "2000-01-01",
					"sex":"men",
					"amnt": "5",
					"payendyear": "1000",
					"payIntv": "0",
					"exempt": "0",

					"prem": "",

					"insuYear":"106",
					"holderOccupationCode": "",
					"holderIdEndDate": "2020-01-01",
					"holderProvince": "",
					"holderCity": "",
					"holderCounty": "",

					"insuredOccupationCode": "",
					"insuredIdEndDate": "2020-01-01",
					"insuredProvince": "",
					"insuredCity": "",
					"insuredCounty": ""
				}
			},
			"parsInit": {
				"rrbx": {
					"rrbxProductId": data.productId,
					"productSeriesId": data.value.insurancePlan[0].id,
					"periodPremium": data.value.insurancePlan[0].price,
					"buyNum": 1,
					"insurantApplicantRelation":"00"
				},
				"extraParams": {
					"birthday": "2000-01-01",
					"sex":"men",
					"amnt": "5",
					"payendyear": "1000",
					"payIntv": "0",
					"exempt": "0",

					"prem": "",

					"insuYear":"106",
					"holderOccupationCode": "",
					"holderIdEndDate": "2020-01-01",
					"holderProvince": "",
					"holderCity": "",
					"holderCounty": "",

					"insuredOccupationCode": "",
					"insuredIdEndDate": "2020-01-01",
					"insuredProvince": "",
					"insuredCity": "",
					"insuredCounty": ""
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