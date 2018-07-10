import {
	buyAjax
} from '../../../Static/Depend/ajaxMod.js';

import {
	getPrem
} from '../../../Static/Depend/serviceMod/service.js';

import Modal from '../../../Static/Depend/Modal/Modal.js';

import dateUnit from '../../../Static/Depend/dateUnit.js';

import selectOne from '../../../Static/Depend/selectMod/selectOne.js';
import getInsuredPars from '../../../Static/Common/js/getInsuredPars.js';

import relaData from './relaData.js';

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
	// 逻辑:获取投保人的关系
	// 条件:点击下拉选择,即可
	new selectOne($("#relaId"), "关系选择", relaData, relaId).init();

	function relaId(content, selectObj) {
		parsObj.extraParams.relatedperson = selectObj.id;

		if (Object.is(selectObj.id, servicePars.defaultPars.rela)) {
			relaObj.nextAll().remove();
		} else {
			relaObj.after(relaNextCloneObj);

			insuredIns();
		};
		return true;
	}

	function insuredIns() {
		console.log("关系不是本人时,执行");
	}
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
				"age": 46
			}, {
				"age": 80
			});

			if (!flag) {
				new Modal('defaultConfig', {
					text: '被保人年龄最小46周岁，最大80周岁'
				}).init();
				$("#holder_certiNo").val('').closest('.item').attr('data-state', '');
			} else {
				parsObj.extraParams.birthday = cardObj.birthday;
				getPrem(parsObj, servicePars, $("#prem"));
			};

		} else if (!relaState && Object.is("insured_certiNo", certiNoId)) {
			var flag = dateUnit.getAgeRangeState(cardObj.birthday, {
				"age": 46
			}, {
				"age": 80
			});

			if (!flag) {
				new Modal('defaultConfig', {
					text: '被保人年龄最小46周岁，最大80周岁'
				}).init();
				$("#insured_certiNo").val('').closest('.item').attr('data-state', '');
			} else {
				parsObj.extraParams.birthday = cardObj.birthday;

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