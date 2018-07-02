// js事件绑定
import common from '../Static/Common/js/common.js';
import header from '../Static/Common/js/header.js';
import footer from '../Static/Common/js/footer.js';
import support_plan from '../Static/Common/js/support_plan.js';
import user_comments from '../Static/Common/js/user_comments.js';

// // 滚动监听
// import scrollSpy from '../../Depend/plugin/scrollSpy.js';
// // 微信分享
import wx_share from '../Static/Common/js/wx_share.js';


const eventFn = {
	'common': common,
	'header': header,
	'footer': footer,
	'user_comments':user_comments,
	'support_plan': support_plan,
	'wx_share':wx_share
}

const bindEvent = function(PZ) {
	PZ.eventPZ.eArray.forEach(function(x, y, z) {
		console.log(eventFn[x]);
		console.log(typeof eventFn[x]);
		eventFn[x](PZ);
	})
}
export default bindEvent;