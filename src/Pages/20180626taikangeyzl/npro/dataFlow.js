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
					"insurantApplicantRelation": "00",
					"policyHolderUser":{
						"certiType":"00",
						"certiNo":"000000000000000000",
						"sex":"men",
						"birthday":"1970-01-01"
					},
					"insuredUser":{
						"certiType":"00",
						"certiNo":"000000000000000000",
						"sex":"men",
						"birthday":"1970-01-01"
					}
				},
				"extraParams": {
					"amnt":"10",
					"period":"12",
					"invoice":"0",
					"submitType":"0",
					"asset":"0",
					"insuredLicence":"",
					"insuredLicence":"",
					"insurePics":"",
					"payment":""
				}
			},
			"parsInit": {
				"rrbx": {
					"rrbxProductId": data.productId,
					"productSeriesId": data.value.insurancePlan[0].id,
					"periodPremium": data.value.insurancePlan[0].price,
					"buyNum": 1,
					"insurantApplicantRelation": "00",
					"policyHolderUser":{
						"certiType":"00",
						"certiNo":"000000000000000000",
						"sex":"men",
						"birthday":"1970-01-01"
					},
					"insuredUser":{
						"certiType":"00",
						"certiNo":"000000000000000000",
						"sex":"men",
						"birthday":"1970-01-01"
					}
				},
				"extraParams": {
					"amnt":"10",
					"period":"12",
					"invoice":"0",
					"submitType":"0",
					"asset":"0",
					"insuredLicence":"",
					"insuredLicence":"",
					"insurePics":"",
					"payment":""
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