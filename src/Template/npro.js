//共同样式
require("../Static/scss/reset/reset.scss");
require("../Static/scss/common/common.scss");
// 模板渲染
import npro_header from '../Moudle/npro/npro_header.js';
import npro_support_plan from '../Moudle/npro/npro_support_plan.js';
import npro_product_intro from '../Moudle/npro/npro_product_intro.js';
import npro_faq from '../Moudle/npro/npro_faq.js';
import npro_user_comments from '../Moudle/npro/npro_user_comments.js';
import npro_insure_clause from '../Moudle/npro/npro_insure_clause.js';
import npro_lift_nav from '../Moudle/npro/npro_lift_nav.js';
import npro_footer from '../Moudle/npro/npro_footer.js';

// 电梯井
var npro_elevator = function(obj) {
	return `${npro_lift_nav()}
			<div class="lift-target">
			<div class="lt-one">
			${npro_product_intro(obj)}
			</div>
			${npro_faq(obj)}
			<div class="lt-two">
			${npro_user_comments(obj)}
			</div><div class="lt-three">
			${npro_insure_clause(obj)}
			</div>
			</div>`;
}

const brickObj = {
	'npro_header': npro_header,
	'npro_support_plan': npro_support_plan,
	'npro_product_intro': npro_product_intro,
	'npro_faq': npro_faq,
	'npro_user_comments': npro_user_comments,
	'npro_insure_clause': npro_insure_clause,
	'npro_lift_nav': npro_lift_nav,
	'npro_elevator': npro_elevator,
	'npro_footer': npro_footer
}

/*  */
var tNpro = function(obj, brick) {
	// 平台识别
	if (GV && GV.sceneType == "3") {
		brickObj.npro_footer = () => "";
	};
	return document.getElementById("container").innerHTML =
		brick.map((value, index, array) =>
			array[index] = brickObj[value]).reduce((prev, next, index) => {
			if (index == 1) {
				prev = prev(obj);
			};
			return `${prev}${next(obj)}`;
		});
};

export default tNpro;