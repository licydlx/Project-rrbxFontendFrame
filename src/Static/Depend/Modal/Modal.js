// 模态框组件
// 作者:ydlx
// 设计模式:照猫画虎
// 日期:2018-07-04

require("./Modal.scss");
import modalEjs from './Modal.ejs';
import modalViewConfig from './modalViewConfig.js';

class Modal {
	constructor(type, customConfig, callback) {
		this.type = type || 'defaultConfig';
		this.customConfig = customConfig || {};
		this.callback = callback;
	}

	init() {
		var [B, type] = [$('#container'), this.type];
		// 用户自定义配置替换原始配置 (对象合并,深拷贝)
		var VC = $.extend(true,{}, modalViewConfig[type], this.customConfig);

		// 渲染模态框
		B.append(modalEjs({
			config: VC
		}));

		if (VC.type === 'defaultConfig') {
			// // 绑定清除模态框事件
			// B.one('click', '.modal-bg', function(event) {
			// 	/* Act on the event */
			// 	$(this).remove();
			// });

			setTimeout(function(){
				$('.modal-bg').remove();
			},2000);
		};

		if (VC.type === 'consultService') {
			// 绑定清除模态框事件
			B.one('click', '#consultCancel', function(event) {
				/* Act on the event */
				$(this).closest('.modal-bg').remove();
			});
		};
	}

	disappear() {

	}
}

export default Modal;