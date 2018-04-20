import dateUnit from '../../../../Static/js/depend/tools/dateUnit.js';
import premAjax from '../../../../Static/js/depend/datas/premAjax.js';
import selectOne from '../../../../Static/js/depend/tools/selectOne.js';
import selectThree from '../../../../Static/js/depend/tools/selectThree.js';
import selectArea from '../../../../Static/js/depend/tools/selectArea.js';
import selectDate from '../../../../Static/js/depend/tools/selectDate.js';
import nbuyClause from '../../../../Static/js/nbuy/nbuyClause.js';
import {
	alertError
} from '../../../../Static/js/depend/common.js';
import {
	dateModal
} from '../../../../Static/js/common/modal.js';
import buyAjax from '../../../../Static/js/depend/datas/buyAjax.js';

import getInsuredPars from '../../../../Static/js/nbuy/getInsuredPars.js';

import relaData from './relaData.js';
import occupationData from './occupationData.js';
import areaData from './areaData.js';
import bankData from './bankData.js';

const serviceLogic = function(a) {
	var renderData = a[0],
		rrbxSetObj = a[1];
	// 试算对象
	var trialObj = rrbxSetObj.insuredPars.pars.rrbx;
	// 已阅读文案
	if (rrbxSetObj.renderDate.insurePolicy) nbuyClause(rrbxSetObj.renderDate.insurePolicy);
	// 显示保费
	$("#prem").text(rrbxSetObj.insuredPars.pars.extraParams.prem + "元");
	// 平台识别
	if (rrbxSetObj.GV && Object.is(rrbxSetObj.GV.sceneType, '3')) $(".mg-b-footer").css("margin-bottom", "1rem");

	// =============================
	// 业务逻辑
	// =============================

	// 本人:defaultRela
	// 实际关系:relaTag
	var defaultRela = rrbxSetObj.defaultPars.rela,
		relaTag = $("#relaId").attr("data-id");
	// 逻辑:获取投保人的省市区,如果被保人为本人则...
	// 条件:点击下拉选择,即可
	new selectArea($("#holderArea"), "省市选择", areaData, holderArea).init();

	function holderArea(value) {
		relaTag = $("#relaId").attr("data-id");

		trialObj.extraParams.holderProvince = value.selectOneObj.id;
		trialObj.extraParams.holderCity = value.selectTwoObj.id;
		trialObj.extraParams.holderArea = value.selectThreeObj.id;
		if (Object.is(relaTag, defaultRela)) {
			trialObj.extraParams.province = value.selectOneObj.id;
			trialObj.extraParams.city = value.selectTwoObj.id;
			trialObj.extraParams.area = value.selectThreeObj.id;
		};
		return true;
	};

	// 逻辑:获取投保人的职业,如果被保人为本人则...
	// 条件:点击下拉选择,即可
	new selectThree($("#holderOc"), "职业选择", occupationData, holderOc).init();

	function holderOc(value) {
		relaTag = $("#relaId").attr("data-id");
		trialObj.extraParams.holderOc = value.selectThreeObj.id;
		if (Object.is(relaTag, defaultRela)) {
			trialObj.extraParams.jobCode = value.selectThreeObj.id;
		};
		return true;
	};

	// 逻辑:获取投保人的关系
	// 条件:点击下拉选择,即可
	var relaObj = $("#relaId").closest(".item"),
		relaNextCloneObj = relaObj.nextAll().clone();
	relaObj.nextAll().remove();

	new selectOne($("#relaId"), "关系选择", relaData, relaId).init();

	function relaId(content, value) {
		trialObj.insurantApplicantRelation = value;
		trialObj.extraParams.rela = value;

		var cloneObj = relaNextCloneObj;
		if (Object.is(value, rrbxSetObj.defaultPars.rela)) {
			relaObj.nextAll().remove()
		} else {
			relaObj.after(cloneObj);
			insuredIns();
		};
		return true;
	}

	// 逻辑:投保人银行选择...
	// 条件:点击下拉选择,即可
	new selectOne($("#bankCode"), "银行选择", bankData, bankCode).init();

	function bankCode(content, value) {
		trialObj.extraParams.bankCode = value;
		return true;
	};

	// 逻辑:获取投保人的省市区,如果被保人为本人则...
	// 条件:点击下拉选择,即可
	new selectArea($("#bankArea"), "省市选择", areaData, bankArea).init();

	function bankArea(value) {
		trialObj.extraParams.bankProvince = value.selectOneObj.id;
		trialObj.extraParams.bankCity = value.selectTwoObj.id;
		trialObj.extraParams.bankCountry = value.selectThreeObj.id;
		return true;
	};

	// 逻辑:详细地址
	// 输入,光标离开
	$("#container").on('blur', '#holderAddress', function(event) {
		event.preventDefault();
		var value = $(this).val();
		if (value && value != "") {
			relaTag = $("#relaId").attr("data-id");
			trialObj.extraParams.holderAddress = value;
			if (Object.is(relaTag, defaultRela)) {
				trialObj.extraParams.address = value;
			};
		};
	});

	// 逻辑:被保人非本人时,绑定被保人选项事件
	// 条件:改变关系,即可
	function insuredIns() {
		// 逻辑:获取被保人的省市区
		// 条件:点击下拉选择,即可
		new selectArea($("#container #insuredArea"), "省市选择", areaData, insuredArea).init();

		function insuredArea(value) {
			trialObj.extraParams.province = value.selectOneObj.id;
			trialObj.extraParams.city = value.selectTwoObj.id;
			trialObj.extraParams.area = value.selectThreeObj.id;
			return true;
		};

		// 逻辑:获取被保人的职业
		// 条件:点击下拉选择,即可
		new selectThree($("#jobCode"), "职业选择", occupationData, jobCode).init();

		function jobCode(value) {
			trialObj.extraParams.jobCode = value.selectThreeObj.id;
			return true;
		};
	}

	// // 逻辑:根据被保人身份证重新计算保费
	// // 条件:在被保人选项输入正确身份证,并移走光标,即可
	// $("#container").on("blur", "input[data-type='certiNo']", function(event) {
	// 	var $that = $(this),
	// 		cardObj = dateUnit.parseIdCard($that.val()),
	// 		certiNoId = $that.attr("id"),
	// 		relaTag = $("#relaId").attr("data-id"),
	// 		relaState = Object.is(relaTag, defaultRela);

	// 	if (cardObj) {
	// 		switch (certiNoId) {
	// 			case 'holder_certiNo':
	// 				var flag = dateUnit.getAgeRangeState(cardObj.birthday, {
	// 					"age": 18
	// 				}, {
	// 					"age": 60
	// 				});

	// 				if (!flag) {
	// 					new dateModal(null, "stateIndform", "投保人年龄最小18周岁，最大60周岁").init().show();
	// 					$("#holder_certiNo").val('').closest('.item').attr('data-state', '');
	// 				} else {
	// 					if (relaState) {
	// 						trialObj.extraParams.birthday = cardObj.birthday;
	// 						getPrem()
	// 					};
	// 				};
	// 				break;
	// 			case 'insured_certiNo':
	// 				var flag = dateUnit.getAgeRangeState(cardObj.birthday, {
	// 					"ageDay": 28
	// 				}, {
	// 					"age": 60
	// 				});

	// 				if (!flag) {
	// 					new dateModal(null, "stateIndform", "被保人年龄最小28天，最大60周岁").init().show();
	// 					$("#insured_certiNo").val('').closest('.item').attr('data-state', '');
	// 				} else {
	// 					if (!relaState) {
	// 						trialObj.extraParams.birthday = cardObj.birthday;
	// 						getPrem()
	// 					}
	// 				};
	// 				break;
	// 		}
	// 	}
	// });

	// 逻辑:根据被保人身份证重新计算保费
	// 条件:在被保人选项输入正确身份证,并移走光标,即可
	$("#container").on("blur", "input[data-type='certiNo']", function(event) {
		var $that = $(this),
			cardObj = dateUnit.parseIdCard($that.val()),
			certiNoId = $that.attr("id"),
			relaTag = $("#relaId").attr("data-id"),
			relaState = Object.is(relaTag, defaultRela);
		if (relaState && Object.is("holder_certiNo", certiNoId)) {
			var flag = dateUnit.getAgeRangeState(cardObj.birthday, {
				"age": 18
			}, {
				"age": 100
			});

			if (!flag) {
				new dateModal(null, "stateIndform", "被保人年龄最小28天，最大60周岁").init().show();
				$("#holder_certiNo").val('').closest('.item').attr('data-state', '');
			} else {
				trialObj.extraParams.birthday = cardObj.birthday;
				getPrem();
			};
		} else if (Object.is("insured_certiNo", certiNoId)) {
			var flag = dateUnit.getAgeRangeState(cardObj.birthday, {
				"ageDay": 28
			}, {
				"age": 60
			});

			if (!flag) {
				new dateModal(null, "stateIndform", "被保人年龄最小28天，最大60周岁").init().show();
				$("#insured_certiNo").val('').closest('.item').attr('data-state', '');
			} else {
				trialObj.extraParams.birthday = cardObj.birthday;
				getPrem();
			};
		} else {
			var holderObj = $("#holder_certiNo").val();
			if (holderObj && holderObj != "") {
				var holderAgeFlag = dateUnit.getAgeRangeState(dateUnit.parseIdCard(holderObj).birthday, {
					"age": 18
				}, {
					"age": 100
				});
				if (!holderAgeFlag) {
					new dateModal(null, "stateIndform", "投保人年龄最小18周岁").init().show();
					$("#holder_certiNo").val('').closest('.item').attr('data-state', '');
					return;
				}
			};
		};
	});

	// 逻辑: 根据算参数获取保费,并存储公共数据对象
	// 条件: 试算参数对象:ntriObj;公共数据对象:rrbxSetObj
	function getPrem() {
		premAjax(trialObj, function(value) {
			$("#prem").text(value + "元");

			trialObj.extraParams.prem = value;
			rrbxSetObj.insuredPars.pars.rrbx = trialObj;
			localStorage.setItem(rrbxSetObj.insuredPars.parsInit.rrbx.rrbxProductId, JSON.stringify(rrbxSetObj));
		});
	}

	// =============================
	// 业务逻辑
	// =============================

	// 购买
	//
	$("#container").on("click", "#buyNow", function(event) {
		event.preventDefault();

		var doneState = true;
		if (!$(".agreed input").is(":checked")) {
			alertError("请先同意以下条款！");
			return;
		};
		$(".itemBox").find(".item").each(function(index, val) {
			if ($(val).hasClass('input') && $(val).attr("data-state") !== "right") {
				doneState = false;
			}
			if ($(val).hasClass('choose')) {
				if (!$(val).find("input").attr("data-id")) {
					doneState = false;
				};
			};
		});

		if (doneState) {
			buyAjax(getInsuredPars(rrbxSetObj), rrbxSetObj);
		} else {
			alertError("请输入正确信息！");
			return;
		};
	});
}
export default serviceLogic;