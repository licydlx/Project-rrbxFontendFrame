import env from '../Config/env.js';
import tTrial from '../Template/ntri.js';
// js事件绑定
import e_ntri_premTrial from '../Static/js/ntri/ntri_premTrial.js';
import e_ntri_footer from '../Static/js/ntri/ntri_footer.js';
// 动态导入相关产品的文件
const productConfig = require('../Config/config.json');

const pageConfig = require("../Config/Page/" + productConfig.productId + "/ntri.json");
const serviceLogic = require("../Config/Page/" + productConfig.productId + "/ntri/serviceLogic.js").default;
const dataFlow = require("../Config/Page/" + productConfig.productId + "/ntri/dataFlow.js").default;

const eventFuc = {
	"e_ntri_premTrial": e_ntri_premTrial,
	"e_ntri_footer": e_ntri_footer
}

class lifeCycle {
	constructor() {}
		// 页面初始化
	init() {
			var [that, renderData, brickArray, nproData] =
			[this, pageConfig.renderData, pageConfig.htmlBrick, JSON.parse(localStorage.getItem(productConfig.productId))];
			renderData = Object.assign(nproData, renderData);
			const promise = new Promise(function(resolve, reject) {
				tTrial(renderData, brickArray);
				resolve(renderData);
			});
			promise.then(function(value) {
				that.bindEvent(value);
				that.serviceLogic(value);
				// that.dataFlow(value);
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
		// if (dataFlow) {
		// 	dataFlow(data);
		// };
	}
};

var launch = new lifeCycle();
launch.init();