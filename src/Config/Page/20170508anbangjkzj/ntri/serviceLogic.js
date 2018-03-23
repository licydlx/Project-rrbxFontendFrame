import {
	consultServie,
	dateModal
} from '../../../../Static/js/common/modal.js';
import premAjax from '../../../../Static/js/depend/datas/premAjax.js';
import selectDate from '../../../../Static/js/depend/tools/selectDate.js';
import selectOne from '../../../../Static/js/depend/tools/selectOne.js';
import dateUnit from '../../../../Static/js/depend/tools/dateUnit.js';

import basicPrem from './basicPrem.js';
import exemptPrem from './exemptPrem.js';
import numUnit from '../../../../Static/js/depend/tools/numUnit.js';

const serviceLogic = function(a) {
	var renderData = a[0],
		rrbxSetObj = a[1];
	// 初始化 保費參數值(由投保页回退回来) (多层级 对象 深拷贝)
	var parsObj = JSON.parse(JSON.stringify(rrbxSetObj.insuredPars.parsInit));
	// 客服咨询
	new consultServie("consultService", "#service", "#service-pop").init();
	// =============================


	// var test = exemptPrem("1990-04-05","man",'18');
	// console.log(test);

	// getPrem(rrbxSetObj);
	var test = basicPrem('106','5','men',"1990-04-05",0)
	console.log(test);
	// 性别
	$(".singleSelect").on('click', 'a', function(event) {
		event.preventDefault();
		var $this = $(this),
			tagId = $this.closest(".content").attr("id"),
			value = $this.attr("data-id");

		if (!$this.closest("li").hasClass("active")) {
			$this.closest(".content").find("li").removeClass("active");
			$this.closest("li").addClass("active");
		}
	});

	// 出生日期
	new selectDate($("#birthday"), "birthday", '2000-01-01', 50, 0, birthday).init();

	function birthday(value) { 
		var flag = dateUnit.getAgeRangeState(value, {
			"ageDay": 28
		}, {
			"age": 50
		});

		if (!flag) {
			new dateModal(null, "stateIndform", "投保人年龄最小28天，最大50周岁").init().show();
			return false;
		} else {
			parsObj.extraParams.birthday = value;
			getPrem();
			return true;
		};
	}

	// 保额选择
	new selectOne($("#amnt"), "保额选择", renderData.data.amnt, amnt).init();

	function amnt(content, value) {
		parsObj.extraParams.amnt = value;
		getPrem();
		return true;
	}


	// 获取保费 并 存储rrbxSetObj
	function getPrem() {
		
		var ntriObj = parsObj.rrbx;
		ntriObj["extraParams"] = parsObj.extraParams;

		premAjax(ntriObj, function(value) {
			$("#prem").text(value + "元");

			parsObj.extraParams.prem = value;
			rrbxSetObj.insuredPars.pars = parsObj;
			localStorage.setItem(rrbxSetObj.insuredPars.parsInit.rrbx.rrbxProductId, JSON.stringify(rrbxSetObj));
		});
	}
};
export default serviceLogic;