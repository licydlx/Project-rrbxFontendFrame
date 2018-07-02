import env from '../../Config/env.js';
import tNbuy from '../../Template/nbuy.js';

// js 事件绑定
import e_buy_fold from '../../Static/js/nbuy/nbuy_fold.js';
import e_nbuy_validate from '../../Static/js/nbuy/nbuy_validate.js';
import e_nbuy_getcode from '../../Static/js/nbuy/nbuy_getcode.js';


// 动态导入相关产品的文件
const pageConfig = require("./nbuy.json");
const serviceLogic = require("./nbuy/serviceLogic.js").default;

const eventFuc = {
	"e_buy_fold": e_buy_fold,
	"e_nbuy_validate": e_nbuy_validate,
	"e_nbuy_getcode": e_nbuy_getcode
}

class lifeCycle {
	constructor() {}
		// 页面初始化
	init() {
			// that: 当前作用域对象
			// renderData: 页面渲染数据 (后台返回数据加json配置数据)
			// brickArray: 页面模板组成
			var rrbxSet = JSON.parse(localStorage.getItem("20180614pinganlxjy")),
				[that, renderData, brickArray] =
				[this, Object.assign(pageConfig.renderData, rrbxSet.renderDate), pageConfig.htmlBrick];

			new Promise(function(resolve, reject) {
				tNbuy(renderData, brickArray);
				resolve([renderData, rrbxSet]);
			}).then(function(a) {
				that.bindEvent(a[0]);
				return a;
			}).then(function(a) {
				that.serviceLogic(a);
			}).catch(function(err) {
				console.log("投保页流程 work wrong");
			}).then(function() {
				console.log("work done");
			})
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
};

var launch = new lifeCycle();
launch.init();