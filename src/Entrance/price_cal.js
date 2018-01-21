import env from '../Config/env.js';
import {items} from '../Config/config.js';
import ajax_promise from '../Depend/custom/load_ajax.js';
import tTrial from '../Template/ntri.js';

// js事件绑定
import e_npro_prem_trial from '../Static/js/trial/npro_prem_trial.js';

let ajaxPromise = new ajax_promise(),
	options = items.loadAjax.ntri,
	brickArray = items.htmlBrick.ntri;

options.url = env + options.url;

ajaxPromise.send(options).then(data => {
	tTrial(data.response, brickArray);
	e_npro_prem_trial(data.response);
}).catch(error => {
	console.log(error);
});