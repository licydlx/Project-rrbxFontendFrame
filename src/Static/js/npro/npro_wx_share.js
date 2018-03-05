import env from '../../../Config/env.js';
import {
	loadScript
} from '../depend/common.js';
const e_npro_wx_share = (() => {
	loadScript("https://res.wx.qq.com/open/js/jweixin-1.0.0.js", function() {
		loadScript("https://m1.renrenbx.com/rrbxcdn/rrbx/wx_share/wx-common.js", function() {
			let loadAnimation = function() {},
				loadClose = function() {},
				shareLink = location.href;
			wxShare(env, encodeURIComponent(location.href.split('#')[0]), GV.title, GV.shareContent, GV.shareLogo, shareLink);
		});
	});
})();
export default e_npro_wx_share;