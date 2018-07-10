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
					"insureId": data.value.insurancePlan[0].insureId,
					"birthday": "1970-01-01",
					"fieldBM": "1",

					"prem":"",
					"amnt":"200000",
					"relatedperson":"01"
				}
			},
			"parsInit": {
				"rrbx": {
					"rrbxProductId": data.productId,
					"productSeriesId": data.value.insurancePlan[0].id,
					"periodPremium": data.value.insurancePlan[0].price,
					"buyNum": 1
				},
				"extraParams": {
					"insureId": data.value.insurancePlan[0].insureId,
					"birthday": "1970-01-01",
					"fieldBM": "1",

					"prem":"",
					"amnt":"200000",
					"relatedperson":"01"
				}
			}
		},
		"renderData": {
			'insurePolicy': data.value.insurePolicy,
			"insurancePlan": data.value.insurancePlan
		},
		"defaultPars": {
			"productId": data.productId,
			"rela": "01"
		}
	}));
}
export default dataFlow;