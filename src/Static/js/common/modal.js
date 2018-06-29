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
		return this;
	},
	show: function() {
		$('#container').append(this.templete(this.par));
		return this;
	},
	hide: function() {
		$('#stateIndform').remove();
	}
};

const dateModals = function(dom, templete, par) {
	this.dom = dom;
	this.templeteName = templete;
	this.templete = tpl[templete];
	this.par = par;
}

dateModals.prototype = {
	init: function() {
		var that = this;
		$('#container').on('click', '#stateIndforms', function(event) {
			event.preventDefault();
			$('#stateIndforms').remove();
		});
		return this;
	},
	show: function() {
		$('#container').append(this.templete(this.par));
		return this;
	},
	hide: function() {
		$('#stateIndforms').remove();
	}
};


const previewImgModal = function(dom, templete, par,parentId,callback) {
	this.dom = dom;
	this.templeteName = templete;
	this.templete = tpl[templete];
	this.par = par;
	this.parentId = parentId;
	this.callback = callback;
}

previewImgModal.prototype = {
	init: function() {
		var that = this;
		$('#container').one('click', '#piSure', function(event) {
			event.preventDefault();
			$('#previewImg').remove();
			that.remove();
		});

		$('#container').one('click', '#piDelete', function(event) {
			event.preventDefault();
			that.dom.parent().remove();
			that.remove();
			if (that.callback) {
				that.callback(that.dom,that.par,that.parentId);
			};
		});
		return this;
	},
	show: function() {
		$('#container').append(this.templete(this.par));
		return this;
	},
	remove: function() {
		$('#previewImg').remove();
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

const previewImgModals = function(dom, templete, par) {
	this.dom = dom;
	this.templeteName = templete;
	this.templete = tpl[templete];
	this.par = par;
}

previewImgModals.prototype = {
	init: function() {
		var that = this;
		$('#container').on('click', '#previewImgs', function(event) {
			event.preventDefault();
			$('#previewImgs').remove();
		});
		return this;
	},
	show: function() {
		$('#container').append(this.templete(this.par));
		return this;
	}
};

export {
	attachModal,
	consultServie,
	dateModal,
	dateModals,
	previewImgModal,
	previewImgModals
};