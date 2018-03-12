import env from '../../../../Config/env.js';
// 获取保费
function getPrem(obj, pars) {
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
		obj.trialSet.result.prem = value;
		localStorage.setItem(obj.trialSet.pars.rrbxProductId, JSON.stringify(obj));
	}, function(error) {
		console.log(error);
	});
}

export default getPrem;