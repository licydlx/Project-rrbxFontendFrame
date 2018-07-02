import env from '../../Config/env.js';
import tTrial from '../../ViewTemplate/ntri.js';

const pageConfig = require("./ntri.json");
// import serviceLogic from "./ntri/serviceLogic.js";

// pageConfig: 页面渲染数据 (后台返回数据加json配置数据)
// pageConfig.htmlBrick: 页面模板组成
var rrbxSetObj = JSON.parse(localStorage.getItem(GV.ntri_rrbxProductId)),
	renderData = Object.assign(pageConfig.renderData, rrbxSetObj.renderDate);
	pageConfig.renderData = renderData;

tTrial(pageConfig, pageConfig.htmlBrick);