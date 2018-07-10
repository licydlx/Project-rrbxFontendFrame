// 描述: 保障计划Tab (详情页及试算页)
import common_supportPlanTab from '../../../Component/Common/common_supportPlanTab.js';
// 保障计划 TAB 切换事件
// ydlx
// 2018-1-31
const clickNav = function(event) {
	event.preventDefault();
	let that = $(this);
	let [tag, tar, num, obj] = [that.attr("data-tag"), $("#sp-wire"), event.data.num, event.data.obj];
	if (!that.hasClass("active")) {
		that.closest('ul').find('a').removeClass('active');
		that.addClass("active");
		if (num) {
			tabLogic["tab"](obj, tag, tar, num);
		};
	};
}

// 保障计划 Content 事件
// ydlx
// 2018-1-31
const clickContent = function(event) {
	event.preventDefault();
	let that = $(this),
		sii = that.find(".sp-icon-img");
	that.find("+ .sp-con-details").toggle();
	sii.hasClass('active') ? sii.removeClass("active") : sii.addClass("active");
}

// 保障计划 TAB 切换动画
// ydlx
// 2018-1-31
const tabLogic = {
	'changeWireCss': function(a, b) {
		a.css('margin-left', b + '%');
	},
	'changeContent': function(a, b) {
		$("#sp-content").empty().append(common_supportPlanTab(a.insurancePlan[b]));
	},
	'tab': function(obj, tag, tar,num) {
		this.changeWireCss(tar, parseInt(tag) * (100/num));
		this.changeContent(obj, tag);
	},
	'three': function(obj, tag, tar) {
		this.changeWireCss(tar, parseInt(tag) * 33.33);
		this.changeContent(obj, tag);
	},
	'two': function(obj, tag, tar) {
		this.changeWireCss(tar, parseInt(tag) * 50);
		this.changeContent(obj, tag);
	},
	'four': function(obj, tag, tar) {
		this.changeWireCss(tar, parseInt(tag) * 25);
		this.changeContent(obj, tag);
	}
}


// 页面事件绑定
// ydlx
// 2018-1-31

const supportPlan = function(config){
	var num = config.insurancePlan.length;
	// 保障计划 NAV
	$(".sp-wire").width((100/num) + '%');

	$("#sp-nav").on("click", "a", {
		num: num,
		obj: config
	}, clickNav);
	// 保障计划 Content
	$("#sp-content").on("click", "a", clickContent);
};
export default supportPlan;