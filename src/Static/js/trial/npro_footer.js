 import {
 	items
 } from '../../../Config/config.js'
 const e_npro_footer = (() => {
 	$("#container").on("click", "#buy-now", () => {
 		const trimNumber = (str) => {
 			return str.replace(/\d+/g, '');
 		};
 		let productPage = trimNumber(items.productId);
 		//本地环境
 		if (window.location.origin.indexOf("http://localhost:8080") !== -1) return window.location.href = "nbuy_" + productPage + ".html";
 		//先上环境
 		window.location.href = `${window.location.origin}/mobile/nproduct/productInsure.html?productId=${items.productId}&access_token=${GV.accessToken}&exterChannel=${GV.exterChannel}&sp=${GV.expertId}&eid=${GV.eid}&channel=${GV.channel}&cal=1&sponsorGroup=${GV.sponsorGroup}&activityId=${GV.activityId}&paySucessUrl=${GV.paySucessUrl}&groupId=${GV.groupId}`;
 	});
 })();
 
 export default e_npro_footer;