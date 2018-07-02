import env from '../../Config/env.js';
import ajax_promise from './npro/load_ajax.js';
import tNpro from '../../ViewTemplate/npro.js';

const pageConfig = require("./npro.json");
import bindEvent from "../../EventBinding/npro.js";
import serviceLogic from "./npro/serviceLogic.js";
import dataFlow from "./npro/dataFlow.js";

var ajaxPromise = new ajax_promise();
var options = pageConfig.loadAjax;
options.url = env + options.url;

const promise = new Promise(function(resolve, reject) {
	ajaxPromise.send(options).then(data => {
		// 静态页面渲染
		var pageConfigObj = Object.assign({},data.response);
		pageConfigObj.PZ = pageConfig.PZ;

		console.log(pageConfigObj);

		tNpro(pageConfigObj, pageConfig.htmlBrick);
		resolve(pageConfigObj);
	}).catch(error => {
		reject(error);
	});
});

promise.then(function(PZ) {
	bindEvent(PZ);
	// serviceLogic(value);
	dataFlow({
		"productId": pageConfig.productId,
		"value": PZ
	});
}, function(error) {
	console.log(error);
});