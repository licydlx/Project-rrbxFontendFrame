const productConfig = require('../../../Config/config.json');
import {
	dateModal
} from '../common/modal.js';
const e_npro_footer = function() {
	$("#container").on("click", "#premTrial", (event) => {
		event.preventDefault();
		// 本地环境
		if (window.location.origin.indexOf("http://localhost:8080") !== -1 || window.location.origin.indexOf("http://localhost:8081") !== -1) return window.location.href = "ntri.html";
		// 线上环境
		window.location.href = `${window.location.origin}/mobile/nproduct/productInsure.html?productId=${productConfig.productId}&access_token=${GV.accessToken}&exterChannel=${GV.exterChannel}&sp=${GV.expertId}&eid=${GV.eid}&channel=${GV.channel}&sponsorGroup=${GV.sponsorGroup}&activityId=${GV.activityId}&paySucessUrl=${GV.paySucessUrl}&groupId=${GV.groupId}`;

		//上海人寿 大金刚预付费版
		// if (!GV.accessToken) {
		// 	new dateModal(null, "stateIndform", "请先登录!").init().show();
		// } else {
		// 	window.location.href = `${window.location.origin}/mobile/nproduct/productInsure.html?productId=${productConfig.productId}&access_token=${GV.accessToken}&exterChannel=${GV.exterChannel}&sp=${GV.expertId}&eid=${GV.eid}&channel=${GV.channel}&cal=1&sponsorGroup=${GV.sponsorGroup}&activityId=${GV.activityId}&paySucessUrl=${GV.paySucessUrl}&groupId=${GV.groupId}`;
		// };
	});
};

export default e_npro_footer;