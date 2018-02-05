 import {
 	items
 } from '../../../Config/config.js';
 import env from '../../../Config/env.js';

 const e_npro_footer = (() => {
 	$("#container").on("click", "#buy-now", (event) => {
 		event.preventDefault();

 		// 代驾险 网站备案
 		// ydlx
 		// 2018-2-5	
 		// const customAlert = () => {
 		// 	var tpl = `<div class="alert-bg">
			// 			<div class="alert">
			// 				<p class="alert-content">您好，网站正在报备中，暂时无法投保。</p>
			// 				<div class="alert-btns">
			// 					<a class="alert1-btn" href=${env}/mobile/nproduct/productShow.html?productId=20180118kaixinbaodjx>确定</a>
			// 				</div>
			// 			</div>
			// 		</div>`;
 		// 	$("body").append(tpl);
 		// };
 		// customAlert();
 		// return;

 		// 本地环境
 		if (window.location.origin.indexOf("http://localhost:8080") !== -1) return window.location.href = "price_cal.html";
 		// 线上环境
 		window.location.href = `${window.location.origin}/mobile/nproduct/productInsure.html?productId=${items.productId}&access_token=${GV.accessToken}&exterChannel=${GV.exterChannel}&sp=${GV.expertId}&eid=${GV.eid}&channel=${GV.channel}&sponsorGroup=${GV.sponsorGroup}&activityId=${GV.activityId}&paySucessUrl=${GV.paySucessUrl}&groupId=${GV.groupId}`;
 	});
 })();

 export default e_npro_footer;