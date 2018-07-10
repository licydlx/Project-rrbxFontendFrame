// 描述:业务组件 (封装相似的业务逻辑)
// 作者:ydlx
// 日期:2018-07-03

import {
	premAjax
} from '../ajaxMod.js';
// 逻辑: 根据算参数获取保费,显示并存储公共数据对象
// 条件: 试算参数对象:ntriObj;公共数据对象:rrbxSetObj
const getPrem = function(parsObj, servicePars, premDom, callback) {
	//
	var ntriObj = parsObj.rrbx;
	//
	ntriObj["extraParams"] = parsObj.extraParams;
	//
	premAjax(ntriObj, function(value) {
		premDom.text(value + "元");

		parsObj.extraParams.prem = value;

		servicePars.insuredPars.pars = parsObj;

		localStorage.setItem(servicePars.insuredPars.parsInit.rrbx.rrbxProductId, JSON.stringify(servicePars));
	});
}


export {
	getPrem
}