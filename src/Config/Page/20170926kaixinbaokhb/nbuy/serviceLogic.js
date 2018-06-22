import dateUnit from '../../../../Static/js/depend/tools/dateUnit.js';
import premAjax from '../../../../Static/js/depend/datas/premAjax.js';
import nbuyClause from '../../../../Static/js/nbuy/nbuyClause.js';
import selectOne from '../../../../Static/js/depend/tools/selectOne.js';
import selectTwo from '../../../../Static/js/depend/tools/selectTwo.js';
import selectArea from '../../../../Static/js/depend/tools/selectArea.js';
import selectDate from '../../../../Static/js/depend/tools/selectDate.js';
import {
	alertError
} from '../../../../Static/js/depend/common.js';
import {
	dateModal
} from '../../../../Static/js/common/modal.js';
import buyAjax from '../../../../Static/js/depend/datas/buyAjax.js';
import getInsuredPars from '../../../../Static/js/nbuy/getInsuredPars.js';

import relaData from './relaData.js';
import areaData from './areaData.js';
import bankCodeData from './bankCodeData.js';
import TaxPayerData from './TaxPayerData.js';

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

	// 逻辑:获取投保人的关系
	// 条件:点击下拉选择,即可
	var relaObj = $("#relaId").closest(".item"),
		relaNextCloneObj = relaObj.nextAll().clone();
	relaObj.nextAll().remove();

	new selectOne($("#relaId"), "关系选择", relaData, relaId).init();

	var insuredInsTag = true;

	function relaId(content, value) {
		trialObj.insurantApplicantRelation = value;

		var cloneObj = relaNextCloneObj;
		if (Object.is(value, rrbxSetObj.defaultPars.rela)) {
			relaObj.nextAll().remove();
		} else {
			relaObj.after(cloneObj);
			if (insuredInsTag) {
				insuredInsTag = false;
				insuredIns();
			};
		};
		return true;
	}

	// 逻辑:被保人非本人时,绑定被保人选项事件
	// 条件:改变关系,即可
	function insuredIns() {
		// 被保人 身份有效期开始日
		new selectDate($("#insuredRecognizeeStartID"), "birthday", '2010-01-01', 50, 9, insuredRecognizeeStartID).init();

		function insuredRecognizeeStartID(value) {
			var dateGap = dateUnit.getDateDimdd(trialObj.extraParams.insuredRecognizeeEndID, value);
			if (dateGap > 0) {
				new dateModal(null, "stateIndform", "开始日要小于结束日").init().show();
				return false;
			} else {
				trialObj.extraParams.insuredRecognizeeStartID = value;
				return true;
			};

		}

		// 被保人 身份有效期结束日
		new selectDate($("#insuredRecognizeeEndID"), "birthday", '2020-01-01', 1, 50, insuredRecognizeeEndID).init();

		function insuredRecognizeeEndID(value) {
			var dateGap = dateUnit.getDateDimdd(trialObj.extraParams.insuredRecognizeeStartID, value);
			if (dateGap < 0) {
				new dateModal(null, "stateIndform", "开始日要小于结束日").init().show();
				return false;
			} else {
				trialObj.extraParams.insuredRecognizeeEndID = value;
				return true;
			};
		}
		// 逻辑:获取被保人的省市区
		// 条件:点击下拉选择,即可
		new selectTwo($("#insuredArea"), "省市选择", areaData, insuredArea).init();

		function insuredArea(value) {
			trialObj.extraParams.insuredProvince = value.selectOneObj.id;
			trialObj.extraParams.insuredCity = value.selectTwoObj.id;
			return true;
		};

		//  被保人纳税标识符
		new selectOne($("#recognizeeTaxPayer"), "选择纳税标识", TaxPayerData, recognizeeTaxPayer).init();

		function recognizeeTaxPayer(content, value) {
			if (Object.is(value, '1')) {
				trialObj.extraParams.recognizeeTaxPayer = value;
				return true;
			} else {
				new dateModal(null, "stateIndform", "该产品目前仅接受'中国大陆居民'的投保申请").init().show();
				return false;
			};
		}
	}

	// 逻辑:获取投保人的省市区,如果被保人为本人则...
	// 条件:点击下拉选择,即可
	new selectTwo($("#holderArea"), "省市选择", areaData, holderArea).init();

	function holderArea(value) {
		trialObj.extraParams.holderProvince = value.selectOneObj.id;
		trialObj.extraParams.holderCity = value.selectTwoObj.id;
		if (Object.is(defaultRela, relaTag)) {
			trialObj.extraParams.insuredProvince = value.selectOneObj.id;
			trialObj.extraParams.insuredCity = value.selectTwoObj.id;
		};
		return true;
	};

	// 身份有效期开始日
	new selectDate($("#holderApplicantStartID"), "birthday", '2010-01-01', 50, 9, holderApplicantStartID).init();

	function holderApplicantStartID(value) {
		var dateGap = dateUnit.getDateDimdd(trialObj.extraParams.holderApplicantEndID, value);
		if (dateGap > 0) {
			new dateModal(null, "stateIndform", "开始日要小于结束日").init().show();
			return false;
		} else {
			trialObj.extraParams.holderApplicantStartID = value;
			if (Object.is(defaultRela, relaTag)) {
				trialObj.extraParams.insuredRecognizeeStartID = value;
			};
			return true;
		};

	}

	// 身份有效期结束日
	new selectDate($("#holderApplicantEndID"), "birthday", '2020-01-01', 1, 50, holderApplicantEndID).init();

	function holderApplicantEndID(value) {
		var dateGap = dateUnit.getDateDimdd(trialObj.extraParams.holderApplicantStartID, value);
		if (dateGap < 0) {
			new dateModal(null, "stateIndform", "开始日要小于结束日").init().show();
			return false;
		} else {
			trialObj.extraParams.holderApplicantEndID = value;
			if (Object.is(defaultRela, relaTag)) {
				trialObj.extraParams.insuredRecognizeeEndID = value;
			};
			return true;
		};
	}

	//  选择所属银行
	new selectOne($("#bankCode"), "选择银行", bankCodeData, bankCode).init();

	function bankCode(content, value) {
		trialObj.extraParams.bankCode = value;
		return true;
	}

	//  投保人纳税标识符
	new selectOne($("#applicantTaxPayer"), "选择纳税标识", TaxPayerData, applicantTaxPayer).init();

	function applicantTaxPayer(content, value) {
		if (Object.is(value, '1')) {
			trialObj.extraParams.applicantTaxPayer = value;
			if (Object.is(defaultRela, relaTag)) {
				trialObj.extraParams.recognizeeTaxPayer = value;
			};
			return true;
		} else {
			new dateModal(null, "stateIndform", "该产品目前仅接受'中国大陆居民'的投保申请").init().show();
			return false;
		};
	}

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
			if (!curAge) {
				new dateModal(null, "stateIndform", "请输入正确的身份证").init().show();
				$("#holder_certiNo").val('').closest('.item').attr('data-state', '');
				return;
			} else if (curAge && curAge < 18) {
				new dateModal(null, "stateIndform", "投保人年龄最小18周岁").init().show();
				$("#holder_certiNo").val('').closest('.item').attr('data-state', '');
				return;
			} else {
				var flag = dateUnit.getAgeRangeState(cardObj.birthday, {
					"ageDay": 28
				}, {
					"age": 55
				});

				if (!flag) {
					new dateModal(null, "stateIndform", "被保人年龄最小28天,最大55周岁").init().show();
					$("#holder_certiNo").val('').closest('.item').attr('data-state', '');
				}
			}
		} else if (Object.is("insured_certiNo", certiNoId)) {
			var flag = dateUnit.getAgeRangeState(cardObj.birthday, {
				"ageDay": 28
			}, {
				"age": 55
			});

			if (!flag) {
				new dateModal(null, "stateIndform", "被保人年龄最小28天,最大55周岁!").init().show();
				$("#insured_certiNo").val('').closest('.item').attr('data-state', '');
			}
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
	})

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

		var doneState = true,
			errName;

		if (!$(".agreed p:first-child input").is(":checked")) {
			alertError("请先同意以下条款！");
			return;
		};


		$(".itemBox").find(".item").each(function(index, val) {
			if ($(val).hasClass('input') && $(val).attr("data-state") !== "right") {
				doneState = false;
				if (!doneState && !errName) {
					errName = $(this).find('.title')[0].innerText.replace(/\s+/g, "");
				};
			}
			if ($(val).hasClass('choose')) {
				if (!$(val).find("input").attr("data-id")) {
					doneState = false;
					if (!doneState && !errName) {
						errName = $(this).find('.title')[0].innerText.replace(/\s+/g, "");
					};
				};
			};
		});

		if (doneState) {
			buyAjax(getInsuredPars(rrbxSetObj), rrbxSetObj);
		} else {
			alertError("请输入正确" + errName + "！");
			return;
		};
	});
}
export default serviceLogic;