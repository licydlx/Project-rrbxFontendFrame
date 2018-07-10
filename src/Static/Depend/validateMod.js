// 证件号码处理类
class certiNoHandle {
	constructor(val) {
		this.val = val;
	}

	verify() {
		var idCard = this.val;
		if (idCard.length == 15 && this.isValidityBrithBy15IdCard(idCard)) {
			return true;
		} else if (idCard.length == 18 && this.isTrueValidateCodeBy18IdCard(idCard) && this.isValidityBrithBy18IdCard(idCard)) {
			return true;
		} else {
			return false;
		}
	}

	isTrueValidateCodeBy18IdCard(a_idCard) {
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
	}

	isValidityBrithBy15IdCard(idCard15) {
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
	}

	isValidityBrithBy18IdCard(idCard18) {
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
	}
}

// 描述:表单验证重构
// 设计模式:策略
// 例子:validateMod('nonEmpty','nonEmpty','我是被验证的值') 参数1:要调用的方法;参数2:要调用的算法;参数3:要被验证的值
// 作者:ydlx
// 日期:2018-07-05
const validateMod = function(strategy, algorithm, value) {
	//去除所有空格:
	value = value.replace(/\s+/g, "");
	//去除两头空格:
	//value = value.replace(/^\s+|\s+$/g, "");
	//去除左空格：
	//value = value.replace(/^\s/, '');
	//去除右空格：
	//value = value.replace(/(\s$)/g, "");

	var sfObj = {
		nonEmpty: /\S+/,
		certiNo: function(v) {
			return new certiNoHandle(v).verify()
		},
		userName: /^[a-zA-Z\u4e00-\u9fa5]+$/
	};

	var stragtegyObj = {

		// 非空验证
		nonEmpty: function(sf, v) {
			return sfObj[algorithm].test(v);
		},

		// 身份证验证
		certiNo: function(sf, v) {
			return sfObj[algorithm](v);
		},

		// 姓名验证
		userName: function(sf, v) {
			return sfObj[algorithm].test(v);
		}
	}

	return stragtegyObj[strategy](algorithm, value);
}

export default validateMod;

// 例子
// validateMod("certiNo","certiNo","420101198902215315");