// 下拉:一级级联选择器
// 参数:bindDom:Dom对象;title:标题;data:选择选项;func:回调函数
// 例子:new selectOne($("#"),)
// 作者:ydlx
// 日期:2018-03-12

class selectOne {
	constructor(bindDom, title, data, func) {
		this.bindDom = bindDom;
		this.title = title;
		this.data = data;
		this.func = func;
	}

	init() {
		var that = this;
		that.bindDom.click(function(event) {
			event.preventDefault();
			new IosSelect(1, [that.data], {
				container: '#container',
				title: that.title,
				itemHeight: 35,
				itemShowCount: 4,
				oneLevelId: that.bindDom.attr('data-id'),
				showAnimate: true,
				callback: function(selectObj) {
					if (that.func) {
						if (!that.func(that.bindDom,selectObj)) {
							return;
						};
					};
					that.bindDom.attr('data-id', selectObj.id);
					that.bindDom.attr('value', selectObj.value);
				}
			});
		});
	}
}
export default selectOne;