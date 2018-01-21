var getPars = (function(a) {
	var obj = {
		"policyHolderUser": {},
		"insuredUser": {},
		"extraParams": {
			"phone": "",
			"captcha": ""
		}
	};
	a.insureParams.map(function(val, index) {
		if (val.rules.hasOwnProperty("required")) {
			if (val.rules.required) {
				var arry = ["policyHolderUser", "insuredUser", "extraParams"];
				if (!val.name.indexOf(arry[0])) {
					var key = val.name.slice(val.name.indexOf(".") + 1);
					obj[arry[0]][key] = "";
					return;
				};
				if (!val.name.indexOf(arry[1])) {
					var key = val.name.slice(val.name.indexOf(".") + 1);
					obj[arry[1]][key] = "";
					return;
				};
				if (!val.name.indexOf(arry[2])) {
					var key = val.name.slice(val.name.indexOf(".") + 1);
					obj[arry[2]][key] = "";
					return;
				};
				if (val.name) {
					obj[val.name] = "";
					return;
				};
			};
		};
	});
	return obj;
});
export default getPars;
/*var obj = {
	"rrbxProductId": "20171117taikangrsyw",
	"productSeriesId": "14842",
	"buyNum": "1",
	"periodPremium": "60",
	"policyBeginDate": "",
	"expertId": "",
	"saleChannel": "",
	"policyHolderUser": {
		"userName": "周瑞堂",
		"certiType": "01",
		"certiNo": "420101199305215717",
		"phoneno": "17046294841"
	},
	"insuredUser": {
		"userName": "周瑞堂",
		"certiType": "01",
		"certiNo": "420101199305215717",
		"phoneno": "17046294841"
	},
	"extraParams": {
		"prem": "60",
		"amnt": "110000",
		"career": "00101001",
		"phone": "",
		"captcha": "",
		"relatedperson": "01"
	}
}*/