import dateUnit from '../../../../Static/js/depend/tools/dateUnit.js';
import premAjax from '../../../../Static/js/depend/datas/premAjax.js';
import selectThree from '../../../../Static/js/depend/tools/selectThree.js';
import selectOne from '../../../../Static/js/depend/tools/selectOne.js';
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

import areaData from './areaData.js';
import occupationData from './occupationData.js';
import relaData from './relaData.js';

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

		trialObj.extraParams.holderResidentProvince = value.selectOneObj.id;
		trialObj.extraParams.holderResidentCity = value.selectTwoObj.id;
		trialObj.extraParams.holderResidentCounty = value.selectThreeObj.id;
		if (Object.is(relaTag, defaultRela)) {
			trialObj.extraParams.insureResidentProvince = value.selectOneObj.id;
			trialObj.extraParams.insureResidentCity = value.selectTwoObj.id;
			trialObj.extraParams.insureResidentCounty = value.selectThreeObj.id;
		};
		return true;
	};

	// 逻辑:获取投保人的职业,如果被保人为本人则...
	// 条件:点击下拉选择,即可
	new selectThree($("#holderOccupationCode"), "职业选择", occupationData, holderOccupationCode).init();

	function holderOccupationCode(value) {
		var rank = value.selectThreeObj.rank,
			relaTag = $("#relaId").attr("data-id");
		if (parseInt(rank) > 3) {
			new dateModal(null, "stateIndform", "该职位不支持投保").init().show();
			return false;
		} else {
			trialObj.extraParams.holderOccupationCode = value.selectThreeObj.id;
			trialObj.extraParams.holderOccupationClass = rank;
			if (Object.is(relaTag, defaultRela)) {
				trialObj.extraParams.insureOccupationCode = value.selectThreeObj.id;
				trialObj.extraParams.insureOccupationClass = rank;
			};
			return true;
		};

	};

	// 逻辑:获取身份证有效期,如果为长期,则...;为非长期,则下拉框可选
	// 条件:点击TAB选择,即可
	$("#container").on('click', '.singleSelect a', function(event) {
		event.preventDefault();

		var $this = $(this),
			endDateId = $this.closest('.content').attr("data-id"),
			codeTag = $this.attr("data-id");

		if (!$this.closest("li").hasClass("active")) {
			$this.closest(".content").find("li").removeClass("active");
			$this.closest("li").addClass("active");
		}

		if (Object.is(codeTag, "0")) {
			trialObj.extraParams[endDateId] = '9999-01-01';

			relaTag = $("#relaId").attr("data-id");
			if (Object.is(relaTag, defaultRela)) {
				trialObj.extraParams.insuredIdEndDate = '9999-01-01';
			};
			$("#" + endDateId + "").closest(".item").css({
				"border-bottom": 'none',
				"height": '0',

			});
		} else {
			trialObj.extraParams[endDateId] = $("#" + endDateId).val();
			$("#" + endDateId + "").closest(".item").css({
				"height": '3rem',
				"border-bottom": '1px solid #eee'
			});
		};
	});

	// 逻辑:获取投保人的身份有效期,如果被保人为本人则...
	// 条件:点击下拉选择,即可
	new selectDate($("#holderCardValid"), "birthday", '2020-01-01', 0, 60, holderCardValid).init();

	function holderCardValid(value) {
		relaTag = $("#relaId").attr("data-id");
		trialObj.extraParams.holderCardValid = value;
		if (Object.is(relaTag, defaultRela)) {
			trialObj.extraParams.insuredIdEndDate = value;
		};
		return true;
	}

	// 逻辑:获取投保人的关系
	// 条件:点击下拉选择,即可
	var relaObj = $("#relaId").closest(".item"),
		relaNextCloneObj = relaObj.nextAll().clone();
	relaObj.nextAll().remove();
	new selectOne($("#relaId"), "关系选择", relaData, relaId).init();

	function relaId(constent, value) {
		trialObj.insurantApplicantRelation = value;
		var cloneObj = relaNextCloneObj;
		if (Object.is(value, rrbxSetObj.defaultPars.rela)) {
			relaObj.nextAll().remove()
		} else {
			relaObj.after(cloneObj);
			insuredIns();
		};
		return true;
	}

	// 逻辑:被保人非本人时,绑定被保人选项事件
	// 条件:改变关系,即可
	function insuredIns() {

		// 逻辑:获取被保人的省市区
		// 条件:点击下拉选择,即可
		new selectArea($("#container #insuredArea"), "省市选择", areaData, insuredArea).init();

		function insuredArea(value) {
			trialObj.extraParams.insureResidentProvince = value.selectOneObj.id;
			trialObj.extraParams.insureResidentCity = value.selectTwoObj.id;
			trialObj.extraParams.insureResidentCounty = value.selectThreeObj.id;
			return true;
		};

		// 逻辑:获取被保人的职业
		// 条件:点击下拉选择,即可
		new selectThree($("#insureOccupationCode"), "职业选择", occupationData, insureOccupationCode).init();

		function insureOccupationCode(value) {
			var rank = value.selectThreeObj.rank;
			if (parseInt(rank) > 3) {
				new dateModal(null, "stateIndform", "该职位不支持投保").init().show();
				return false;
			} else {
				trialObj.extraParams.insureOccupationCode = value.selectThreeObj.id;
				trialObj.extraParams.insureOccupationClass = rank;
				return true;
			};
		};

		// 逻辑:获取被保人的身份有效期
		// 条件:点击下拉选择,即可
		new selectDate($("#insuredCardValid"), "birthday", '2020-01-01', 0, 60, insuredCardValid).init();

		function insuredCardValid(value) {
			trialObj.extraParams.insuredCardValid = value;
			return true;
		}
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
			if (curAge < 18) {
				new dateModal(null, "stateIndform", "投保人年龄最小18周岁").init().show();
				return;
			};

			var flag = dateUnit.getAgeRangeState(cardObj.birthday, {
				"age": 18
			}, {
				"age": 65
			});

			if (!flag) {
				new dateModal(null, "stateIndform", "被保人年龄最小18周岁,最大65周岁;如为他人投保,请先选择关系").init().show();
				$("#holder_certiNo").val('').closest('.item').attr('data-state', '');
			}
		} else if (Object.is("insured_certiNo", certiNoId)) {
			var flag = dateUnit.getAgeRangeState(cardObj.birthday, {
				"age": 18
			}, {
				"age": 65
			});

			if (!flag) {
				new dateModal(null, "stateIndform", "被保人年龄最小18周岁,最大65周岁").init().show();
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