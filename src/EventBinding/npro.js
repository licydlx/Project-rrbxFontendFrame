// ====================
// 详情页 事件组装
// ====================

// js事件绑定
import common from '../Static/Common/js/common.js';
import header from '../Static/Common/js/header.js';
import footer from '../Static/Common/js/footer.js';
import supportPlan from '../Static/Common/js/supportPlan.js';
import userComments from '../Static/Common/js/userComments.js';

// // 滚动监听
import scrollSpy from '../Static/Depend/scrollSpy.js';
// // 微信分享
import wxShare from '../Static/Common/js/wxShare.js';



const eventFn = {
	'common': common,
	'header': header,
	'footer': footer,
	'userComments': userComments,
	'supportPlan': supportPlan,
	'wxShare': wxShare,
	'scrollSpy': scrollSpy
}

const bindEvent = function(config) {
	config.PZ.eventPZ.eArray.forEach(function(x, y, z) {
		if (!eventFn[x]) {
			alert('详情页事件绑定缺少事件模块');
		};
		// 老版滚动监听
		if (x == "scrollSpy") {
			eventFn[x]({
				"control1": ".lift-nav",
				"control2": ".lift",
				"target": [".lt-one", ".lt-two", ".lt-three"],
				"current": "current"
			});
		} else {
			eventFn[x](config);
		};
	})
}
export default bindEvent;