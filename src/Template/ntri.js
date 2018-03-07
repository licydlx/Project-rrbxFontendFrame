//共同样式
require("../Static/scss/reset/reset.scss");
require("../Static/scss/common/common.scss");
// 模板渲染
import ntri_premTrial from '../Moudle/ntri/ntri_premTrial.js';
import ntri_footer from '../Moudle/ntri/ntri_footer.js';

const brickObj = {
	'ntri_premTrial': ntri_premTrial,
	'ntri_footer': ntri_footer
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