import env from '../../Config/env.js';
<<<<<<< HEAD
import tTrial from '../../ViewTemplate/ntri.js';

const pageConfig = require("./ntri.json");
// import serviceLogic from "./ntri/serviceLogic.js";

// pageConfig: 页面渲染数据 (后台返回数据加json配置数据)
// pageConfig.htmlBrick: 页面模板组成
var rrbxSetObj = JSON.parse(localStorage.getItem(GV.ntri_rrbxProductId)),
	renderData = Object.assign(pageConfig.renderData, rrbxSetObj.renderDate);
	pageConfig.renderData = renderData;

tTrial(pageConfig, pageConfig.htmlBrick);
=======
import tTrial from '../../Template/ntri.js';
// js事件绑定
import e_ntri_premTrial from '../../Static/js/ntri/ntri_premTrial.js';
import e_ntri_footer from '../../Static/js/ntri/ntri_footer.js';
// 动态导入相关产品的文件

const pageConfig = require("./ntri.json");
const serviceLogic = require("./ntri/serviceLogic.js").default;

const eventFuc = {
	"e_ntri_premTrial": e_ntri_premTrial,
	"e_ntri_footer": e_ntri_footer
}

class lifeCycle {
	constructor() {}
		// 页面初始化
	init() {
			// that: 当前作用域对象
			// renderData: 页面渲染数据 (后台返回数据加json配置数据)
			// brickArray: 页面模板组成
			var rrbxSetObj = JSON.parse(localStorage.getItem("20180614pinganlxjy")),
				that = this,
				renderData = Object.assign(pageConfig.renderData, rrbxSetObj.renderDate),
				brickArray = pageConfig.htmlBrick;

			new Promise(function(resolve, reject) {
				tTrial(renderData, brickArray);
				resolve([renderData, rrbxSetObj]);
			}).then(function(a) {
				that.bindEvent(a[1]);
				return a;
			}).then(function(a) {
				that.serviceLogic(a);
			}).catch(function(err) {
				console.log("试算页流程 work wrong");
			}).then(function() {
				console.log("work done");
			})
		}
		// 页面事件绑定
	bindEvent(data) {
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
};

var launch = new lifeCycle();
launch.init();
>>>>>>> 9d2defb7cbe923c6d95e2637279e7b019022ed16
