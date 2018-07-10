// 描述: 页脚绑定事件

const footer = function(config) {
	// if (!GV.rrbxProductId) alert("请设置产品ID全局变量");
	// if (!config.PZ.eventPZ.footer) alert("请配置footer事件");

	if (config.PZ.eventPZ.belong == "npro") {
		// 跳转
		$("#container").on("click", "#premTrial", (event) => {
			event.preventDefault();
			// 本地环境
			if (window.location.origin.indexOf("http://localhost:8080") !== -1 || window.location.origin.indexOf("http://localhost:8081") !== -1) return window.location.href = "ntri.html";
			// 线上环境
			window.location.href = `${window.location.origin}/mobile/nproduct/productInsure.html?productId=${GV.rrbxProductId}&access_token=${GV.accessToken}&exterChannel=${GV.exterChannel}&sp=${GV.expertId}&eid=${GV.eid}&channel=${GV.channel}&sponsorGroup=${GV.sponsorGroup}&activityId=${GV.activityId}&paySucessUrl=${GV.paySucessUrl}&groupId=${GV.groupId}`;
		});
	};

	if (config.PZ.eventPZ.belong == "ntri") {
		// 跳转
		$("#container").on("click", "#goBuy", () => {
			//本地环境
			if (window.location.origin.indexOf("http://localhost:8080") !== -1 || window.location.origin.indexOf("http://localhost:8081") !== -1) return window.location.href = "nbuy.html";
			//先上环境
			window.location.href = `${window.location.origin}/mobile/nproduct/productInsure.html?productId=${GV.ntri_rrbxProductId}&access_token=${GV.ntri_accessToken}&exterChannel=${GV.ntri_exterChannel}&sp=${GV.ntri_expertId}&eid=${GV.ntri_eid}&channel=${GV.ntri_channel}&cal=1&sponsorGroup=${GV.ntri_sponsorGroup}&activityId=${GV.ntri_activityId}&paySucessUrl=${GV.ntri_paySucessUrl}&groupId=${GV.ntri_groupId}`;
		});
	}

	// if (config.PZ.eventPZ.belong == "nbuy") {

	// }
};

export default footer;