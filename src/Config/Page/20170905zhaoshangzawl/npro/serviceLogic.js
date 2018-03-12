import {
	consultServie
} from '../../../../Static/js/common/modal.js';

const serviceLogic = function(data) {
	// 平台识别
	if (GV && Object.is(GV.sceneType, '3')) {
		$(".mg-b-footer").css("margin-bottom", "1rem");
	};

	// 客服咨询
	new consultServie("consultService","#service","#service-pop").init();
}
export default serviceLogic;