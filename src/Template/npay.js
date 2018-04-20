//共同样式
require("../Static/scss/reset/reset.scss");
require("../Static/scss/common/common.scss");

require("../Static/scss/component/npay/npay.scss");
require("../Static/scss/component/npay/npay_item.scss");
require("../Static/scss/component/npay/npay_footer.scss");

const productConfig = require('../Config/config.json');
const pageConfig = require("../Config/Page/" + productConfig.productId + "/npay.json");

const brickObj = (function(b){
	let a = {};
	b.forEach(function(x,y,z){
		a[x] = require(`../Moudle/npay/${x}.js`).default;
	})
	return a;
})(pageConfig.htmlBrick);

const tNpay = function(obj, brick, callback) {
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
export default tNpay;