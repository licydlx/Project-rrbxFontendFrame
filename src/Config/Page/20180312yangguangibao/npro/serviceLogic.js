import {
	consultServie,
	dateModal
} from '../../../../Static/js/common/modal.js';
import textData from './textData.js';
const serviceLogic = function(data) {
	// 平台识别
	if (GV && Object.is(GV.sceneType, '3')) {
		$(".mg-b-footer").css("margin-bottom", "1rem");
	};
	// 客服咨询
	new consultServie("consultService","#service","#service-pop").init();

	$(".product-intro ").on('click', 'a:nth-child(1)', function(event) {
		event.preventDefault();
		new dateModal(null, "stateIndform", textData.t2).init().show();
		$("#stateIndform .content").css("text-align","left");
		$("#stateIndform .content").css("max-height","30rem");
		$("#stateIndform .content").css("overflow-y","scroll");
	});

	$(".product-intro ").on('click', 'a:nth-child(2)', function(event) {
		event.preventDefault();
		new dateModal(null, "stateIndform", textData.t1).init().show();
		$("#stateIndform .content").css("text-align","left");
	});
}
export default serviceLogic;