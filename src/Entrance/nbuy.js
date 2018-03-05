// import env from '../Config/env.js';
// import {items} from '../Config/config.js';

// import ajax_promise from '../Depend/custom/load_ajax.js';
// import tNbuy from '../Template/nbuy.js';

// // js 事件绑定
// import Accordion from '../Static/js/nbuy/nbuy_fold.js';
// import e_nbuy_validate from '../Static/js/nbuy/nbuy_validate.js';
// import e_nbuy_buynow from '../Static/js/nbuy/nbuy_buynow.js';
// import e_nbuy_footer from '../Static/js/nbuy/nbuy_footer.js';
// import getCode from '../Static/js/nbuy/nbuy_getcode.js';

// import e_nbuy_rela from '../Static/js/nbuy/nbuy_rela.js';
// import timePicker from '../Static/js/nbuy/timePicker.js';

// let ajaxPromise = new ajax_promise(),
// 	options = items.loadAjax.nbuy,
// 	brickArray = items.htmlBrick.nbuy;

// options.url = env + options.url;

// ajaxPromise.send(options).then(data => {
// 	tNbuy(data.response, brickArray);

// 	new Accordion($('#container .related-person'), false);
// 	e_nbuy_validate();
// 	e_nbuy_buynow();
// 	e_nbuy_footer(data.response);
// 	e_nbuy_rela();
// 	getCode();
// 	timePicker();


// }).catch(error => {
// 	console.log(error);
// });