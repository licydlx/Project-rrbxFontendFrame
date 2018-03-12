import {
	consultServie
} from '../../../../Static/js/common/modal.js';

import getPrem from '../../../../Static/js/depend/datas/premAjax.js';
import selectDate from '../../../../Static/js/depend/tools/selectDate.js';
import selectOne from '../../../../Static/js/depend/tools/selectOne.js';

const serviceLogic = function(obj) {
	console.log(obj);
	// 投保人出生日期
	new selectDate($("#holderBirthday"), "birthday", '1990-04-05', 60, -20, holderBirthday).init();

	function holderBirthday(par) {

	}
	// 被保人出生日期
	new selectDate($("#insuredBirthday"), "birthday", '2014-03-12', 9, 0, holderBirthday).init();

	function insuredBirthday(par) {

	}

	// 被保人性别
	new selectOne($("#sex"), "保额选择", obj.sex, sex).init();

	function sex() {
		console.log("nihao");
	}

	// 保额选择
	new selectOne($("#amnt"), "保额选择", obj.amnt, coverageFunc).init();

	function coverageFunc() {
		console.log("nihao");
	}

	// 缴费频率
	new selectOne($("#payIntv"), "保额选择", obj.payIntv, payIntv).init();

	function payIntv() {
		console.log("nihao");
	}

	// 住院津贴
	new selectOne($("#ylAmnt"), "保额选择", obj.ylAmnt, ylAmnt).init();

	function ylAmnt() {
		console.log("nihao");
	}

	// 客服咨询
	new consultServie("consultService", "#service", "#service-pop").init();

	// 年龄选择
	$(".tab").on('click', 'a', function(event) {
		event.preventDefault();
		var that = $(this);
		if (!that.hasClass("active")) {
			that.closest('ul').find('a').removeClass('active');
			that.addClass("active");
		}

		ajaxData.extraParams.ageRange = that.attr("data-id");
		getPrem(obj, ajaxData);
	});

};
export default serviceLogic;