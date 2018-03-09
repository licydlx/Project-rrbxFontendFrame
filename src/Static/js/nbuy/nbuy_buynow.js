import {
	commonJs
} from '../depend/common.js';
const productConfig = require('../../../Config/config.json');
require("../../scss/component/depend/loading.scss");

var e_nbuy_buynow = function(a) {
	$("#container").on("click", "#buyNow", function() {
		var doneState = true;
		if (!$(".agreed input").is(":checked")) {
			alertError("请先同意以下条款！");
			return;
		};
		$(".itemInfo").find("li").each(function(index, val) {
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
		var DataSet = JSON.parse(localStorage.getItem(productConfig.productId)),
			RRBX = {
				"rrbxProductId": productConfig.productId,
				"productSeriesId": DataSet.trialSet.pars.productSeriesId,
				"buyNum": 1,
				"periodPremium": DataSet.trialSet.result.periodPremium,
				"expertId": GV.nbuy_eid,
				"saleChannel": getChannel(),
				"policyBeginDate": $("#confirmedDateId").val(),
				"policyHolderUser": {},
				"insuredUser": {},
				"extraParams": {
					"dataVal": DataSet.trialSet.pars.extraParams.dataVal,
					"insureId": DataSet.trialSet.pars.extraParams.insureId,
					"buyPrice": DataSet.trialSet.result.prem,
					"passport1": "",
					"passport2": ""
				}
			};
		var relaTag = $("#relaId").attr("data-id");
		if (relaTag == '01') {
			RRBX.extraParams.passport1 = $("#holder_certiNo").val();
			RRBX.extraParams.passport2 = $("#holder_certiNo").val();
			['policyHolderUser', 'extraParams'].forEach(function(par, index) {
				$('[data-belong=' + par + ']').each(function(index, context) {
					let that = $(context),
						key = that.attr("data-type"),
						value = that.val();
					if (par === 'policyHolderUser') {
						if (key === 'certiType') {
							RRBX[par][key] = '00';
							RRBX.insuredUser[key] = '00';
						} else {
							RRBX[par][key] = value;
							RRBX.insuredUser[key] = value;
						};
					} else {
						if (that.attr('id') === 'showArea') {
							key.split(',').forEach(function(k, s, a) {
								let code = that.attr('data-code').split(',');
								RRBX[par][k] = code[s];
							})
						} else {
							RRBX[par][key] = value;
						};
					};

				});
			});
		} else {
			RRBX.extraParams.passport1 = $("#holder_certiNo").val();
			RRBX.extraParams.passport2 = $("#insured_certiNo").val();
			['policyHolderUser', 'insuredUser', 'extraParams'].forEach(function(par, index) {
				$('[data-belong=' + par + ']').each(function(index, context) {
					let that = $(context),
						key = that.attr("data-type"),
						value = that.val();
					if (par === 'policyHolderUser') {
						if (key === 'certiType') {
							RRBX[par][key] = '00';
						} else {
							RRBX[par][key] = value;
						};
					} else if (par === 'insuredUser') {
						if (key === 'certiType') {
							RRBX[par][key] = '00';
						} else {
							RRBX[par][key] = value;
						};
					} else {
						if (that.attr('id') === 'showArea') {
							key.split(',').forEach(function(k, s, a) {
								let code = that.attr('data-code').split(',');
								RRBX[par][k] = code[s];
							})
						} else {
							RRBX[par][key] = value;
						};
					};
				});
			});
		};

		ajaxCreateOrder(JSON.stringify(RRBX));
	};

	var ajaxCreateOrder = (ajaxData) => {
		var localUrl = "https://uatapi2.renrenbx.com/mobile/norder/create?access_token=07588141fdb1b62f2e5ec2ae07283b61&productId=201607061333aroundworld2",
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
		if (GV.nbuy_channel != null && GV.nbuy_channel != '') {
			return GV.nbuy_channel;
		}
		return GV.nbuy_appName;
	};

	function alertError(data) {
		let tpl = `<div class="alert-bg">
					<div class="alert">
					 <p class="alert-content">${data}</p>
					 <div class="alert-btns">
					  <a class="alert1-btn">确定</a>
					 </div>
					</div>
				   </div>`;

		$("body").append(tpl);
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