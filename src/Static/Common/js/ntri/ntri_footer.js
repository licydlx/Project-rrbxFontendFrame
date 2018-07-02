const productConfig = require('../../../Config/config.json');
const e_npro_footer = function(pars) {
	var GV = pars.data.GV;
	$("#container").on("click", "#goBuy", () => {
		//本地环境
		if (window.location.origin.indexOf("http://localhost:8080") !== -1 || window.location.origin.indexOf("http://localhost:8081") !== -1) return window.location.href = "nbuy.html";
		//先上环境
		window.location.href = `${window.location.origin}/mobile/nproduct/productInsure.html?productId=${productConfig.productId}&access_token=${GV_TRIAL.accessToken}&exterChannel=${GV.exterChannel}&sp=${GV.expertId}&eid=${GV.eid}&channel=${GV.channel}&cal=1&sponsorGroup=${GV.sponsorGroup}&activityId=${GV.activityId}&paySucessUrl=${GV.paySucessUrl}&groupId=${GV.groupId}`;
	});
};
export default e_npro_footer;