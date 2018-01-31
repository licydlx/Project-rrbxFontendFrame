import e_nbuy_popups from './nbuy_popups.js';
import {
	commonJs
} from '../depend/common.js';
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
			RRBX = {
				"rrbxProductId": productId,
				"productSeriesId": lsObj.productSeriesId,
				"buyNum": 1,
				"periodPremium": lsObj.periodPremium,
				"expertId": "",
				"saleChannel": "",
				"policyHolderUser": {},
				"insuredUser": {},
				"extraParams": {
					'amnt': parseInt(lsObj.amnt),
					'prem': parseInt(lsObj.prem)
				}
			};

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

		ajaxCreateOrder(JSON.stringify(RRBX));
	};

	var ajaxCreateOrder = (ajaxData) => {
		var localUrl = "https://uatapi2.renrenbx.com/mobile/norder/create?access_token=2fb1a1e81dce58c2cfca8e2169fc69f0&productId=20180118kaixinbaodjx",
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