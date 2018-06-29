import premAjax from '../../../Static/js/depend/datas/premAjax.js';
import {
	consultServie,
	dateModal
} from '../../../Static/js/common/modal.js';
import dateUnit from '../../../Static/js/depend/tools/dateUnit.js';
import selectOne from '../../../Static/js/depend/tools/selectOne.js';

import periodData from './periodData.js';
import amntData from './amntData.js';

const serviceLogic = function(a) {
	var renderData = a[0],
		rrbxSetObj = a[1];
	// 初始化 保費參數值(由投保页回退回来) (多层级 对象 深拷贝)
	var parsObj = JSON.parse(JSON.stringify(rrbxSetObj.insuredPars.parsInit));
	// 客服咨询
	new consultServie("consultService", "#service", "#service-pop").init();
	// =============================
	// 业务逻辑
	// =============================
	getPrem();

	// 保额选择
	new selectOne($("#amnt"), "保额选择", amntData, amnt).init();

	function amnt(content, value) {
		if (value) {
			$(".text .sub span:nth-child(2)").text(value/10 + '万');
		};
		parsObj.extraParams.amnt = value;
		getPrem();
		return true;
	}

	// 保障期限
	new selectOne($("#period"), "保期选择", periodData, period).init();

	function period(content, value) {
		parsObj.extraParams.period = value;
		getPrem();
		return true;
	}

	// 选择人数
	$('#buyNum').keyup(function(e) {
		var v = $(this).val();
		if (Object.is(v,"")) {
			// new dateModal(null, "stateIndform", "保障人数不能为空").init().show();
		} else if(!Object.is(typeof parseInt(v),'number')){
			new dateModal(null, "stateIndform", "请输入数字类型").init().show();
		} else {
			parsObj.rrbx.buyNum = parseInt(v);
			getPrem();
		};
	});

	// 隐藏 显示
	$('#container').on('click', '.imgShow > .title', function(event) {
		event.preventDefault();
		var $this = $(this),
			$next = $this.next();
		$next.slideToggle();
		$this.parent().toggleClass('open');
	});
	// 逻辑: 根据算参数获取保费,并存储公共数据对象
	// 条件: 试算参数对象:ntriObj;公共数据对象:rrbxSetObj
	function getPrem() {
		var ntriObj = parsObj.rrbx;
		ntriObj["extraParams"] = parsObj.extraParams;
		premAjax(ntriObj, function(value) {
			$("#prem").text(value + "元");
			parsObj.extraParams.prem = value;
			rrbxSetObj.insuredPars.pars = parsObj;
			localStorage.setItem(rrbxSetObj.insuredPars.parsInit.rrbx.rrbxProductId, JSON.stringify(rrbxSetObj));
		});
	}
	// =============================
	// 业务逻辑
	// =============================
};
export default serviceLogic;