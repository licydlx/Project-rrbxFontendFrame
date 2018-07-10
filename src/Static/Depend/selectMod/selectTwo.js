// 下拉:选择省市地区
// 参数:
// 例子:
// 作者:ydlx
// 日期:2018-03-14
class selectTwo {
	constructor(bindDom, title, data, func) {
		this.bindDom = bindDom;
		this.title = title;
		this.data = data;
		this.func = func;
	}

	init() {
		var that = this;

		that.bindDom.on("click", function(event) {
			event.preventDefault();
			var codeStr = that.bindDom.attr("data-id"),
				oneLevelId = "",
				twoLevelId = "";
			if (codeStr) {
				var codeArray = codeStr.split(",");
				oneLevelId = codeArray[0];
				twoLevelId = codeArray[1];
			};

			new IosSelect(2, [that.data.provinces, that.data.citys], {
				title: that.title,
				itemHeight: 35,
				relation: [1, 1],
				oneLevelId: oneLevelId,
				twoLevelId: twoLevelId,
				showAnimate: true,
				callback: function(selectOneObj, selectTwoObj) {
					if (that.func) {
						that.func({
							selectOneObj,
							selectTwoObj
						});
					};
					that.bindDom.attr("data-id", selectOneObj.id + "," + selectTwoObj.id);
					that.bindDom.attr("value", selectOneObj.value + "," + selectTwoObj.value);
				}
			});
		});
	}
}
export default selectTwo;