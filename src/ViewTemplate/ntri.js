require("../Static/Common/scss/common.scss");
// 模板渲染

import item from '../Component/Common/item.js';
import footer from '../Component/Common/footer.js';

const brickObj = {
	'footer': footer,
	'item': item
}

var tTrial = function(obj, brick, callback) {
	console.log(obj);
	document.getElementById("container").innerHTML =
		brick.map((value, index, array) => array[index] =
			brickObj[value]).reduce((prev, next, index) => {
				console.log(prev);
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