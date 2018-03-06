import {
	clickNav,
	clickContent,
	tabLogic
} from './serviceLogic/npro_support_plan.js';

// 页面事件绑定 
// ydlx
// 2018-1-31
const e_npro_support_plan = function(pars){
	// 保障计划 NAV
	$("#sp-nav").on("click", "a", {
		num: pars.num,
		obj: pars.data
	}, clickNav);
	// 保障计划 Content
	$("#sp-content").on("click", "a", clickContent);
};
export default e_npro_support_plan;