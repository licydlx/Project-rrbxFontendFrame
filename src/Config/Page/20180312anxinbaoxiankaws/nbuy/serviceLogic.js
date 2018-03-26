import dateUnit from '../../../../Static/js/depend/tools/dateUnit.js';
import premAjax from '../../../../Static/js/depend/datas/premAjax.js';
import selectDate from '../../../../Static/js/depend/tools/selectDate.js';
import selectOne from '../../../../Static/js/depend/tools/selectOne.js';
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
	if (rrbxSetObj.renderDate.insurePolicy) {
		nbuyClause(rrbxSetObj.renderDate.insurePolicy);
	};
	// 显示保费
	$("#prem").text(trialObj.extraParams.prem + "元");
	// 平台识别
	if (rrbxSetObj.GV && Object.is(rrbxSetObj.GV.sceneType, '3')) $(".mg-b-footer").css("margin-bottom", "1rem");
	// =============
	// 业务逻辑
	// =============

	// 关系选择
	var relaObj = $("#relaId").closest(".item"),
		relaNextCloneObj = relaObj.nextAll().clone();
	relaObj.nextAll().remove();

	new selectOne($("#relaId"), "关系选择", renderData.data.rela, relaId).init();

	function relaId(constent, value) {
		var cloneObj = relaNextCloneObj;
		Object.is(value, rrbxSetObj.defaultPars.rela) ? relaObj.nextAll().remove() : relaObj.after(cloneObj);
		return true;
	}

	// 根据身份证重新计算保费
	$("#container").on("blur", "input[data-type='certiNo']", function(event) {
		var $that = $(this),
			relaTag = Object.is(rrbxSetObj.defaultPars.rela, $("#relaId").attr("data-id"));

		if (relaTag) {
			var holder_certiNo = $("#holder_certiNo");
			state = holder_certiNo.closest('.item').attr("data-state");
			if (!Object.is(state,"right")) return;
			var cardObj = dateUnit.parseIdCard(holder_certiNo.val()),
			flag = dateUnit.getAgeRangeState(cardObj.birthday, {
				"age": 18
			}, {
				"age": 100
			});
			
			if (!flag) {
				new dateModal(null, "stateIndform", "投保人年龄最小18周岁").init().show();
				holder_certiNo.val('');
				holder_certiNo.closest('.item').attr('data-state', '');
				return;
			} else {
				trialObj.extraParams.birthday = cardObj.birthday;
				trialObj.extraParams.sex = cardObj.sex;
			};
		} else {
			var insured_certiNo = $("#insured_certiNo"),
			state = insured_certiNo.closest('.item').attr("data-state");
			if (!Object.is(state,"right")) return;
			var cardObj = dateUnit.parseIdCard(insured_certiNo.val()),
			flag = dateUnit.getAgeRangeState(cardObj.birthday, {
				"age": 18
			}, {
				"age": 50
			});
			
			if (!flag) {
				new dateModal(null, "stateIndform", "被保人年龄最小18周岁，最大50周岁").init().show();
				insured_certiNo.val('');
				insured_certiNo.closest('.item').attr('data-state', '');
				return;
			} else {
				trialObj.extraParams.birthday = cardObj.birthday;
				trialObj.extraParams.sex = cardObj.sex;
			};
		};
		getPrem();
	});

	// =============
	// end
	// =============

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