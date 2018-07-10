// ====================
// 投保页 事件组装
// ====================

// js事件绑定
import common from '../Static/Common/js/common.js';
import footer from '../Static/Common/js/footer.js';

import getCode from '../Static/Common/js/getCode.js';
import nbuyClause from '../Static/Common/js/nbuyClause.js';
import serviceVerify from '../Static/Common/js/serviceVerify.js';


const eventFn = {
	'common': common,
	'footer': footer,
	'getCode': getCode,
	'serviceVerify': serviceVerify,
	'nbuyClause': nbuyClause
}

const bindEvent = function(config) {
	config.PZ.eventPZ.eArray.forEach(function(x, y, z) {
		if (!eventFn[x]) {
			alert('投保页事件绑定缺少事件模块');
		};
		eventFn[x](config);
	})
}
export default bindEvent;