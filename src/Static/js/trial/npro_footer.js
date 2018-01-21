var e_npro_footer = (function() {
	$(document).on("click", "#buy-now", function() {
		function trimNumber(str) {
			return str.replace(/\d+/g, '');
		};
		var productId = JSON.parse(localStorage.getItem('productId')),
			productPage = trimNumber(productId);

		if (window.location.origin.indexOf("api") == -1) return window.location.href = "nbuy_" + productPage + ".html";

		window.location.href = window.location.origin + "/mobile/nproduct/productInsure.html?productId=" + productId + "&access_token=" +
			GV_TRIAL.accessToken + "&exterChannel=" + GV.exterChannel + "&sp=" + GV.expertId + "&eid=" + GV.eid + "&channel=" + GV.channel +
			"&cal=1&sponsorGroup=" + GV.sponsorGroup + "&activityId=" + GV.activityId + "paySucessUrl=" + GV.paySucessUrl + "&groupId=" + GV.groupId;
	});
})();

export default e_npro_footer;