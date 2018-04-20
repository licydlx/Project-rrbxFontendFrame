import dateUnit from '../../../../Static/js/depend/tools/dateUnit.js';

import premAjax from '../../../../Static/js/depend/datas/premAjax.js';
import selectOne from '../../../../Static/js/depend/tools/selectOne.js';
import selectThree from '../../../../Static/js/depend/tools/selectThree.js';

import selectArea from '../../../../Static/js/depend/tools/selectArea.js';
import selectDate from '../../../../Static/js/depend/tools/selectDate.js';

import {
	dateModal
} from '../../../../Static/js/common/modal.js';

import nbuyClause from '../../../../Static/js/nbuy/nbuyClause.js';
import {
	alertError
} from '../../../../Static/js/depend/common.js';
import buyAjax from '../../../../Static/js/depend/datas/buyAjax.js';
import getInsuredPars from '../../../../Static/js/nbuy/getInsuredPars.js';

import occupationData from './occupationData.js';
import areaData from './areaData.js';

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

	// 关系Tag
	var relaTag = $("#relaId").attr("data-id"),
		defaultRela = rrbxSetObj.defaultPars.rela;
	var areaObj = JSON.parse(trialObj.extraParams.limitArea),
		areaIdArray = areaObj["data-id"].split(","),
		areaValueArray = areaObj["value"].split(",");
	$("#holderArea").attr("value", areaValueArray[0] + "," + areaValueArray[1] + "," + areaValueArray[2]);

	trialObj.extraParams.holderResidentProvince = areaIdArray[0];
	trialObj.extraParams.holderResidentCity = areaIdArray[1];
	trialObj.extraParams.holderResidentCounty = areaIdArray[2];
	trialObj.extraParams.insuredResidentProvince = areaIdArray[0];
	trialObj.extraParams.insuredResidentCity = areaIdArray[1];
	trialObj.extraParams.insuredResidentCounty = areaIdArray[2];
	// 投保人省市地区选择
	// new selectArea($("#holderArea"), "省市选择", areaData, holderArea).init();
	// function holderArea(value) {
	// 	trialObj.extraParams.holderResidentProvince = value.selectOneObj.id;
	// 	trialObj.extraParams.holderResidentCity = value.selectTwoObj.id;
	// 	trialObj.extraParams.holderResidentCounty = value.selectThreeObj.id;
	// 	Object.is(relaTag, defaultRela) ? trialObj.extraParams.insuredResidentCounty = value.selectThreeObj.id : "";
	// 	return true;
	// };

	// 投保人职业选择
	new selectThree($("#holderOccupationCode"), "职业选择", occupationData, holderOccupationCode).init();

	function holderOccupationCode(value) {
		trialObj.extraParams.holderOccupationCode = value.selectThreeObj.id;
		if(Object.is(relaTag, defaultRela)) trialObj.extraParams.insuredOccupationCode = value.selectThreeObj.id;
		return true;
	};

	// 投保人 身份有效期选择
	new selectDate($("#holderCardValid"), "birthday", '2020-01-01', 0, 30, holderCardValid).init();

	function holderCardValid(value) {
		trialObj.extraParams.holderCardValid = value;
		if(Object.is(relaTag, defaultRela)) trialObj.extraParams.insuredCardValid = value;
		return true;
	}
	// 投保人银行选择
	new selectOne($("#renewalBankCode"), "银行选择", renderData.data.renewalBankCode, renewalBankCode).init();

	function renewalBankCode(content, value) {
		trialObj.extraParams.renewalBankCode = value;
		return true;
	};

	// 关系选择
	var relaObj = $("#relaId").closest(".item"),
		relaNextCloneObj = relaObj.nextAll().clone();
	relaObj.nextAll().remove();

	new selectOne($("#relaId"), "关系选择", renderData.data.relaId, relaId).init();

	function relaId(content, value) {
		trialObj.insurantApplicantRelation = value;
		var cloneObj = relaNextCloneObj;
		Object.is(value, rrbxSetObj.defaultPars.rela) ? relaObj.nextAll().remove() : relaObj.after(cloneObj);
		Object.is(value, rrbxSetObj.defaultPars.rela) ? "" : insuredIns();
		return true;
	}

	function insuredIns() {
		// 被保人
		// 被保人省市地区选择
		$("#insuredArea").attr("value", areaValueArray[0] + "," + areaValueArray[1] + "," + areaValueArray[2]);
		trialObj.extraParams.insuredResidentProvince = areaIdArray[0];
		trialObj.extraParams.insuredResidentCity = areaIdArray[1];
		trialObj.extraParams.insuredResidentCounty = areaIdArray[2];
		// new selectArea($("#container #insuredArea"), "省市选择", areaData, insuredArea).init();
		// function insuredArea(value) {
		// 	trialObj.extraParams.insuredResidentCounty = value.selectThreeObj.id;
		// 	return true;
		// };

		// 被保人职业选择
		new selectThree($("#insuredOccupationCode"), "职业选择", occupationData, insuredOccupationCode).init();

		function insuredOccupationCode(value) {
			trialObj.extraParams.insuredOccupationCode = value.selectThreeObj.id;
			return true;
		};

		// 被保人 身份有效期选择
		new selectDate($("#insuredCardValid"), "birthday", '2020-01-01', 0, 30, insuredCardValid).init();

		function insuredCardValid(value) {
			trialObj.extraParams.insuredCardValid = value;
			return true;
		}
	}

	// 根据身份证重新计算保费
	$("#container").on("blur", "input[data-type='certiNo']", function(event) {
		var $that = $(this),
			cardObj = dateUnit.parseIdCard($that.val()),
			certiNoId = $that.attr("id"),
			relaTag = $("#relaId").attr("data-id"),
			relaState = Object.is(relaTag, defaultRela);
		if (cardObj) {
			switch (certiNoId) {
				case 'holder_certiNo':
					var flag = dateUnit.getAgeRangeState(cardObj.birthday, {
						"age": 18
					}, {
						"age": 100
					});

					if (!flag) {
						new dateModal(null, "stateIndform", "投保人年龄最小18周岁，最大50周岁").init().show();
						$("#holder_certiNo").val('');
						$("#holder_certiNo").closest('.item').attr('data-state', '');
						return;
					} else {
						if (relaState) {
							trialObj.extraParams.insuredBirthday = cardObj.birthday;
							trialObj.extraParams.insuredSex = cardObj.sex;
							getPrem();
						};
					};
					break;
				case 'insured_certiNo':
					var flag = dateUnit.getAgeRangeState(cardObj.birthday, {
						"ageDay": 30
					}, {
						"age": 17
					});

					if (!flag) {
						new dateModal(null, "stateIndform", "如果被保人非本人,被保人年龄最小30天，最大17周岁").init().show();
						$("#insured_certiNo").val('');
						$("#insured_certiNo").closest('.item').attr('data-state', '');
						return;
					} else {
						if (!relaState) {
							trialObj.extraParams.insuredBirthday = cardObj.birthday;
							trialObj.extraParams.insuredSex = cardObj.sex;
							getPrem()
						}
					};
					break;
			}
		}
	});

	// 获取保费 并 存储rrbxSet
	function getPrem() {
		premAjax(trialObj, function(value) {
			$("#prem").text(value + "元");

			trialObj.extraParams.prem = value;
			rrbxSetObj.insuredPars.pars.rrbx = trialObj;

			// 投保费用限制
			insureFilter(value);
			localStorage.setItem(rrbxSetObj.insuredPars.parsInit.rrbx.rrbxProductId, JSON.stringify(rrbxSetObj));
		});
	}

	// 逻辑:投保条件过滤
	// 条件:保费累计20万及以上需身份证复印件等等
	var payYear = {
		"1": 1,
		"4": 10,
		"6": 20,
		"8": 30,
		"9": 60
	};

	function insureFilter(prem) {
		var birthday = trialObj.extraParams.insuredBirthday,
			age = dateUnit.getAgeFromBirthday(birthday).age,
			num = payYear[trialObj.extraParams.payEndYear],
			totalPrem = Object.is(num, "60") ? (60 - age) * prem : prem * num;
		if (totalPrem > 200000) {
			new dateModal(null, "stateIndform", "保费累计超过20万元,需要身份证复印件,或咨询客服,或回试算页重新选择保障方案").init().show();
		};
	}

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