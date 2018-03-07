const dataFlow = function(data) {
	console.log("dataFlow");
	console.log(data);
	localStorage.setItem(data.productId, JSON.stringify({
		'GV': GV,
		'trialSet':{
			"pars":{
				"rrbxProductId":"",
				"productSeriesId":"",
				"extraParams":{
					"insureId":"",
					"dataVal":"",
					"ageRange":""
				}
			},
			"result":{
				"prem":""
			}
		},
		'insurePolicy': data.value.insurePolicy,
		"insurancePlan":data.value.insurancePlan
	}));
}
export default dataFlow;