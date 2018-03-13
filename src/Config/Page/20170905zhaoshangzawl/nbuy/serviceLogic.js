import dateUnit from '../../../../Static/js/depend/tools/dateUnit.js';
import premAjax from '../../../../Static/js/depend/datas/premAjax.js';
import selectDate from '../../../../Static/js/depend/tools/selectDate.js';
import selectOne from '../../../../Static/js/depend/tools/selectOne.js';
import {
	dateModal
} from '../../../../Static/js/common/modal.js';

const serviceLogic = function(a) {
	var renderData = a[0],
		rrbxSet = a[1];
	console.log(rrbxSet);

	// 平台识别
	if (rrbxSet.GV && Object.is(rrbxSet.GV.sceneType, '3')) $(".mg-b-footer").css("margin-bottom", "1rem");

		// 被保人性别
	new selectOne($("#holderOccupationCode"), "性别选择", renderData.holderOccupationCode, holderOccupationCode).init();

	function holderOccupationCode(value) {
		console.log("nihao");
	}

	// 购买产品 
	$("#container").on("click", "#buyNow", function() {
		var doneState = true;
		if (!$(".agreed input").is(":checked")) {
			alertError("请先同意以下条款！");
			return;
		};
		$(".itemInfo").find("li").each(function(index, val) {
			if (!$(val).hasClass('right') && !$(val).attr("norequired")) {
				doneState = false;
			}
		});
		if (doneState) {
			inputSuccess();
		} else {
			alertError("请输入正确信息！");
			return;
		};
	});
}
export default serviceLogic;