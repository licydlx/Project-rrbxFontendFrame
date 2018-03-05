// import env from '../Config/env.js';
// import {
// 	items
// } from '../Config/config.js';
// import ajax_promise from '../Depend/custom/load_ajax.js';
// import tTrial from '../Template/ntri.js';
// // js事件绑定
// //import e_npro_prem_trial from '../Static/js/trial/npro_prem_trial.js';
// import e_ntri_choose from '../Static/js/trial/ntri_choose.js';
// import {attachModal} from '../Static/js/common/modal.js';
// // 页面配置信息
// const configuration = require('../Config/pageConfig/' + items.productId + '/ntri.js');

// let ajaxPromise = new ajax_promise(),
// 	options = items.loadAjax.ntri,
// 	brickArray = items.htmlBrick.ntri;
// // options.url = env + options.url;
// // ajaxPromise.send(options).then(data => {
// // 	tTrial(data.response, brickArray);
// // 	e_npro_prem_trial(data.response);
// // }).catch(error => {
// // 	console.log(error);
// // });
// tTrial(configuration.View, brickArray, function() {
// 	e_ntri_choose(configuration.Data);
// 	var Modal = new attachModal('#buy-now','jobInform');
// 	Modal.attachEvent();
// });
// // e_npro_prem_trial(data.response);