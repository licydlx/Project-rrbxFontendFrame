import {
	commonJs,
	alertError
} from '../../../../Static/js/depend/common.js';
// 逻辑:下拉等 回调函数
// 条件:serviceLogic里 定义
import {
	handle,
	ajaxData
} from './serviceLogic.js';

const bindEvent = function(A) {

	// 逻辑:按需加载依赖模块
	// 条件:JSON里 自己配置
	const B = (function(a) {
		let b = {};
		a.forEach(function(x, y, z) {
			b[x.type] = require(`../../../../Static/js/depend/tools/${x.type}.js`).default;
		})
		return b;
	})(Object.values(A));

	// 逻辑:按需加载依赖数据
	// 条件:JSON里 自己配置
	const D = (function(c) {
		let d = [];
		c.map(function(m, n) {
			return m.id;
		}).forEach(function(x, y, z) {
			d[x] = require(`./data/${x}.js`).default;
		})
		return d;
	})(Object.values(A));

	// 逻辑:下拉选项
	// 条件:点击下拉选择,即可
	Object.values(A).forEach(function(x, y, z) {
		new B[x.type]($(`#${x.id}`), x.title, D[x.id], handle[x.id]).init();
	});

	// 逻辑:折叠
	// 条件:...
	$('#container').on('click', '.box > .header', function(event) {
		event.preventDefault();
		var $this = $(this),
			$next = $this.next();
		$next.slideToggle();
		$this.parent().toggleClass('open');
	});

	// 逻辑:支付
	// 条件:...
	$('#container').on('click', '#goPay', function(event) {
		event.preventDefault();
		console.log(ajaxData);
		$.ajax({
			type: "POST",
			url: "pay",
			data: "data=" + JSON.stringify(ajaxData),
			timeout: 60000,
			dataType: "JSON",
			beforeSend: function() {
				commonJs.loadAnimation();
			},
			success: function(data) {
				if (data.code == 10000) {
					window.location.href = data.response;
				} else {
					commonJs.loadClose();
					alertError(data.info);
				}
			},
			error: function(xhr, type) {
				commonJs.loadClose();
				alertError("请求超时，请稍后再试！");
			},
			complete: function(xhr, status) {
				if (status == 'timeout') {
					xhr.abort();
					$.alert("网络超时，请刷新", function() {
						location.reload();
					})
				}
			}
		})
	});
}
export default bindEvent;