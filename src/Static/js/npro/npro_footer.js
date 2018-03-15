import productConfig from '../../../Config/config.js';
const e_npro_footer = function() {
	$("#container").on("click", "#premTrial", (event) => {
		event.preventDefault();
		// 本地环境
		if (window.location.origin.indexOf("http://localhost:8080") !== -1) return window.location.href = "ntri.html";
		// 线上环境
		window.location.href = `${window.location.origin}/mobile/nproduct/productInsure.html?productId=${productConfig.productId}&access_token=${GV.accessToken}&exterChannel=${GV.exterChannel}&sp=${GV.expertId}&eid=${GV.eid}&channel=${GV.channel}&sponsorGroup=${GV.sponsorGroup}&activityId=${GV.activityId}&paySucessUrl=${GV.paySucessUrl}&groupId=${GV.groupId}`;
	});
};

export default e_npro_footer;