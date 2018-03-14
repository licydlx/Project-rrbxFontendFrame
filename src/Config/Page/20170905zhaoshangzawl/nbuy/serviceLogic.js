import dateUnit from '../../../../Static/js/depend/tools/dateUnit.js';
import premAjax from '../../../../Static/js/depend/datas/premAjax.js';
import selectDate from '../../../../Static/js/depend/tools/selectDate.js';
import selectOne from '../../../../Static/js/depend/tools/selectOne.js';
import selectArea from '../../../../Static/js/depend/tools/selectArea.js';
import {
	dateModal
} from '../../../../Static/js/common/modal.js';
import {
	alertError
} from '../../../../Static/js/depend/common.js';

import getInsuredPars from '../../../../Static/js/nbuy/getInsuredPars.js';
import buyAjax from '../../../../Static/js/depend/datas/buyAjax.js';
import areaData from './area.js';
const serviceLogic = function(a) {
	var renderData = a[0],
		rrbxSetObj = a[1];
	// 显示保费
	$("#prem").text(rrbxSetObj.insuredPars.pars.extraParams.prem + "元");
	// 平台识别
	if (rrbxSetObj.GV && Object.is(rrbxSetObj.GV.sceneType, '3')) $(".mg-b-footer").css("margin-bottom", "1rem");
	// 被保人性别
	new selectOne($("#holderOccupationCode"), "性别选择", renderData.data.holderOccupationCode, holderOccupationCode).init();

	function holderOccupationCode(value) {}

	// 省市地区选择
	new selectArea($("#holderArea"), "省市选择", areaData, holderArea).init();

	function holderArea(value) {}

	// // 购买产品 
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
			buyAjax(getInsuredPars(rrbxSetObj));
		} else {
			alertError("请输入正确信息！");
			return;
		};
	});
}
export default serviceLogic;