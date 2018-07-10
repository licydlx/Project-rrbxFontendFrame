// ====================
// 投保页 视图组装
// ====================
require("../Static/Common/scss/common.scss");
// 模板渲染
import nbuy_main from '../Component/Common/nbuy_main.js';
import nbuy_sub from '../Component/Common/nbuy_sub.js';
import common_footer from '../Component/Common/common_footer.js';

const brickObj = {
	'nbuy_main': nbuy_main,
	'nbuy_sub': nbuy_sub,
	'common_footer': common_footer
}

const tNbuy = function(obj, brick, callback) {
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
}

export default tNbuy;