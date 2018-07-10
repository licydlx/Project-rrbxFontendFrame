// 描述:投保页点击立即购买,通过验证后,组装参数并返回请求字符串对象

import {
	commonJs
} from '../../Depend/commonMod/common.js';

const getInsuredPars = function(rrbxSet) {
	var getChannel = function() {
		if (GV.nbuy_channel != null && GV.nbuy_channel != '') {
			return GV.nbuy_channel;
		}
		return GV.nbuy_appName;
	};
	var rrbxDataModal = {
		"rrbxProductId": "",
		"productSeriesId": "",
		"buyNum": 1,
		"periodPremium": "",
		"expertId": GV.nbuy_eid,
		"saleChannel": getChannel(),
		"policyHolderUser": {},
		"insuredUser": {},
		"extraParams": {}
	};
	var RRBX = Object.assign(rrbxDataModal, rrbxSet.insuredPars.pars.rrbx);
	var relaTag = $("#relaId").attr("data-id");
	var oneSelf = rrbxSet.defaultPars.rela;
	// 根据页面 整合投保参数
	if (Object.is(relaTag, oneSelf)) {
		['policyHolderUser', 'extraParams'].forEach(function(par, index) {
			$('[data-belong=' + par + ']').each(function(index, context) {
				let that = $(context),
					key = that.attr("data-type"),
					value = that.val();
				switch (par) {
					case 'policyHolderUser':
						Object.is(key, "certiType") ? RRBX[par][key] = RRBX.insuredUser[key] = "00" : RRBX[par][key] = RRBX.insuredUser[key] = value;
						break;
					case 'extraParams':
						if (key === 'area') {
							var code = that.attr('data-id').split(',');
							that.attr("data-key").split(',').forEach(function(k, s, a) {
								RRBX[par][k] = code[s];
							})
						} else {
							var code = that.attr("data-id");
							if (code) {
								RRBX[par][key] = code;
							} else {
								RRBX[par][key] = value;
							};
						};
						break;
					default:
						console.log('投保参数整合');
				}
			});
		});
	} else {
		['policyHolderUser', 'insuredUser', 'extraParams'].forEach(function(par, index, value) {
			$('[data-belong=' + par + ']').each(function(index, context) {
				let that = $(context),
					key = that.attr("data-type"),
					value = that.val();
				switch (par) {
					case 'policyHolderUser':
					case 'insuredUser':
						Object.is(key, "certiType") ? RRBX[par][key] = "00" : RRBX[par][key] = value;
						break;
					case 'extraParams':
						if (key === 'area') {
							var code = that.attr('data-id').split(',');
							that.attr("data-key").split(',').forEach(function(k, s, a) {
								RRBX[par][k] = code[s];
							})
						} else {
							var code = that.attr("data-id");
							if (code) {
								RRBX[par][key] = code;
							} else {
								RRBX[par][key] = value;
							};
						};
						break;
					default:
						console.log('投保参数整合');
				}
			});
		});
	};

	return JSON.stringify(RRBX);
};

export default getInsuredPars;