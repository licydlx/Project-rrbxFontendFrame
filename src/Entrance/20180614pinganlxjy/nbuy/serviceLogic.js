import dateUnit from '../../../../Static/js/depend/tools/dateUnit.js';
import premAjax from '../../../../Static/js/depend/datas/premAjax.js';
import nbuyClause from '../../../../Static/js/nbuy/nbuyClause.js';
import selectOne from '../../../../Static/js/depend/tools/selectOne.js';
import selectTwo from '../../../../Static/js/depend/tools/selectTwo.js';
import selectDate from '../../../../Static/js/depend/tools/selectDate.js';
import {
	alertError
} from '../../../../Static/js/depend/common.js';
import {
	dateModal,
	previewImgModal
} from '../../../../Static/js/common/modal.js';
import buyAjax from '../../../../Static/js/depend/datas/buyAjax.js';
import getInsuredPars from '../../../../Static/js/nbuy/getInsuredPars.js';

import invoiceData from './invoiceData.js';

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
	//


	// 上传图片预览 事件绑定
	$("#container").on('click', '.uploadItem img', function(event) {
		event.preventDefault();
		/* Act on the event */
		new previewImgModal(null, "previewImg", $(this).attr('src')).init().show();
	});

	// 例子图片预览 事件绑定
	$("#container").on('click', '#bankTemplate', function(event) {
		event.preventDefault();
		/* Act on the event */
		new previewImgModal(null, "previewImg", $(this).children('img').attr('src')).init().show();
	});

	var uploading = false;

	function ULI(id,callback) {
		if (uploading) {
			new dateModal(null, "stateIndform", "文件正在上传中，请稍候").init().show();
			return false;
		}
		$.ajax({
			url: "https://uatapi2.renrenbx.com/mobile/upload/image",
			type: 'POST',
			cache: false,
			data: new FormData($(id)[0]),
			processData: false,
			contentType: false,
			dataType: "json",
			beforeSend: function() {
				uploading = true;
			},
			success: function(data) {
				if (data.code == 10000) {
					$(tpl(data.response)).insertBefore(id);
					if (callback) {
						callback(data.response);
					};
				} else {
					new dateModal(null, "stateIndform", data.info).init().show();
				}
				uploading = false;
			}
		});
	}

	function tpl(src) {
		return '<a class="uploadItem"><img src=' + src + ' /></a>';
	}

	var oneArray =[],
		twoArray = [],
		threeArray = [];
	$("#uploadImg").on("change", function() {
		ULI('#uploadForm',function(src){
			oneArray.push(src);
			trialObj.extraParams.licence = oneArray.join(',');
		});
	});

	$("#uploadImg-two").on("change", function() {
		ULI('#uploadForm-two',function(src){
			twoArray.push(src);
			trialObj.extraParams.insurePics = twoArray.join(',');
		});
	});

	$("#uploadImg-three").on("change", function() {
		ULI('#uploadForm-three',function(src){
			threeArray.push(src);
			trialObj.extraParams.payment = threeArray.join(',');
		});
	});

	// tabs 切换
	$("#lxjy-tabs").on('click', 'a', function(event) {
		event.preventDefault();
		/* Act on the event */
		$(this).parent().siblings().removeClass('active');
		$(this).parent().addClass('active');

		var curDataId = $(this).attr('data-id');
		// 切换后 显示内容的高度问题
		if (Object.is(curDataId,"0")) {
			$(".tabs-content").css('height','130px');
			trialObj.extraParams.submitType = "0";
		} else {
			$(".tabs-content").css('height','350px');
			trialObj.extraParams.submitType = "1";
		};
		var seq = parseInt(curDataId) * 100;
		$("[data-id='lxjy-tabs']").css('left', - seq + '%');
	});

	// 获取今天日期
	var pbd = dateUnit.getFormatDate().commonCurDate;
	var policyEndDate = dateUnit.getDateFromDimdd(pbd, 2);
	$("#policyBeginDate").attr("data-id",pbd);
	$("#policyEndDate").val(policyEndDate.commonCurDate);
	// 起保日期
	new selectDate($("#policyBeginDate"), "birthday", pbd, 0, 10, policyBeginDate).init();

	function policyBeginDate(value) {
		var pbdTag = dateUnit.getDateDimdd(pbd, value);
		if (pbdTag < 0) {
			new dateModal(null, "stateIndform", "起保日期不能低于今天").init().show();
			return false;
		} else {
			trialObj.extraParams.policyBeginDate = value;
			var policyEndDate = dateUnit.getDateFromDimdd(value, 2);
			$("#policyEndDate").val(policyEndDate.commonCurDate);
			return true;
		};
	}

	new selectOne($("#invoice"), "选择发票", invoiceData, invoice).init();

	function invoice(content, value) {
		trialObj.extraParams.invoice = value;
		return true;
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