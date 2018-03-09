const dataFlow = function(data) {
	localStorage.setItem(data.productId, JSON.stringify({
		'GV': GV,
		'trialSet': {
			"pars": {
				"rrbxProductId": data.productId,
				"extraParams": {
					"insureId": data.value.insurancePlan[0].insureId,
					"dataVal": 1,
					"ageRange": 0
				},
				"productSeriesId": data.value.insurancePlan[0].id
			},
			"result": {
				"periodPremium": data.value.insurancePlan[0].price,
				"prem": data.value.insurancePlan[0].price
			}
		},
		'initTrialSet': {
			"pars": {
				"rrbxProductId": data.productId,
				"extraParams": {
					"insureId": data.value.insurancePlan[0].insureId,
					"dataVal": 1,
					"ageRange": 0
				},
				"productSeriesId": data.value.insurancePlan[0].id
			},
			"result": {
				"periodPremium": data.value.insurancePlan[0].price,
				"prem": data.value.insurancePlan[0].price
			}
		},
		'insurePolicy': data.value.insurePolicy,
		"insurancePlan": data.value.insurancePlan
	}));
}
export default dataFlow;