import env from '../../../Config/env.js';
import {
	loadScript
} from '../../Depend/common.js';
const wx_share = function(PZ) {
	loadScript("https://res.wx.qq.com/open/js/jweixin-1.0.0.js", function() {
		loadScript("https://m1.renrenbx.com/rrbxcdn/rrbx/wx_share/wx-common.js", function() {
			let loadAnimation = function() {},
				loadClose = function() {},
				shareLink = location.href;
			wxShare(env, encodeURIComponent(location.href.split('#')[0]), GV.title, GV.shareContent, GV.shareLogo, shareLink);
		});
	});
};
export default wx_share;