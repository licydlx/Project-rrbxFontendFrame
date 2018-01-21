import e_nbuy_popups from './nbuy_popups.js';
import commonJs from '../depend/common.js';
require("../../scss/component/depend/loading.scss");

var e_nbuy_buynow = function(a) {
	$("#container").on("click", "#buy-now", function() {
		var doneState = true;
		if (!$(".agreed input").is(":checked")) {
			alertError("请先同意以下条款！");
			return;
		};

		$(".input-list").find("li").each(function(index, val) {
			if (!$(val).hasClass('right') && !$(val).attr("norequired")) {
				doneState = false;
			}
		});

		if (doneState) {
			inputSuccess();
		} else {
			alertError("请输入正确信息！");
			return;
		};
	});

	function inputSuccess() {
		var productId = JSON.parse(localStorage.getItem('productId')),
			lsObj = JSON.parse(localStorage.getItem(productId)),
			productSeriesId = lsObj.productSeriesId,
			insureId = lsObj.insureId,
			dataVal = lsObj.dataVal,
			periodPremium = lsObj.periodPremium,
			buyPrice = lsObj.buyPrice,
			rela = $("#showRela").attr("data-id");
		var passport1, passport2;
		if (rela == "00") {
			passport1 = $("#holder_certiNo").val();
			passport2 = passport1;
		} else {
			passport1 = $("#holder_certiNo").val();
			passport2 = $("#insured_certiNo").val();
		};

		var rrbx_basic = {
				"rrbxProductId": "20180105anlianliuxuelx",
				"productSeriesId": productSeriesId,
				"buyNum": 1,
				"periodPremium": periodPremium,
				"policyBeginDate": "",
				"expertId": "",
				"saleChannel": ""

			},
			rrbx_holder = {
				"policyHolderUser": {
					"userName": $.trim($("#holder_userName").val()),
					"certiType": $.trim($("#holder_certiType").attr("data-value")),
					"certiNo": $.trim($("#holder_certiNo").val()),
					"phoneno": $.trim($("#holder_phoneno").val())
				}
			},
			rrbx_insured = {
				"insuredUser": {}
			},
			rrbx_extend = {
				"extraParams": {
					"dataVal": dataVal,
					"insureId": insureId,
					"buyPrice": buyPrice,
					"passport1": passport1,
					"passport2": passport2,
					"phone": $("#supple-info-tel").val(),
					"captcha": $("#supple-info-code").val(),
					"relatedperson": rela
				}
			};

		var obj = {},
			objkeys = Object.keys(rrbx_holder.policyHolderUser);
		rrbx_insured.insuredUser = Object.is(rela, "00") ? (rrbx_holder.policyHolderUser) : (objkeys.forEach(function(value, index) {
			obj[value] = Object.is(value, "certiType") ? $.trim($("#insured_" + value).attr("data-value")) : $.trim($("#insured_" + value).val());
		}), obj);
		var orderPars = Object.assign(rrbx_basic, rrbx_holder, rrbx_insured, rrbx_extend);
		ajaxCreateOrder(JSON.stringify(orderPars));
	};

	var ajaxCreateOrder = (ajaxData) => {
		var localUrl = "https://uatapi2.renrenbx.com/mobile/norder/create?access_token=2fb1a1e81dce58c2cfca8e2169fc69f0&productId=20180105anlianliuxuelx",
			ajaxUrl = window.location.origin + '/mobile/norder/create?access_token=' + GV.nbuy_accessToken + '&productId=' + GV.nbuy_rrbxProductId + '',
			url = window.location.origin.indexOf("api") == -1 ? localUrl : ajaxUrl;
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
					payUrl(data.response);
				} else {
					commonJs.loadClose();
					alertError(data.info);
				}
			},
			error: function(xhr, type) {
				commonJs.loadClose();
				alertError("请求超时，请稍后再试！");
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

	const payUrl = (par) => window.location.href = par.payUrl;

	const getChannel = () => {
		if (nbuy_channel != null && nbuy_channel != '') {
			return nbuy_channel;
		}
		return nbuy_appName;
	};

	function alertError(data) {
		var html = "";
		html += '<div class="alert-bg">';
		html += '<div class="alert">';
		html += '<p class="alert-content">' + data + '</p>';
		html += '<div class="alert-btns">';
		html += '<a class="alert1-btn">确定</a>';
		html += '</div>';
		html += '</div>';
		html += '</div>';
		$("body").append(html);
		$("body").on("click", ".alert1-btn", function() {
			$('.alert-bg').hide();
		});
	}

	const getDate = (num) => {
		if (num) {
			num = parseInt(num);
			let date = new Date();
			date.setDate(date.getDate() + num);
			return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
		};
	}

	const getEndDate = (num) => {
		if (num) {
			num = parseInt(num);
			return getDate([15, 30, 60, 90, 180, 366][num]);
		};
	}

};
export default e_nbuy_buynow;