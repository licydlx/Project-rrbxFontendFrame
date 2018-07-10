// ==================================
// 验证机制 改版
// 参见 validateMod.js
// ==================================

var validate = {
	obj: {
		"phoneno": /^(1[3456789][0-9]|14[57])\d{8}$/,
		"userName": /^[a-zA-Z\u4e00-\u9fa5]+$/,
		"certiNo": "certiNo",
		"authCode": /^\d{6,9}$/,
		"email": /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
		"address": /\S/,
		"cardNo": /^[0-9]{16,19}$/,
		"CmKg": /^[0-9]{1,3}$/,
		"postcode": /^[1-9][0-9]{5}$/,
		"noNull": /\S+/,
		"onlyNum": /^[0-9]*$/
	},
	format: function(par) {
		return this.obj[par];
	},
	contrast: function(val, format) {
		if (format == "certiNo") {
			var idCard = this.trim(val);
			if (idCard.length == 15 && this.isValidityBrithBy15IdCard(val)) {
				return true;
			} else if (idCard.length == 18 && this.isTrueValidateCodeBy18IdCard(val) && this.isValidityBrithBy18IdCard(val)) {
				return true;
			} else {
				return false;
			}
		} else if (format == "checkbox") {
			return true;
		} else if (format == "all") {
			return true;
		} else if (format == "onlyNum") {
			var format = this.format(format);
			var format1 = this.format("noNull");
			return format1.test(val) && format.test(val);
		} else {
			var format = this.format(format);
			return format.test(val);
		};
	},
	isTrueValidateCodeBy18IdCard: function(a_idCard) {
		var sum = 0,
			Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1],
			a_idCard = a_idCard.split(""),
			ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值.10代表X
		if (a_idCard[17].toLowerCase() == 'x') { // toLowerCase()将原字符串的大写字母变成小写字母
			a_idCard[17] = 10;
		}
		for (var i = 0; i < 17; i++) {
			sum += Wi[i] * a_idCard[i]; // 身份证加权求和方法
		}
		var valCodePosition = sum % 11; // 获得校验码的位置
		if (a_idCard[17] == ValideCode[valCodePosition]) {
			return true;
		} else {
			return false;
		}
	},
	isValidityBrithBy18IdCard: function(idCard18) {
		var year = idCard18.substring(6, 10);
		var month = idCard18.substring(10, 12);
		var day = idCard18.substring(12, 14);
		var temp_date = new Date(year, parseFloat(month) - 1,
			parseFloat(day));
		/* 获取年份 */
		if (temp_date.getFullYear() != parseFloat(year) ||
			temp_date.getMonth() != parseFloat(month) - 1 ||
			temp_date.getDate() != parseFloat(day)) {
			return false;
		} else {
			return true;
		}
	},
	isValidityBrithBy15IdCard: function(idCard15) {
		var year = idCard15.substring(6, 8);
		var month = idCard15.substring(8, 10);
		var day = idCard15.substring(10, 12);
		var temp_date = new Date(year, parseFloat(month) - 1,
			parseFloat(day));
		/* 获取年份 */
		if (temp_date.getYear() != parseFloat(year) ||
			temp_date.getMonth() != parseFloat(month) - 1 ||
			temp_date.getDate() != parseFloat(day)) {
			return false;
		} else {
			return true;
		}
	},
	trim: function(str) {
		return str.replace(/(^\s*)|(\s*$)/g, "");
	}
}

export default validate;