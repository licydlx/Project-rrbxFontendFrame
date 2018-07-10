import {
	buyAjax
} from '../../../Static/Depend/ajaxMod.js';

import {
	getPrem
} from '../../../Static/Depend/serviceMod/service.js';

import Modal from '../../../Static/Depend/Modal/Modal.js';

import dateUnit from '../../../Static/Depend/dateUnit.js';

import selectOne from '../../../Static/Depend/selectMod/selectOne.js';
import selectDate from '../../../Static/Depend/selectMod/selectDate.js';
import selectArea from '../../../Static/Depend/selectMod/selectArea.js';
import getInsuredPars from '../../../Static/Common/js/getInsuredPars.js';

import relaData from './relaData.js';
import areaData from './areaData.js';

const serviceLogic = function(servicePars) {
	// 试算对象
	var parsObj = servicePars.insuredPars.pars;
	// 本人:defaultRela
	var defaultRela = servicePars.defaultPars.rela;
	// 显示保费
	$("#prem").text(servicePars.insuredPars.pars.extraParams.prem + "元");

	// =============================
	// 业务逻辑
	// =============================

	// ============
	// 关系模块
	// ============

	// 默认被保人是本人,清除被保人多余选项
	var relaObj = $("#relaId").closest(".item");
	var relaNextCloneObj = relaObj.nextAll().clone();
	relaObj.nextAll().remove();

	// 起保日期
	new selectDate($("#policyBeginDate"), "confirmedDate", null, 0, 1, policyBeginDate).init();

	var currentDate;

	function policyBeginDate(value) {
		currentDate = $('#policyBeginDate').attr('value');
		var dateGap = dateUnit.getDateDimdd(currentDate, value);
		if (dateGap < 0) {
			new Modal('defaultConfig', {
				text: '起保日期不低于今天'
			}).init();
			return false;
		} else {
			parsObj.rrbx.policyBeginDate = value;
			return true;
		};
	}
	parsObj.rrbx.policyBeginDate = currentDate;
	// 逻辑:获取投保人的关系
	// 条件:点击下拉选择,即可
	new selectOne($("#relaId"), "关系选择", relaData, relaId).init();

	var insuredInsTag = true;

	function relaId(content, selectObj) {
		parsObj.extraParams.relatedperson = selectObj.id;

		if (Object.is(selectObj.id, servicePars.defaultPars.rela)) {
			relaObj.nextAll().detach();
		} else {
			relaObj.after(relaNextCloneObj);

			if (insuredInsTag) {
				insuredInsTag = false;
				insuredIns();
			};
		};
		return true;
	}

	function insuredIns() {
		console.log("关系不是本人时,执行");
		// 被保人
		// 身份有效期开始日
		new selectDate($("#insuredUserTCertfBgnTm"), "birthday", '2010-01-01', 40, 10, insuredUserTCertfBgnTm).init();

		function insuredUserTCertfBgnTm(value) {
			var dateGap = dateUnit.getDateDimdd(parsObj.extraParams.insuredUserTCertfEndTm, value);
			if (dateGap > 0) {
				new Modal('defaultConfig', {
					text: '开始日要小于结束日'
				}).init();
				return false;
			} else {
				parsObj.extraParams.insuredUserTCertfBgnTm = value;
				return true;
			};

		}

		// 身份有效期结束日
		new selectDate($("#insuredUserTCertfEndTm"), "birthday", '2020-01-01', 1, 40, insuredUserTCertfEndTm).init();

		function insuredUserTCertfEndTm(value) {
			var dateGap = dateUnit.getDateDimdd(parsObj.extraParams.insuredUserTCertfBgnTm, value);
			if (dateGap < 0) {
				new Modal('defaultConfig', {
					text: '开始日要小于结束日'
				}).init();
				return false;
			} else {
				parsObj.extraParams.insuredUserTCertfEndTm = value;
				return true;
			};
		}
	}

	// 逻辑:获取投保人的省市区,如果被保人为本人则...
	// 条件:点击下拉选择,即可
	new selectArea($("#holderArea"), "省市选择", areaData, holderArea).init();

	function holderArea(value) {
		parsObj.extraParams.holderUserProvince = value.selectOneObj.id;
		parsObj.extraParams.holderUserCity = value.selectTwoObj.id;
		parsObj.extraParams.holderUserCounty = value.selectThreeObj.id;
		return true;
	};

	// ============
	// 关系模块
	// ============

	// ============
	// 身份证模块
	// 逻辑:根据被保人身份证重新计算保费
	// 条件:在被保人选项输入正确身份证,并移走光标,即可
	// ============

	$("#container").on("blur", "input[data-type='certiNo']", function(event) {
		var $that = $(this);
		var cardObj = dateUnit.parseIdCard($that.val());
		var certiNoId = $that.attr("id");
		var relaTag = $("#relaId").attr("data-id");
		var relaState = Object.is(relaTag, defaultRela);

		if (relaState) {
			var flag = dateUnit.getAgeRangeState(cardObj.birthday, {
				"age": 0
			}, {
				"age": 79
			});

			if (!flag) {
				new Modal('defaultConfig', {
					text: '被保人年龄最小1周岁，最大80周岁'
				}).init();
				$("#holder_certiNo").val('').closest('.item').attr('data-state', '');
			} else {
				parsObj.extraParams.insuredBirthday = cardObj.birthday;
				getPrem(parsObj, servicePars, $("#prem"));
			};

		} else if (!relaState && Object.is("insured_certiNo", certiNoId)) {
			var flag = dateUnit.getAgeRangeState(cardObj.birthday, {
				"age": 0
			}, {
				"age": 79
			});

			if (!flag) {
				new Modal('defaultConfig', {
					text: '被保人年龄最小1周岁，最大80周岁'
				}).init();
				$("#insured_certiNo").val('').closest('.item').attr('data-state', '');
			} else {
				parsObj.extraParams.insuredBirthday = cardObj.birthday;

				getPrem(parsObj, servicePars, $("#prem"));
			};
		} else if (!relaState && Object.is("holder_certiNo", certiNoId)) {

			if (cardObj) {
				var flag = dateUnit.getAgeRangeState(cardObj.birthday, {
					"age": 18
				}, {
					"age": 100
				});

				if (!flag) {
					new Modal('defaultConfig', {
						text: '投保人年龄最小18周岁'
					}).init();
					$("#holder_certiNo").val('').closest('.item').attr('data-state', '');
					return;
				}
			};
		};
	});
	// ============
	// 身份证模块
	// ============
	// 投保人
	// 身份有效期开始日
	new selectDate($("#holderUserTCertfBgnTm"), "birthday", '2010-01-01', 40, 10, holderUserTCertfBgnTm).init();

	function holderUserTCertfBgnTm(value) {
		var relaTag = $("#relaId").attr("data-id");
		var dateGap = dateUnit.getDateDimdd(parsObj.extraParams.holderUserTCertfEndTm, value);
		if (dateGap > 0) {
			new Modal('defaultConfig', {
				text: '开始日要小于结束日'
			}).init();
			return false;
		} else {
			parsObj.extraParams.holderUserTCertfBgnTm = value;
			if (Object.is(defaultRela, relaTag)) {
				parsObj.extraParams.insuredUserTCertfBgnTm = value;
			};
			return true;
		};

	}

	// 身份有效期结束日
	new selectDate($("#holderUserTCertfEndTm"), "birthday", '2020-01-01', 1, 40, holderUserTCertfEndTm).init();

	function holderUserTCertfEndTm(value) {
		var relaTag = $("#relaId").attr("data-id");
		var dateGap = dateUnit.getDateDimdd(parsObj.extraParams.holderUserTCertfBgnTm, value);
		if (dateGap < 0) {
			new Modal('defaultConfig', {
				text: '开始日要小于结束日'
			}).init();
			return false;
		} else {
			parsObj.extraParams.holderUserTCertfEndTm = value;
			if (Object.is(defaultRela, relaTag)) {
				parsObj.extraParams.insuredUserTCertfEndTm = value;
			};
			return true;
		};
	}
	// ============
	// 证件有效期
	// ============

	// ============
	// 证件有效期
	// ============


	// =============================
	// 业务逻辑
	// =============================

	// 购买
	$("#container").on("click", "#buyNow", function(event) {
		event.preventDefault();

		var doneState = true,
			errName;

		// 验证
		if (!$(".agreed p:first-child input").is(":checked")) {
			new Modal('defaultConfig', {
				text: "请先同意以下条款！"
			}).init();
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
			buyAjax(getInsuredPars(servicePars), servicePars);
		} else {
			new Modal('defaultConfig', {
				text: "请输入正确" + errName + "！"
			}).init();
			return;
		};
	});

}
export default serviceLogic;