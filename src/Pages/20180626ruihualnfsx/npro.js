// ====================
// 详情页 入口
// ====================

// 环境
import env from '../../Config/env.js';
// view模板
import tNpro from '../../ViewTemplate/npro.js';

// ajax获取数据
import {
	getDataAjax
} from '../../Static/Depend/ajaxMod.js';

// 当前页面事件绑定
import bindEvent from "../../EventBinding/npro.js";

// 当前页面业务逻辑
import serviceLogic from "./npro/serviceLogic.js";

// 当前页面数据流
import dataFlow from "./npro/dataFlow.js";

// 当前页面配置json
const pageConfig = require("./npro.json");

var options = pageConfig.loadAjax;
options.url = env + options.url;

const promise = new Promise(function(resolve, reject) {

	getDataAjax(options, function(data) {
		var pageConfigObj = Object.assign(data, pageConfig);

		tNpro(pageConfigObj, pageConfig.htmlBrick);

		resolve(pageConfigObj);
	})
});

// 全局变量设置提示
if (GV.rrbxProductId !== pageConfig.productId) {
	alert("请在npro.html里配置全局变量-产品ID,其他页面如是！")
};

promise.then(function(config) {
	bindEvent(config);
	serviceLogic(config);
	dataFlow({
		"productId": pageConfig.productId,
		"value": config
	});
}, function(error) {
	console.log(error);
});