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
					"insureId": data.value.insurancePlan[0].insureId,
					"riskCodes": data.value.insurancePlan[0].insureId,

					"amnt": "10",
					"payEndYear": "9",
					"insuredSex": "men",
					"insuredBirthday": "2000-01-01",

					"payIntv": "Y",

					"renewalBankCode": "",
					"renewalBankAccount": "",

					"holderCardValid":"2020-01-01",
					"holderOccupationCode":"",

					"holderResidentProvince":"",
					"holderResidentCity":"",
					"holderResidentCounty":"",
					

					"insuredCardValid":"2020-01-01",
					"insuredOccupationCode":"",
					"insuredResidentCounty":"",

					"insuredHeight":"",
					"insuredWeight":"",
					"insuredZip":""
					
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
					"insureId": data.value.insurancePlan[0].insureId,
					"riskCodes": data.value.insurancePlan[0].insureId,

					"amnt": "10",
					"payEndYear": "9",
					"insuredSex": "men",
					"insuredBirthday": "2000-01-01",

					"payIntv": "Y",

					"renewalBankCode": "",
					"renewalBankAccount": "",

					"holderCardValid":"2020-01-01",
					"holderOccupationCode":"",

					"holderResidentProvince":"",
					"holderResidentCity":"",
					"holderResidentCounty":"",
					

					"insuredCardValid":"2020-01-01",
					"insuredOccupationCode":"",
					"insuredResidentCounty":"",

					"insuredHeight":"",
					"insuredWeight":"",
					"insuredZip":""
					
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