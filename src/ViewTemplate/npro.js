// ====================
// 详情页 视图组装
// ====================
require("../Static/Common/scss/common.scss");

import npro_header from '../Component/Common/npro_header.js';
import common_footer from '../Component/Common/common_footer.js';

import common_supportPlan from '../Component/Common/common_supportPlan.js';
import npro_faq from '../Component/Common/npro_faq.js';
import npro_liftNav from '../Component/Common/npro_liftNav.js';
import npro_productIntro from '../Component/Common/npro_productIntro.js';
import npro_userComments from '../Component/Common/npro_userComments.js';
import npro_insureClause from '../Component/Common/npro_insureClause.js';

// 电梯井
const npro_elevator = (obj) => {
	return `${npro_liftNav()}
			<div class="lift-target">
				<div class="lt-one">
					${npro_productIntro(obj)}
				</div>
				${npro_faq(obj)}
				<div class="lt-two">
					${npro_userComments(obj)}
				</div>
				<div class="lt-three">
					${npro_insureClause(obj)}
				</div>
			</div>`;
}

const brickObj = {
	'npro_header': npro_header,
	'common_footer': common_footer,
	'common_supportPlan': common_supportPlan,
	'npro_elevator': npro_elevator
}

const tNpro = (obj, brick, callback) => {
	// 页面渲染
	document.getElementById("container").innerHTML =
		brick.map((value, index, array) =>
			array[index] = brickObj[value]).reduce((prev, next, index) => {
			prev = Object.is(index, 1) ? prev(obj) : prev;
			return `${prev}${next(obj)}`;
		});
	if (callback) {
		callback();
	};
};

export default tNpro;