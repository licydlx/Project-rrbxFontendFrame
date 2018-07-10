// ====================
// 试算页 事件组装
// ====================

// js事件绑定
import footer from '../Static/Common/js/footer.js';

const eventFn = {
	'footer': footer
}

const bindEvent = function(config) {
	config.PZ.eventPZ.eArray.forEach(function(x, y, z) {
		if (!eventFn[x]) {
			alert('试算页事件绑定缺少事件模块');
		};
		eventFn[x](config);
	})
}
export default bindEvent;