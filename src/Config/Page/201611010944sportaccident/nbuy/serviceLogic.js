import dateUnit from '../../../../Static/js/depend/tools/dateUnit.js';
import nbuyClause from '../../../../Static/js/nbuy/nbuyClause.js';
import {
	alertError
} from '../../../../Static/js/depend/common.js';
import {
	dateModal
} from '../../../../Static/js/common/modal.js';
import buyAjax from '../../../../Static/js/depend/datas/buyAjax.js';
import getInsuredPars from '../../../../Static/js/nbuy/getInsuredPars.js';

import selectDate from '../../../../Static/js/depend/tools/selectDate.js';
import selectTwo from '../../../../Static/js/depend/tools/selectTwo.js';
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

	// =============================
	// 业务逻辑
	// =============================

	// 本人:defaultRela
	// 实际关系:relaTag
	var defaultRela = rrbxSetObj.defaultPars.rela,
		relaTag = $("#relaId").attr("data-id");

	// 逻辑:获取投被保人的省市区
	// 条件:点击下拉选择,即可
	new selectTwo($("#holderArea"), "省市选择", areaData, holderArea).init();

	function holderArea(value) {
		trialObj.extraParams.proname = value.selectOneObj.id;
		trialObj.extraParams.cityname = value.selectTwoObj.id;
		return true;
	};

	// 逻辑:根据被保人身份证重新计算保费
	// 条件:在被保人选项输入正确身份证,并移走光标,即可
	$("#container").on("blur", "input[data-type='certiNo']", function(event) {
		var $that = $(this),
			cardObj = dateUnit.parseIdCard($that.val()),
			certiNoId = $that.attr("id"),
			relaTag = $("#relaId").attr("data-id"),
			relaState = Object.is(relaTag, defaultRela);
		if (relaState && Object.is("holder_certiNo", certiNoId)) {
			var curAge = dateUnit.getAgeFromBirthday(cardObj.birthday).age;
			if (curAge < 18) {
				new dateModal(null, "stateIndform", "投保人年龄最小18周岁").init().show();
				$("#holder_certiNo").val('').closest('.item').attr('data-state', '');
				return;
			};

			var flag = dateUnit.getAgeRangeState(cardObj.birthday, {
				"age": 18
			}, {
				"age": 65
			});

			if (!flag) {
				new dateModal(null, "stateIndform", "被保人年龄最小18周岁,最大65周岁;").init().show();
				$("#holder_certiNo").val('').closest('.item').attr('data-state', '');
			};
		} else if (Object.is("insured_certiNo", certiNoId)) {
			var flag = dateUnit.getAgeRangeState(cardObj.birthday, {
				"age": 18
			}, {
				"age": 65
			});

			if (!flag) {
				new dateModal(null, "stateIndform", "被保人年龄最小18周岁,最大65周岁").init().show();
				$("#insured_certiNo").val('').closest('.item').attr('data-state', '');
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

	// 逻辑:选择保单生效期
	// 条件:延后不超过1年
	new selectDate($("#policyBeginDate"), "confirmedDate", null, 0, 1, policyBeginDate).init();
	trialObj.policyBeginDate = $("#policyBeginDate").attr("value");
	function policyBeginDate(value) {
		var today = dateUnit.getFormatDate().commonCurDate,
			gap = dateUnit.getDateDimdd(today, value);
		if (gap >= 1 && gap <= 365) {
			trialObj.policyBeginDate = value;
			return true;
		} else {
			new dateModal(null, "stateIndform", "保单生效日必须延后1天到1年").init().show();
			return false;
		};
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