require("../../scss/component/common/tpl/jobInform.scss");
import {
	tpl
} from './viewTemplate.js';

const attachModal = function(dom, templete, par) {
	this.dom = dom;
	this.templeteName = templete;
	this.templete = tpl[templete];
	this.par = par || '';
}
attachModal.prototype = {
	attachEvent: function() {
		var that = this;
		if (Object.is(this.templeteName, 'jobInform')) {
			$(this.dom).on('click', function(event) {
				event.preventDefault();
				that.show();
			});
			if (Object.is(this.par, 'footer')) {
				$('#container').on('click', '#modal', function(event) {
					that.hide();
				});
			} else {
				$('#container').on('click', '#modalFalse', function(event) {
					event.preventDefault();
					that.hide();

					var Modal = new attachModal('#modalFalse', 'stateIndform', '您不符合本产品的投保要求，抱歉！');
					Modal.attachEvent();
					Modal.show();
				});
			};
		} else {
			$('#container').on('click', '#stateIndform', function(event) {
				event.preventDefault();
				$('#stateIndform').remove();
			});
		};
	},
	show: function() {
		$('#container').append(this.templete(this.par));
	},
	hide: function() {
		$('#modal').remove();
	}
};

const dateModal = function(dom, templete, par) {
	this.dom = dom;
	this.templeteName = templete;
	this.templete = tpl[templete];
	this.par = par;
}

dateModal.prototype = {
	init: function() {
		var that = this;
		$('#container').on('click', '#stateIndform', function(event) {
			event.preventDefault();
			$('#stateIndform').remove();
		});

	},
	show: function() {
		$('#container').append(this.templete(this.par));
	},
	hide: function() {
		$('#stateIndform').remove();
	}
};

const consultServie = function(templete, bindDom, selfDom) {
	this.templete = tpl[templete];
	this.bindDom = bindDom;
	this.selfDom = selfDom;
};

consultServie.prototype = {
	init: function() {
		var that = this;
		// 打开客服咨询弹框
		$("#container").on("click", this.bindDom, function() {
			that.show();
		});
		// 取消客服咨询弹框
		$('#container').on('click', this.selfDom + ' [cancel]', function() {
			that.hide();
		});
	},
	show: function() {
		$('#container').append(this.templete());
	},
	hide: function() {
		$('#service-pop').remove();
	}
}

export {
	attachModal,
	consultServie,
	dateModal
};