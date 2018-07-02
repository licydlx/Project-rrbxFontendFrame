const footer = function(PZ) {
	console.log(PZ);
	// if (!GV.rrbxProductId) alert("请设置产品ID全局变量");
	// if (!PZ.eventPZ.footer) alert("请配置footer事件");

	if (PZ.eventPZ.belong == "npro") {
		$("#container").on("click", "#premTrial", (event) => {
			event.preventDefault();
			// 本地环境
			if (window.location.origin.indexOf("http://localhost:8080") !== -1 || window.location.origin.indexOf("http://localhost:8081") !== -1) return window.location.href = "ntri.html";
			// 线上环境
			window.location.href = `${window.location.origin}/mobile/nproduct/productInsure.html?productId=${GV.rrbxProductId}&access_token=${GV.accessToken}&exterChannel=${GV.exterChannel}&sp=${GV.expertId}&eid=${GV.eid}&channel=${GV.channel}&sponsorGroup=${GV.sponsorGroup}&activityId=${GV.activityId}&paySucessUrl=${GV.paySucessUrl}&groupId=${GV.groupId}`;
		});
	};


};

export default footer;