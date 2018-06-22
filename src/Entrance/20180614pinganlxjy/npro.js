import env from '../../Config/env.js';
import ajax_promise from '../../Depend/custom/load_ajax.js';
import tNpro from '../../Template/npro.js';
// js事件绑定
import e_npro_header from '../../Static/js/npro/npro_header.js';
import e_npro_support_plan from '../../Static/js/npro/npro_support_plan.js';
import e_npro_faq from '../../Static/js/npro/npro_faq.js';
import e_npro_user_comments from '../../Static/js/npro/npro_user_comments.js';
import e_npro_footer from '../../Static/js/npro/npro_footer.js';
import e_npro_common from '../../Static/js/npro/npro_common.js';
// 插件引入
import scrollSpy from '../../Depend/plugin/scrollSpy.js';
// 微信分享
import e_npro_wx_share from '../../Static/js/npro/npro_wx_share.js';
// 动态导入相关产品的文件

const pageConfig = require("../../Config/Page/20180614pinganlxjy/npro.json");
const serviceLogic = require("../../Config/Page/20180614pinganlxjy/npro/serviceLogic.js").default;
const dataFlow = require("../../Config/Page/20180614pinganlxjy/npro/dataFlow.js").default;

const eventFuc = {
	"e_npro_header": e_npro_header,
	"e_npro_support_plan": e_npro_support_plan,
	"e_npro_faq": e_npro_faq,
	"e_npro_user_comments": e_npro_user_comments,
	"e_npro_footer": e_npro_footer,
	"scrollSpy": scrollSpy,
	"e_npro_wx_share": e_npro_wx_share,
	"e_npro_common": e_npro_common
}

class lifeCycle {
	constructor() {}
		// 页面初始化
	init() {
			var [that, ajaxPromise, options, brickArray] =
			[this, new ajax_promise(), pageConfig.loadAjax, pageConfig.htmlBrick];
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
				that.dataFlow({"productId":"20180614pinganlxjy","value":value});
			}, function(error) {
				console.log(error);
			});
		}
		// 页面事件绑定
	bindEvent(data) {
			// 静态页面渲染后，绑定事件
			var BE = pageConfig.bindEvent;
			for (let func in BE) {
				var pars = BE[func]["pars"] ? BE[func]["pars"] : null;
				if (pars && pars["data"]) pars["data"] = data;
				if (eventFuc[func]) eventFuc[func](pars);
			};
		}
		// 页面业务逻辑
	serviceLogic(data) {
			if (serviceLogic) {
				serviceLogic(data);
			};
		}
		// 页面数据流
	dataFlow(data) {
		if (dataFlow) {
			dataFlow(data);
		};
	}
};

var launch = new lifeCycle();
launch.init();