// ====================
// 试算页 入口
// ====================

// 环境
import env from '../../Config/env.js';
// view模板
import tTrial from '../../ViewTemplate/ntri.js';
// 当前页面事件绑定
import bindEvent from "../../EventBinding/ntri.js";
// 当前页面业务逻辑
import serviceLogic from "./ntri/serviceLogic.js";

// 当前页面配置json
const pageConfig = require("./ntri.json");




var rrbxSetObj = JSON.parse(localStorage.getItem(GV.ntri_rrbxProductId)),

	renderData = Object.assign({}, rrbxSetObj.renderData,pageConfig.renderData);

	pageConfig.renderData = renderData;
	console.log(rrbxSetObj.renderData);

// 页面渲染
tTrial(pageConfig, pageConfig.htmlBrick);
// 页面事件绑定
bindEvent(pageConfig);
// 业务逻辑
serviceLogic(rrbxSetObj);