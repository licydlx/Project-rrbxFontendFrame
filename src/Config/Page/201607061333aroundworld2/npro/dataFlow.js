const dataFlow = function(data) {
	console.log("dataFlow");
	console.log(data);
	localStorage.setItem(data.productId, JSON.stringify({
		'GV': GV,
		'trialSet':{
			"pars":{
				"rrbxProductId":data.productId,
				"extraParams":{
					"insureId":data.value.insurancePlan[0].insureId,
					"dataVal":1,
					"ageRange":0
				},
				"productSeriesId":data.value.insurancePlan[0].id
			},
			"result":{
				"periodPremium":"40",
				"prem":""
			}
		},
		'insurePolicy': data.value.insurePolicy,
		"insurancePlan":data.value.insurancePlan
	}));
}
export default dataFlow;