import {
	consultServie,
	dateModal
} from '../../../../Static/js/common/modal.js';
import dateUnit from '../../../../Static/js/depend/tools/dateUnit.js';
import premAjax from '../../../../Static/js/depend/datas/premAjax.js';
import selectDate from '../../../../Static/js/depend/tools/selectDate.js';
import selectOne from '../../../../Static/js/depend/tools/selectOne.js';

const serviceLogic = function(a) {
	var renderData = a[0],
		rrbxSetObj = a[1];
	// 初始化 保費參數值(由投保页回退回来) (多层级 对象 深拷贝)
	var parsObj = JSON.parse(JSON.stringify(rrbxSetObj.insuredPars.parsInit));
	// 客服咨询
	new consultServie("consultService", "#service", "#service-pop").init();
	// =============================
	// 业务逻辑
	// =============================

	getPrem();

	// 逻辑:根据出生日期变化重新计算保费
	// 条件:被保人年龄区间 --大于20周岁,小于50周岁
	new selectDate($("#birthday"), "birthday", '1990-01-01', 51, -19, birthday).init();

	function birthday(value) {
		var flag = dateUnit.getAgeRangeState(value, {
			"age": 20
		}, {
			"age": 50
		});

		if (!flag) {
			new dateModal(null, "stateIndform", "被保人年龄最小20周岁，最大50周岁").init().show();
			return false;
		} else {
			parsObj.extraParams.birthday = value;
			getPrem();
			return true;
		};
	}

	// 逻辑:根据保障额度变化重新计算保费
	// 条件:1:1万,5:5万,10:10万,20:20万,30:30万
	new selectOne($("#amnt"), "保额选择", renderData.data.amnt, amnt).init();

	function amnt(content, value) {
		parsObj.extraParams.amnt = value;
		getPrem();
		return true;
	}

	// 逻辑:根据是否购买高龄孕妇高发疾病险变化重新计算保费
	// 条件: 0:否,1是
	new selectOne($("#adjDuty"), "购买附加险", renderData.data.adjDuty, adjDuty).init();

	function adjDuty(content, value) {
		parsObj.extraParams.adjDuty = value;
		getPrem();
		return true;
	}

	// 逻辑: 根据算参数获取保费,并存储公共数据对象
	// 条件: 试算参数对象:ntriObj;公共数据对象:rrbxSetObj
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

	// =============================
	// 业务逻辑
	// =============================
};
export default serviceLogic;