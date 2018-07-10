import {
	getPrem
} from '../../../Static/Depend/serviceMod/service.js';
import Modal from '../../../Static/Depend/Modal/Modal.js';
import selectDate from '../../../Static/Depend/selectMod/selectDate.js';
import selectOne from '../../../Static/Depend/selectMod/selectOne.js';
import dateUnit from '../../../Static/Depend/dateUnit.js';

import common_supportPlanTab from '../../../Component/Common/common_supportPlanTab.js';

import insuredSexData from './insuredSexData.js';

const serviceLogic = function(servicePars) {
	// 初始化 保費參數值(由投保页回退回来) (多层级 对象 深拷贝)
	var parsObj = JSON.parse(JSON.stringify(servicePars.insuredPars.parsInit));

	// 客服咨询
	$('#container').on('click', '#service', function(event) {
		event.preventDefault();
		/* Act on the event */
		new Modal('consultService',null).init();
	});

	// =============================
	// 业务逻辑
	// =============================
	getPrem(parsObj, servicePars, $("#prem"));

	// 保障计划Tab
	const tabLogic = function(tag) {
		$("#pt-sp-content").empty().append(common_supportPlanTab(servicePars["renderData"]["insurancePlan"][tag]));
	}
	$("#pt-sp-nav").on('click', 'a', function(event) {
		event.preventDefault();

		var that = $(this),
			[productSeriesId, insureId, tag, periodPremium] =
			['data-id', 'data-insureid', 'data-tag', 'data-price'].map(function(value, index) {
				return that.attr(value);
			});
		if (!that.hasClass("active")) {
			that.closest('ul').find('a').removeClass('active');
			that.addClass("active");

			parsObj.rrbx.periodPremium = periodPremium;
			parsObj.rrbx.productSeriesId = productSeriesId;
			parsObj.extraParams.insureId = insureId;

			// 该产品特有
			// 保额
			parsObj.extraParams.amnt = that.attr("data-value");

			tabLogic(tag);

			getPrem(parsObj, servicePars, $("#prem"));
		}
	});


	// 有无社保
	new selectOne($("#insuredSex"), "性别", insuredSexData, insuredSex).init();

	function insuredSex(content, selectObj) {
		parsObj.extraParams.insuredSex = selectObj.id;
		getPrem(parsObj, servicePars, $("#prem"));
		return true;
	}

	// 出生日期
	new selectDate($("#insuredBirthday"), "birthday", "2000-01-01", "30", "30", insuredBirthday).init();

	function insuredBirthday(selectObj) {
		var flag = true;
		// var flag = dateUnit.getAgeRangeState(selectObj, {
		// 	"age": 1
		// }, {
		// 	"age": 80
		// });

		if (flag) {
			parsObj.extraParams.insuredBirthday = selectObj;
			getPrem(parsObj, servicePars, $("#prem"));
			return true;
		} else {
			new Modal('defaultConfig', {
				text: '被保人年龄最小?周岁，最大?周岁'
			}).init();
			return false;
		};
	}


	// =============================
	// 业务逻辑
	// =============================
};
export default serviceLogic;