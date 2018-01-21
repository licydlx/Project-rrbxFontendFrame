/* 关系绑定 代理 待优化 */
/* ydlx */
/* 2017-12-20 */
import nbuy_insured from '../../../Moudle/nbuy/nbuy_insured.js';

const e_nbuy_rela = function(a) {
	var html = nbuy_insured(),
		data = [{
			'id': '00',
			'value': '本人'
		}, {
			'id': '02',
			'value': '子女'
		}, {
			'id': '01',
			'value': '父母'
		}, {
			'id': '03',
			'value': '配偶'
		}, {
			'id': '04',
			'value': '其他'
		}],
		obj = {
			watch: function(pro, callback) {
					if (pro in this) {
						var old = this[pro];
						Object.defineProperty(this, pro, {
							set: function(val) {
								var o = old;
								old = val;
								callback(val, o, this);
							},
							get: function() {
								return old;
							}
						});
					} else {
						throw new Error("no such property");
					}
				}
				/*,
						toString: function() {
							var str = "{   ";
							for (pro in this) {
								if (typeof this[pro] !== "function")
									str += (pro + " : " + obj[pro] + ",")
							}
							str[str.length - 1] = ' ';
							str += " }";
							return str;
						}*/
		}
	obj.a = "";
	obj.watch("a", function(n, o, _this) {
		if ($("#rela input").val() == "00") {
			$("#insured-add").empty();
		} else {
			$("#insured-add").empty();
			$("#insured-add").append(html);
		}
	});

	function test() {
		var $ia = $("#container #relaId").attr("value");
		obj.a = $ia;
	}

	var showRelaDom = document.querySelector('#showRela'),
		relaIdDom = document.querySelector('#relaId');

	showRelaDom.addEventListener('click', function() {
		var relaId = showRelaDom.dataset['id'],
			bankSelect = new IosSelect(1, [data], {
				container: '.container',
				title: '关系选择',
				itemHeight: 50,
				itemShowCount: 3,
				oneLevelId: relaId,
				showAnimate: true,
				callback: function(selectOneObj) {
					relaIdDom.value = selectOneObj.id;
					showRelaDom.innerHTML = selectOneObj.value;
					showRelaDom.dataset['id'] = selectOneObj.id;
					showRelaDom.dataset['value'] = selectOneObj.value;
					test();
				}
			});
	});
};
export default e_nbuy_rela;