require("../Static/Common/scss/common.scss");
import header from '../Component/Common/header.js';
import footer from '../Component/Common/footer.js';

import support_plan from '../Component/Common/support_plan.js';
import faq from '../Component/Common/faq.js';
import lift_nav from '../Component/Common/lift_nav.js';
import product_intro from '../Component/Common/product_intro.js';
import user_comments from '../Component/Common/user_comments.js';
import insure_clause from '../Component/Common/insure_clause.js';

// 电梯井
const elevator = (obj) => {
	return `${lift_nav()}
			<div class="lift-target">
				<div class="lt-one">
					${product_intro(obj)}
				</div>
				${faq(obj)}
				<div class="lt-two">
					${user_comments(obj)}
				</div>
				<div class="lt-three">
					${insure_clause(obj)}
				</div>
			</div>`;
}

const brickObj = {
	'header': header,
	'footer': footer,
	'support_plan': support_plan,
	'elevator': elevator
}

const tNpro = (obj, brick) => {
	// 页面渲染
	document.getElementById("container").innerHTML =
		brick.map((value, index, array) =>
			array[index] = brickObj[value]).reduce((prev, next, index) => {
			Object.is(index, 1) ? prev = prev(obj) : prev;
			return `${prev}${next(obj)}`;
		});
};

export default tNpro;