// ====================
// 试算页 视图组装
// ====================

require("../Static/Common/scss/common.scss");
// 模板渲染

import ntri_item from '../Component/Common/ntri_item.js';
import common_footer from '../Component/Common/common_footer.js';

const brickObj = {
	'common_footer': common_footer,
	'ntri_item': ntri_item
}

var tTrial = function(obj, brick, callback) {
	document.getElementById("container").innerHTML =
		brick.map((value, index, array) => array[index] =
			brickObj[value]).reduce((prev, next, index) => {
			if (index == 1) {
				prev = prev(obj);
			};
			return `${prev}${next(obj)}`;
		});
	if (callback) {
		callback();
	};

};
export default tTrial;