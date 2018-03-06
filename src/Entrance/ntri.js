// import env from '../Config/env.js';
// import {
// 	productConfig
// } from '../Config/config.js';
// import tTrial from '../Template/ntri.js';
// // js事件绑定
// //import e_npro_prem_trial from '../Static/js/trial/npro_prem_trial.js';
// import e_ntri_choose from '../Static/js/trial/ntri_choose.js';
// // import {
// // 	attachModal
// // } from '../Static/js/common/modal.js';

// // 页面配置信息
// const configuration = require('../Config/pageConfig/' + productConfig.productId + '/ntri.js');

// tTrial(configuration.View, brickArray, function() {
// 	e_ntri_choose(configuration.Data);
// 	var Modal = new attachModal('#buy-now', 'jobInform');
// 	Modal.attachEvent();
// }); 
// // e_npro_prem_trial(data.response);
// class nproFactory {
// 	constructor() {}
// 		// 页面初始化
// 	init() {
// 			tTrial(configuration.View, brickArray, function() {
// 				e_ntri_choose(configuration.Data);
// 				var Modal = new attachModal('#buy-now', 'jobInform');
// 				Modal.attachEvent();
// 			});
// 		}
// 		// 页面事件绑定
// 	bindEvent(data) {
// 			// 静态页面渲染后，绑定事件
// 			var BE = pageConfig.bindEvent;
// 			for (let func in BE) {
// 				var pars = BE[func]["pars"] ? BE[func]["pars"] : null;
// 				if (pars && pars["data"]) pars["data"] = data;
// 				if (eventFuc[func]) eventFuc[func](pars);
// 			};
// 		}
// 		// 页面业务逻辑
// 	serviceLogic(data) {
// 			if (serviceLogic) {
// 				serviceLogic(data);
// 			};
// 		}
// 		// 页面数据流
// 	dataFlow(data) {
// 		if (dataFlow) {
// 			dataFlow(data);
// 		};
// 	}
// };

// var npro = new nproFactory();
// npro.init();