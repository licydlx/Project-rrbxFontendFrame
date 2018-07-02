import env from '../../../Config/env.js';
import {
	commonJs,
	alertError
} from '../../../Static/js/depend/common.js';

import dateUnit from '../../../Static/js/depend/tools/dateUnit.js';
import premAjax from '../../../Static/js/depend/datas/premAjax.js';
import nbuyClause from '../../../Static/js/nbuy/nbuyClause.js';
import selectOne from '../../../Static/js/depend/tools/selectOne.js';
import selectTwo from '../../../Static/js/depend/tools/selectTwo.js';
import selectDate from '../../../Static/js/depend/tools/selectDate.js';
import {
	dateModal,
	dateModals,
	previewImgModal,
	previewImgModals
} from '../../../Static/js/common/modal.js';
import buyAjax from '../../../Static/js/depend/datas/buyAjax.js';
import getInsuredPars from '../../../Static/js/nbuy/getInsuredPars.js';

import invoiceData from './invoiceData.js';
import assetData from './assetData.js';
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
	//
	// 本人:defaultRela
	// 实际关系:relaTag
	var defaultRela = rrbxSetObj.defaultPars.rela;

	// 逻辑:获取投保人的关系
	// 条件:点击下拉选择,即可
	var relaObj = $("#relaId").closest(".item"),
		relaNextCloneObj = relaObj.nextAll().clone();
	relaObj.nextAll().remove();

	new selectOne($("#relaId"), "关系选择", relaData, relaId).init();

	var insuredInsTag = true;

	function relaId(constent, value) {
		trialObj.insurantApplicantRelation = value;

<<<<<<< HEAD
		//
=======
		// 
>>>>>>> 9d2defb7cbe923c6d95e2637279e7b019022ed16
		var iAddress = $('#insuredAddress');
		if (Object.is(value, defaultRela)) {
			iAddress.attr('data-belong', 'policyHolderUser');
		} else {
			iAddress.attr('data-belong', 'insuredUser');
		};

		var cloneObj = relaNextCloneObj;
		if (Object.is(value, rrbxSetObj.defaultPars.rela)) {
			relaObj.nextAll().remove()
		} else {
			relaObj.after(cloneObj);
			if (insuredInsTag) {
				insuredInsTag = false;
				insuredIns();
			};
		};
		return true;
	}


	function insuredIns() {

		$("#insuredUploadImg").on("change", function(event) {
			uploadTag = 'insuredUploadForm';

			file = event.target.files[0];
			// 选择的文件是图片
			if (file.type.indexOf("image") == 0) {
				reader.readAsDataURL(file);
			}

		});
	}

	Array.prototype.indexOf = function(val) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] == val) return i;
		}
		return -1;
	};

	Array.prototype.remove = function(val) {
		var index = this.indexOf(val);
		if (index > -1) {
			this.splice(index, 1);
		}
	};

	var curImgDom;
	// 上传图片预览 事件绑定
	$("#container").on('click', '.uploadItem img', function(event) {
		event.preventDefault();
		/* Act on the event */
		new previewImgModal($(this), "previewImg", $(this).attr('src'), $(this).closest('.uploadBox').find('form')[0].id, function(dom, src, parentId) {
			if (Object.is(parentId, "uploadForm")) {
				oneArray.remove(src);
			} else if (Object.is(parentId, "uploadForm-two")) {
				twoArray.remove(src);
			} else if (Object.is(parentId, "uploadForm-three")) {
				threeArray.remove(src);
			} else if (Object.is(parentId, "insuredUploadImg")) {
				fourArray.remove(src);
			};
		}).init().show();
	});

	// 例子图片预览 事件绑定
	$("#container").on('click', '#bankTemplate', function(event) {
		event.preventDefault();
		/* Act on the event */
		new previewImgModals(null, "previewImgs", 'https://m1.renrenbx.com/rrbxcdn/rrbx/pinganlxjy/bankCom.png').init().show();
	});

	// var uploading = false;

	function tpl(src) {
		return '<a class="uploadItem"><img src=' + src + ' /></a>';
	}

	// 压缩图片需要的一些元素和对象
	var reader = new FileReader(),
		img = new Image();
	// 选择的文件对象
	var file = null;
	// 缩放图片需要的canvas
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	// base64地址图片加载完毕后
	img.onload = function() {
		// 图片原始尺寸
		var originWidth = this.width;
		var originHeight = this.height;
		// 最大尺寸限制
		var maxWidth = 1240,
			maxHeight = 900;
		// 目标尺寸
		var targetWidth = originWidth,
			targetHeight = originHeight;
		// 图片尺寸超过400x400的限制
		if (originWidth > maxWidth || originHeight > maxHeight) {
			if (originWidth / originHeight > maxWidth / maxHeight) {
				// 更宽，按照宽度限定尺寸
				targetWidth = maxWidth;
				targetHeight = Math.round(maxWidth * (originHeight / originWidth));
			} else {
				targetHeight = maxHeight;
				targetWidth = Math.round(maxHeight * (originWidth / originHeight));
			}
		}
		// canvas对图片进行缩放
		canvas.width = targetWidth;
		canvas.height = targetHeight;
		// 清除画布
		context.clearRect(0, 0, targetWidth, targetHeight);
		// 图片压缩
		context.drawImage(img, 0, 0, targetWidth, targetHeight);

		$.ajax({
			url: env + "/mobile/upload/base64/content",
			type: 'POST',
			data: {
				"content": JSON.stringify(canvas.toDataURL('image/jpeg'))
			},
			dataType: "json",
			beforeSend: function() {
				commonJs.loadAnimation();
			},
			success: function(data) {
				if (data.code == 10000) {
					$(tpl(data.response)).insertBefore("#" + uploadTag);

					if (Object.is(uploadTag, 'uploadForm')) {
						oneArray.push(data.response);
						trialObj.extraParams.holderLicence = oneArray.join(',');
						var relaTag = $("#relaId").attr("data-id");
						if (Object.is(relaTag, defaultRela)) {
							trialObj.extraParams.insuredLicence = oneArray.join(',');
						};
						document.getElementById("uploadForm").reset();
					} else if (Object.is(uploadTag, 'uploadForm-two')) {
						twoArray.push(data.response);
						trialObj.extraParams.insurePics = twoArray.join(',');
						document.getElementById("uploadForm-two").reset();
					} else if (Object.is(uploadTag, 'uploadForm-three')) {
						threeArray.push(data.response);
						trialObj.extraParams.payment = threeArray.join(',');
						document.getElementById("uploadForm-three").reset();
					} else if (Object.is(uploadTag, 'insuredUploadForm')) {
						fourArray.push(data.response);
						trialObj.extraParams.insuredLicence = fourArray.join(',');
						document.getElementById("insuredUploadForm").reset();
					};
					commonJs.loadClose();
				} else {
					commonJs.loadClose();
					alertError(data.info);
				}
			},
			error: function(xhr, type) {
				commonJs.loadClose();
				alertError("请求超时，请稍后再试！");
			},
			complete: function(xhr, status) {
				img.src = null;
				if (status == 'timeout') {
					xhr.abort();
					$.alert("网络超时，请刷新", function() {
						location.reload();
					})
				}
			}
		});
	};
	// 文件base64化，以便获知图片原始尺寸
	reader.onload = function(e) {
		img.src = e.target.result;
	};

	var oneArray = [],
		twoArray = [],
		threeArray = [],
		fourArray = [];
	var uploadTag;
	$("#uploadImg").on("change", function(event) {
		uploadTag = 'uploadForm';
		file = event.target.files[0];
		// 选择的文件是图片
		if (file.type.indexOf("image") == 0) {
			reader.readAsDataURL(file);
		}
	});

	$("#uploadImg-two").on("change", function(event) {
		uploadTag = 'uploadForm-two';
		file = event.target.files[0];
		// 选择的文件是图片
		if (file.type.indexOf("image") == 0) {
			reader.readAsDataURL(file);
		}
	});

	$("#uploadImg-three").on("change", function(event) {
		uploadTag = 'uploadForm-three';
		file = event.target.files[0];
		// 选择的文件是图片
		if (file.type.indexOf("image") == 0) {
			reader.readAsDataURL(file);
		}
	});

	var docWidth = $("#container").width();
	var tc = $(".tabs-content");
	if (docWidth > 450) {
		tc.css('height', '480px');
	} else {
		tc.css('height', '400px');
	};
	// tabs 切换
	$("#lxjy-tabs").on('click', 'a', function(event) {
		event.preventDefault();
		/* Act on the event */
		$(this).parent().siblings().removeClass('active');
		$(this).parent().addClass('active');

		var curDataId = $(this).attr('data-id');
		// 切换后 显示内容的高度问题
		if (Object.is(curDataId, "0")) {
			trialObj.extraParams.submitType = "0";
		} else {
			trialObj.extraParams.submitType = "1";
		};
		var seq = parseInt(curDataId) * 100;
		$("[data-id='lxjy-tabs']").css('left', -seq + '%');
	});

	// 获取今天日期
	var pbd = dateUnit.getFormatDate().commonCurDate;
	var policyStartDate = dateUnit.getDateFromDimdd(pbd, 3).commonCurDate;
	var periodNum = parseInt(trialObj.extraParams.period);

	setBEdate(policyStartDate);
	// 设置起止日期属性
	function setBEdate(sdDate) {
		var sdArray = sdDate.split('-');
		if (parseInt(sdArray[1]) + periodNum > 12) {
			sdArray[0] = parseInt(sdArray[0]) + 1;
			sdArray[1] = parseInt(sdArray[1]) + periodNum - 12
		} else {
			sdArray[1] = parseInt(sdArray[1]) + periodNum;
		};

		if (sdArray[1] < 10) {
			sdArray[1] = '0' + sdArray[1];
		};
		var policyEndDate = sdArray.join('-');

		$("#policyBeginDate").attr("data-id", sdDate);
		$("#policyEndDate").val(policyEndDate);
	}
	// 起保日期
	new selectDate($("#policyBeginDate"), "birthday", policyStartDate, 0, 10, policyBeginDate).init();

	function policyBeginDate(value) {
		var pbdTag = dateUnit.getDateDimdd(policyStartDate, value);
		if (pbdTag < 0) {
			new dateModal(null, "stateIndform", "起保日期不符合条件").init().show();
			return false;
		} else {
			trialObj.extraParams.policyBeginDate = value;
			setBEdate(value);
			return true;
		};
	}

	new selectOne($("#invoice"), "选择发票", invoiceData, invoice).init();

	function invoice(content, value) {
		trialObj.extraParams.invoice = value;
		return true;
	}

	new selectOne($("#asset"), "选择资产", assetData, asset).init();

	function asset(content, value) {
		if (Object.is(value, '0')) {
			trialObj.extraParams.asset = value;
			return true;
		} else {
			new dateModals(null, "stateIndforms", {
				'title': '您不符合投保条件',
				'content': '请联系400-7722-928，电话咨询投保'
			}).init().show();
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