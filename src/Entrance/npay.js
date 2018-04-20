import env from '../Config/env.js';
import tNpay from '../Template/npay.js';
// 动态导入相关产品的文件
const productConfig = require('../Config/config.json');
const pageConfig = require("../Config/Page/" + productConfig.productId + "/npay.json");
const serviceLogic = require("../Config/Page/" + productConfig.productId + "/npay/serviceLogic.js").serviceLogic;
const bindEvent = require("../Config/Page/" + productConfig.productId + "/npay/bindEvent.js").default;

tNpay(pageConfig.renderData, pageConfig.htmlBrick);
serviceLogic();
bindEvent(pageConfig.bindEvent);
