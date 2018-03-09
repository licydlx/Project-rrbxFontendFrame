import env from '../Config/env.js';
import tNbuy from '../Template/nbuy.js';

// js 事件绑定
import e_buy_fold from '../Static/js/nbuy/nbuy_fold.js';
import e_nbuy_validate from '../Static/js/nbuy/nbuy_validate.js';
import e_nbuy_buynow from '../Static/js/nbuy/nbuy_buynow.js';
import e_nbuy_footer from '../Static/js/nbuy/nbuy_footer.js';
import e_nbuy_getcode from '../Static/js/nbuy/nbuy_getcode.js';
import e_nbuy_rela from '../Static/js/nbuy/nbuy_rela.js';
import e_nbuy_clause from '../Static/js/nbuy/nbuy_clause.js';
import timePicker from '../Static/js/nbuy/timePicker.js';

// 动态导入相关产品的文件
const productConfig = require('../Config/config.json');
const pageConfig = require("../Config/Page/" + productConfig.productId + "/nbuy.json");
const serviceLogic = require("../Config/Page/" + productConfig.productId + "/nbuy/serviceLogic.js").default;
const dataFlow = require("../Config/Page/" + productConfig.productId + "/nbuy/dataFlow.js").default;

const eventFuc = {
	"e_buy_fold": e_buy_fold,
	"e_nbuy_validate": e_nbuy_validate,
	"e_nbuy_buynow": e_nbuy_buynow,
	"e_nbuy_footer": e_nbuy_footer,
	"e_nbuy_getcode": e_nbuy_getcode,
	"e_nbuy_rela": e_nbuy_rela,
	"e_nbuy_clause": e_nbuy_clause,
	"timePicker": timePicker
}

class lifeCycle {
	constructor() {}
		// 页面初始化
	init() {
			var [that, renderData, brickArray] =
			[this, pageConfig.renderData, pageConfig.htmlBrick];
			const promise = new Promise(function(resolve, reject) {
				tNbuy(renderData, brickArray);
				resolve(renderData);
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
				serviceLogic(productConfig.productId,data);
			};
		}
		// 页面数据流
	dataFlow(data) {
		// if (dataFlow) {
		// 	dataFlow(data);
		// };
	}
};

var launch = new lifeCycle();
launch.init();