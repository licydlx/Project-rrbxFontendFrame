import dateUnit from '../../../../Static/js/depend/tools/dateUnit.js';
import getPrem from '../../../../Static/js/depend/datas/premAjax.js';
import selectDate from '../../../../Static/js/depend/tools/selectDate.js';
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

	var SD = new selectDate($("#confirmedDateId"),null,null,null,changeDeadlineDate);
	SD.init();
	function changeDeadlineDate(par){
		$("#closingDateId").attr("value",dateUnit.getDateFromDimdd(par, ensureDays).commonCurDate);
	}
}
export default serviceLogic;