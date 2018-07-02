// 获取监听目标 id
// 获取监听目标 距离顶部的距离
class scrollSpy {
	constructor(navId, targetIdArray) {
		this.navId = navId
		this.targetIdArray = targetIdArray;
		this.navRender(navId);
		this.init();
	}

	init() {
		var that = this;
		var scrollTag = true;
		var showNavTag = false;
		var navDom = $('#' + that.navId);
		var offsetTop = this.targetIdArray.map(function(x, y) {
			return $('[data-scrollSpy=' + x + ']').offset().top;
		});

		$(window).on("scroll", function() {
			var t = $(window).scrollTop();
			// nav
			if (offsetTop[0] - t > 0 && showNavTag) {
				navDom.fadeOut(500);
				showNavTag = false;
			} else if (offsetTop[0] - t < 0 && !showNavTag) {
				navDom.fadeIn(500);
				showNavTag = true;
			};

			// content
			if (scrollTag) {
				offsetTop.forEach(function(x, y, z) {
					if (Math.abs(x - t) < 50) {

						console.log(y);
						console.log("ok");

						scrollTag = false;
						setTimeout(function() {
							scrollTag = true;
						}, 200);
					};
				})
			};
		});
	}


	navRender(navId) {
		var tpl = ``
	}
}
new scrollSpy('navId', ['one', 'two', 'three']);