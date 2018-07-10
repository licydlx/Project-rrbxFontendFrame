// ====================
// 投保页 入口
// ====================

// 环境
import env from '../../Config/env.js';
// view模板
import tNbuy from '../../ViewTemplate/nbuy.js';
// 当前页面事件绑定
import bindEvent from "../../EventBinding/nbuy.js";

// 当前页面业务逻辑
import serviceLogic from "./nbuy/serviceLogic.js";

// 当前页面配置json
const pageConfig = require("./nbuy.json");

// renderData: 页面渲染数据 (后台返回数据加json配置数据)
// brickArray: 页面模板组成
var rrbxSetObj = JSON.parse(localStorage.getItem(GV.nbuy_rrbxProductId));

rrbxSetObj.GV = GV;
Object.assign(rrbxSetObj.renderData, pageConfig.renderData);
Object.assign(pageConfig, rrbxSetObj);

// 渲染页面
tNbuy(pageConfig, pageConfig.htmlBrick);

// 绑定事件
bindEvent(pageConfig);
serviceLogic(rrbxSetObj);