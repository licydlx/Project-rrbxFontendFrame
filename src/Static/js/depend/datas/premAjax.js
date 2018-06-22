import env from '../../../../Config/env.js';
// 获取保费
function premAjax(pars, func) {
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
				} else {
					resolve("^^!");
				};
			},
			error: function(xhr, type) {},
			complete: function(xhr, status) {}
		});
	});
	promise.then(function(value) {
		if (func) {
			func(value)
		};
	}, function(error) {
		console.log(error);
	});
}

export default premAjax;