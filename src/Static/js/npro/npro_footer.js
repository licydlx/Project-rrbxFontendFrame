 var e_npro_footer = (function() {
 	$(document).on("click", "#buy-now", function() {
 		if (window.location.origin.indexOf("api") == -1) return window.location.href = "price_cal.html";
 		window.location.href = window.location.origin + "/mobile/nproduct/productInsure.html?productId=20180105anlianliuxuelx&access_token=" +
 			GV.accessToken + "&exterChannel=" + GV.exterChannel + "&sp=" + GV.expertId + "&eid=" + GV.eid + "&channel=" + GV.channel +
 			"&sponsorGroup=" + GV.sponsorGroup + "&activityId=" + GV.activityId + "paySucessUrl=" + GV.paySucessUrl + "&groupId=" + GV.groupId;
 	});
 })();

 export default e_npro_footer;