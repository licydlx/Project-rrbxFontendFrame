/* 关系绑定 代理 待优化 */
/* ydlx */
/* 2017-12-20 */
import nbuy_insured_rela from '../../../Moudle/nbuy/nbuy_insured_rela.js';
const e_nbuy_rela = function(pars) {
	var data = pars.relaData,
		relaTemplate = nbuy_insured_rela(pars),
		showRelaDom = $("#relaId"),
		relaDom = $("#rela");
	showRelaDom.click(function() {
		var bankSelect = new IosSelect(1, [data], {
			container: '#container',
			title: '关系选择',
			itemHeight: 50,
			itemShowCount: 3,
			showAnimate: true,
			callback: function(selectObj) {
				showRelaDom.attr("data-id", selectObj.id);
				showRelaDom.attr("value", selectObj.value);
				if (Object.is(selectObj.value, "本人")) {
					$("#rela ~ [data-add]").remove();
				} else {
					$("#rela ~ [data-add]").remove();
					relaDom.after(relaTemplate);
				};
			}
		});
	})
};
export default e_nbuy_rela;