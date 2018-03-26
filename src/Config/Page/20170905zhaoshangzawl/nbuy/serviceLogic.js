import dateUnit from '../../../../Static/js/depend/tools/dateUnit.js';
import premAjax from '../../../../Static/js/depend/datas/premAjax.js';
import selectOne from '../../../../Static/js/depend/tools/selectOne.js';
import selectArea from '../../../../Static/js/depend/tools/selectArea.js';
import areaData from './area.js';
import {
	dateModal
} from '../../../../Static/js/common/modal.js';
import {
	alertError
} from '../../../../Static/js/depend/common.js';
import nbuyClause from '../../../../Static/js/nbuy/nbuyClause.js';
import getInsuredPars from '../../../../Static/js/nbuy/getInsuredPars.js';
import buyAjax from '../../../../Static/js/depend/datas/buyAjax.js';

const serviceLogic = function(a) {
	var renderData = a[0],
		rrbxSetObj = a[1];

	// 试算对象 
	var trialObj = rrbxSetObj.insuredPars.pars.rrbx;
	// 已阅读文案
	nbuyClause(rrbxSetObj.renderDate.insurePolicy);
	// 显示保费
	$("#prem").text(rrbxSetObj.insuredPars.pars.extraParams.prem + "元");
	// 平台识别
	if (rrbxSetObj.GV && Object.is(rrbxSetObj.GV.sceneType, '3')) $(".mg-b-footer").css("margin-bottom", "1rem");

	// 投保人职业选择
	new selectOne($("#holderOccupationCode"), "职业选择", renderData.data.holderOccupationCode, holderOccupationCode).init();

	function holderOccupationCode(content, value) {
		return true;
	};

	// 投保人省市地区选择
	new selectArea($("#holderArea"), "省市选择", areaData, holderArea).init();

	function holderArea(content, value) {
		return true;
	};

	// 根据身份证重新计算保费
	$("#container").on("blur", "input[data-type='certiNo']", function(event) {
		var $that = $(this);
		var relaTag = Object.is(rrbxSetObj.defaultPars.rela, $("#relaId").attr("data-id"));
		var idTag = $that.attr("id");
		switch (idTag) {
			case "holder_certiNo":
				var holder_certiNo = $("#holder_certiNo");
				state = holder_certiNo.closest('.item').attr("data-state");
				if (!Object.is(state, "right")) return;
				var cardObj = dateUnit.parseIdCard(holder_certiNo.val()),
					flag = dateUnit.getAgeRangeState(cardObj.birthday, {
						"age": 20
					}, {
						"age": 60
					});

				if (!flag) {
					new dateModal(null, "stateIndform", "投保人年龄最小20周岁,最大60周岁").init().show();
					holder_certiNo.val('');
					holder_certiNo.closest('.item').attr('data-state', '');
					return;
				} else {
					trialObj.extraParams.holderBirthday = cardObj.birthday;
					trialObj.extraParams.holdersex = cardObj.sex;
				};
				break;

			case "insured_certiNo":
				var insured_certiNo = $("#insured_certiNo"),
					state = insured_certiNo.closest('.item').attr("data-state");
				if (!Object.is(state, "right")) return;
				var cardObj = dateUnit.parseIdCard(insured_certiNo.val()),
					flag = dateUnit.getAgeRangeState(cardObj.birthday, {
						"ageDay": 60
					}, {
						"age": 9
					});

				if (!flag) {
					new dateModal(null, "stateIndform", "被保人年龄最小60天，最大9周岁").init().show();
					insured_certiNo.val('');
					insured_certiNo.closest('.item').attr('data-state', '');
					return;
				} else {
					trialObj.extraParams.insuredBirthday = cardObj.birthday;
					trialObj.extraParams.insuredsex = cardObj.sex;
				};
				break;
		}
		getPrem();
	});

	// 购买产品 
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

	// 获取保费 并 存储rrbxSet
	function getPrem() {
		premAjax(trialObj, function(value) {
			$("#prem").text(value + "元");

			trialObj.extraParams.prem = value;
			rrbxSetObj.insuredPars.pars.rrbx = trialObj;
			localStorage.setItem(rrbxSetObj.insuredPars.parsInit.rrbx.rrbxProductId, JSON.stringify(rrbxSetObj));
		});
	}
}
export default serviceLogic;