import env from '../Config/env.js';
import {
	items
} from '../Config/config.js';
import ajax_promise from '../Depend/custom/load_ajax.js';
import tNpro from '../Template/npro.js';
import {
	getProductId
} from '../Static/js/depend/common.js';
// js事件绑定
import e_npro_header from '../Static/js/npro/npro_header.js';
import e_npro_support_plan from '../Static/js/npro/npro_support_plan.js';
import e_npro_faq from '../Static/js/npro/npro_faq.js';
import e_npro_user_comments from '../Static/js/npro/npro_user_comments.js';
import e_npro_footer from '../Static/js/npro/npro_footer.js';
// 弹出层
import {
	attachModal
} from '../Static/js/common/modal.js';
// 插件引入
import scrollSpy from '../Depend/plugin/scrollSpy.js';
// 微信分享
import e_npro_wx_share from '../Static/js/npro/npro_wx_share.js';

class nproFactory {
	constructor() {}
		// 页面初始化
	init() {
			let [that, ajaxPromise, options, brickArray] =
			[this, new ajax_promise(), items.loadAjax.npro, items.htmlBrick.npro];
			options.url = env + options.url;
			const promise = new Promise(function(resolve, reject) {
				ajaxPromise.send(options).then(data => {
					// 静态页面渲染
					tNpro(data.response, brickArray);
					resolve(data.response);
				}).catch(error => {
					reject(error);
				});
			});
			promise.then(function(value) {
				that.bindEvent(value);
				that.serviceLogic(value);
				that.dataFlow(value);
			}, function(error) {
				console.log(error);
			});
		}
		// 页面事件绑定
	bindEvent(data) {
			// 静态页面渲染后，绑定事件
			e_npro_header();
			e_npro_support_plan(data);
			var Modal = new attachModal('.product-intro a:nth-child(4)', 'jobInform', 'footer');
			Modal.attachEvent();
			e_npro_faq();
			e_npro_user_comments();
			e_npro_footer();
			scrollSpy({
				"control1": ".lift-nav",
				"control2": ".lift",
				"target": [".lt-one", ".lt-two", ".lt-three"],
				"current": "current"
			});
		}
		// 页面业务逻辑
	serviceLogic(data) {
			// 平台识别
			if (GV && Object.is(GV.sceneType, '3')) {
				$(".mg-b-footer").css("margin-bottom", "1rem");
			};
		}
		// 页面数据流
	dataFlow(data) {
		localStorage.setItem('channel','RRBXW');
		localStorage.setItem('series_id',data.insurancePlan[0].id);
	}
};

var npro = new nproFactory();
npro.init();