// 获取地区数据
function areaAjax() {
	const promise = new Promise(function(resolve, reject) {
		$.ajax({
			type: "GET",
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
		if (func) {
			func(value)
		};
	}, function(error) {
		console.log(error);
	});
}

export default premAjax;