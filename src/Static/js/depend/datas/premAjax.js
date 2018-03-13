import env from '../../../../Config/env.js';
// 获取保费
function premAjax(rrbxSet, pars) {
	const promise = new Promise(function(resolve, reject) {
		var data = JSON.stringify(pars);
		$.ajax({
			type: "POST",
			url: env + "/mobile/nproduct/trialCalculation",
			data: "productId=" + pars.rrbxProductId + "&data=" + data,
			beforeSend: function() {},
			success: function(data) {
				if (data.code == 10000) {
					resolve(data.response);
				};
			},
			error: function(xhr, type) {},
			complete: function(xhr, status) {}
		});
	});
	promise.then(function(value) {
		$("#prem").text(value + "元");
		rrbxSet.insuredPars.pars.extraParams.prem = value;
		localStorage.setItem(rrbxSet.insuredPars.pars.rrbx.rrbxProductId, JSON.stringify(rrbxSet));
	}, function(error) {
		console.log(error);
	});
}

export default premAjax;