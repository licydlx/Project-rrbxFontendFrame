import {
	consultServie
} from '../../../../Static/js/common/modal.js';

import premAjax from '../../../../Static/js/depend/datas/premAjax.js';
import selectDate from '../../../../Static/js/depend/tools/selectDate.js';
import selectOne from '../../../../Static/js/depend/tools/selectOne.js';

const serviceLogic = function(a) {
	var renderData = a[0],
		rrbxSet = a[1];
	console.log(rrbxSet);
	// 初始化 保費參數值(由投保页回退回来)
	Object.assign(rrbxSet.insuredPars.pars, rrbxSet.insuredPars.parsInit);
	// 設置默認保費TEXT
	$("#prem").text(rrbxSet.insuredPars.pars.extraParams.prem + "元");
	// 客服咨询
	new consultServie("consultService", "#service", "#service-pop").init();
	// =============================
	// 投保人出生日期
	new selectDate($("#holderBirthday"), "birthday", '1992-02-02', 60, -20, holderBirthday).init();

	function holderBirthday(value) {
		rrbxSet.insuredPars.pars.extraParams.holderBirthday = value;
		getPrem(rrbxSet);
		return true;
	}
	// 被保人出生日期
	new selectDate($("#insuredBirthday"), "birthday", '2017-02-02', 9, 0, insuredBirthday).init();

	function insuredBirthday(value) {
		rrbxSet.insuredPars.pars.extraParams.insuredBirthday = value;
		getPrem(rrbxSet);
		return true;
	}
	// 被保人性别
	new selectOne($("#sex"), "性别选择", renderData.sex, sex).init();

	function sex(value) {
		rrbxSet.insuredPars.pars.extraParams.sex = value;
		getPrem(rrbxSet);
	}

	// 保额选择
	new selectOne($("#amnt"), "保额选择", renderData.amnt, coverageFunc).init();

	function coverageFunc(value) {
		rrbxSet.insuredPars.pars.extraParams.amnt = value;
		getPrem(rrbxSet);
	}

	// 缴费年限
	new selectOne($("#payEndYear"), "缴费年限", renderData.payEndYear, payEndYear).init();

	function payEndYear(value) {
		rrbxSet.insuredPars.pars.extraParams.payEndYear = value;
		getPrem(rrbxSet);
	}

	// 缴费频率
	new selectOne($("#payIntv"), "缴费频率", renderData.payIntv, payIntv).init();

	function payIntv(value) {
		rrbxSet.insuredPars.pars.extraParams.payIntv = value;
		getPrem(rrbxSet);
	}

	// 住院津贴
	new selectOne($("#ylAmnt"), "住院津贴", renderData.ylAmnt, ylAmnt).init();

	function ylAmnt(value) {
		rrbxSet.insuredPars.pars.extraParams.ylAmnt = value;
		getPrem(rrbxSet);
	}

	// 数组 原型 增加 remove 方法
	// 作者:ydlx
	// 日期:2018-3-13
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

	// 附加险多选
	var riskcodesArray = [];
	$("#riskcodes").on('click', 'a', function(event) {
		event.preventDefault();
		var that = $(this);
		if (!that.hasClass("active")) {
			that.addClass("active");
			riskcodesArray.push(that.attr("data-id"));

		} else {
			that.removeClass("active");
			riskcodesArray.remove(that.attr("data-id"));
		}
		var riskcodes = riskcodesArray.join(',');
		rrbxSet.insuredPars.pars.extraParams.riskcodes = riskcodes;
		getPrem(rrbxSet);
	});

	// 获取保费 并 存储rrbxSet
	function getPrem(rrbxSet) {
		var ntriObj = rrbxSet.insuredPars.pars.rrbx;
		ntriObj["extraParams"] = rrbxSet.insuredPars.pars.extraParams;
		premAjax(rrbxSet, ntriObj);
	}
};
export default serviceLogic;