//共同样式
require("../Static/scss/reset/reset.scss");
require("../Static/scss/common/common.scss");
// 模板渲染
import trial_prem_trial from '../Moudle/trial/npro_prem_trial.js';
import npro_footer from '../Moudle/trial/npro_footer.js';

const brickObj = {
	'trial_prem_trial': trial_prem_trial,
	'npro_footer': npro_footer
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