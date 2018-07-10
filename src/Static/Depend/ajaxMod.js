import env from '../../Config/env.js';
import Modal from './Modal/Modal.js';
import {
	commonJs,
} from './commonMod/common.js';

// 获取地区数据
const areaAjax = function() {
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


// 购买
const buyAjax = function(ajaxData, rrbxSetObj) {
	var url = env + '/mobile/norder/create?access_token=' + GV.nbuy_accessToken + '&productId=' + GV.nbuy_rrbxProductId + '';
	$.ajax({
		type: "POST",
		url: url,
		data: "data=" + ajaxData,
		timeout: 60000,
		dataType: "JSON",
		beforeSend: function() {
			commonJs.loadAnimation();
		},
		success: function(data) {
			if (data.code == 10000) {
				window.location.href = data.response.payUrl;
			} else {
				commonJs.loadClose();
				new Modal('defaultConfig', {
					text: data.info
				}).init();
			}
		},
		error: function(xhr, type) {
			commonJs.loadClose();
			new Modal('defaultConfig', {
				text: "请求超时，请稍后再试！"
			}).init();
		},
		complete: function(xhr, status) {
			if (status == 'timeout') {
				xhr.abort();
				$.alert("网络超时，请刷新", function() {
					location.reload();
				})
			}
		}
	})
};


// 保费试算
const premAjax = function(pars, func) {
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

// 详情页 获取数据

const getDataAjax = function(options,callback) {
	$.ajax({
		type: options.type,
		url: options.url,
		data: options.data,
		beforeSend: function() {},
		success: function(data) {
			if (data.code == 10000) {
				if (callback) {
					callback(data.response);
				};
			};
		},
		error: function(xhr, type) {},
		complete: function(xhr, status) {}
	});
}

export {
	areaAjax,
	buyAjax,
	premAjax,
	getDataAjax
};