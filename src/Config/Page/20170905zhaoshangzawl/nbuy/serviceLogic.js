import dateUnit from '../../../../Static/js/depend/tools/dateUnit.js';
import getPrem from '../../../../Static/js/depend/datas/premAjax.js';
import selectDate from '../../../../Static/js/depend/tools/selectDate.js';

import {dateModal} from '../../../../Static/js/common/modal.js';
const serviceLogic = function(productId, data) {
	var DataSet = JSON.parse(localStorage.getItem(productId)),
		GV = DataSet.GV,
		guaPeriod = DataSet.guaPeriod;
	// 平台识别
	if (GV && Object.is(GV.sceneType, '3')) $(".mg-b-footer").css("margin-bottom", "1rem");
	// 保单次日 生效 及 保障期限
	// ydlx
	// 2018-03-09
	var dataVal = DataSet.trialSet.pars.extraParams.dataVal,
		ensureDays;
	guaPeriod.forEach(function(value, index) {
		if (value.id == dataVal) {
			ensureDays = value.storageLife;
		};
	});
	var startDate = dateUnit.getDateFromDimdd(dateUnit.getFormatDate().iosCurDate, 1).commonCurDate,
		deadlineDate = dateUnit.getDateFromDimdd(startDate, ensureDays).commonCurDate;
	$("#confirmedDateId").attr("value", startDate);
	$("#closingDateId").attr("value", deadlineDate);
	// 根据身份证 重新计算保费
	// ydlx
	// 2018-3-8
	$("input[data-type='certiNo']").blur(function() {
		var that = $(this),
			relaTag = $("#relaId").attr("data-id"),
			idCard,
			age;
		if (Object.is(relaTag, "01")) {
			idCard = $("#holder_certiNo").val();
		} else {
			idCard = $("#holder_certiNo").val();
		};
		age = dateUnit.parseIdCard(idCard).age;
		if (age > 17) {
			DataSet.trialSet.pars.extraParams.ageRange = 1;
			getPrem(DataSet, DataSet.trialSet.pars);
		} else {
			DataSet.trialSet.pars.extraParams.ageRange = 0;
			getPrem(DataSet, DataSet.trialSet.pars);
		};
	});

	// 起保日期
	var SD = new selectDate($("#confirmedDateId"),null,0,0,changeDeadlineDate);
	SD.init();
	function changeDeadlineDate(par){
		// 保单默认次日生效,最长延后30天
		var nowDate = dateUnit.getFormatDate().commonCurDate,
		delayDate = dateUnit.getDateFromDimdd(nowDate,31),
		delayDimdd = dateUnit.getDateDimdd(par,delayDate.commonCurDate);
		if (delayDimdd > 30 || delayDimdd < 0) {
			var datemodal = new dateModal($(".layer .sure"),"stateIndform","保单默认次日生效,最长延后30天生效");
			datemodal.init()
			datemodal.show();
			return false;
		} else {
			$("#closingDateId").attr("value",dateUnit.getDateFromDimdd(par, ensureDays).commonCurDate);
			return true;
		};
		
	}
}
export default serviceLogic;