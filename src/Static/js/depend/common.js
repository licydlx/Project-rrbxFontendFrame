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

// 获取URL搜索参数
// ydlx
// 
// 2018-2-27
const getProductId = function() {
	let searchObj = {};
	(window.onpopstate = function() {
		var match,
			pl = /\+/g,
			search = /([^&=]+)=?([^&]*)/g,
			decode = function(s) {
				return decodeURIComponent(s.replace(pl, " "));
			},
			query = window.location.search.substring(1);
		while (match = search.exec(query))
			searchObj[decode(match[1])] = decode(match[2]);
	})();
	return searchObj.productId;
}

// 时间戳 转为 yyyy-mm-dd 格式
// ydlx
// 
// 2018-3-2
const formatTimeStamp = function(par) {
	let now = new Date(parseInt(par) * 1000);
	let [year, month, date, hour, minute, second] =
	[now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()];
	if (hour < 10) hour = "0" + hour;
	if (minute < 10) minute = "0" + minute;
	if (second < 10) second = "0" + second;
	return {
		"day": year + "-" + month + "-" + date,
		"hour": hour + ":" + minute + ":" + second
	}
};


// 错误提示框
// 作者:ydlx
// 日期:2018-3-14
const alertError = function(data) {
	let tpl = `<div class="alert-bg">
					<div class="alert">
					 <p class="alert-content">${data}</p>
					 <div class="alert-btns">
					  <a class="alert1-btn">确定</a>
					 </div>
					</div>
				   </div>`;

	$("#container").append(tpl);
	$("#container").on("click", ".alert1-btn", function() {
		$('.alert-bg').remove();
	});
}

export {
	commonJs,
	loadScript,
	getProductId,
	formatTimeStamp,
	alertError
};