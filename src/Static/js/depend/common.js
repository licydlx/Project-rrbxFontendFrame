// 投保 状态过度动画 
// ydlx
// github:https://github.com/licydlx/rrbx
// 2018-1-30
const commonJs = {
	loadAnimation: () => (
		$("body").append('<div id="logo_load"><div class="logo_load"><img src="https://www.renrenbx.com/test/logo-load.gif"/><p>Loading</p></div></div>'),
		$("#logo_load").show(),
		$("#logo_load").css("height", $(window).height())
	),
	loadClose: () => (
		$("#logo_load").hide(),
		$("#logo_load").remove()
	)
};

// 动态加载js
// ydlx
// github:https://github.com/licydlx/rrbx
// 2018-1-30
const loadScript = (url, callback) => {
	var script = document.createElement("script");
	script.type = "text/javascript";
	if (script.readyState) { //IE
		script.onreadystatechange = function() {
			if (script.readyState == "loaded" || script.readyState == "complete") {
				script.onreadystatechange = null;
				callback();
			}
		};
	} else { //Others
		script.onload = function() {
			callback();
		};
	}
	script.src = url;
	document.getElementsByTagName("head")[0].appendChild(script);
}

export {
	commonJs,
	loadScript
};