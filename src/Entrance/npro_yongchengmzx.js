import env from '../Config/env.js';
import {items} from '../Config/config.js';

import ajax_promise from '../Depend/custom/load_ajax.js';
import tNpro from '../Template/npro.js';
// js事件绑定
import e_npro_date_format from '../Static/js/npro/npro_date_format.js';
import e_npro_support_plan2 from '../Static/js/npro/npro_support_plan2.js';

/*import e_npro_wx_share from '../component/npro_wx_share.js';*/

import e_npro_wx_share from '../Static/js/npro/npro_wx_share.js';
// 插件引入
import p_scrollSpy from '../Depend/plugin/scrollSpy.js';

let ajaxPromise = new ajax_promise(),
	options = items.loadAjax.npro,
	brickArray = items.htmlBrick.npro;

options.url = env + options.url;

localStorage.setItem('GV', JSON.stringify(GV));
localStorage.setItem('productId', JSON.stringify(options.data['productId']));
localStorage.setItem(options.data['productId'], '');

ajaxPromise.send(options).then(data => {
	tNpro(data.response, brickArray);

	e_npro_support_plan2(data.response);
	e_npro_date_format();

		// 平台识别
	if (GV && GV.sceneType == "3") {
		$(".mg-b-footer").css("margin-bottom","1rem");
	};

}).catch(error => {
	console.log(error);
});