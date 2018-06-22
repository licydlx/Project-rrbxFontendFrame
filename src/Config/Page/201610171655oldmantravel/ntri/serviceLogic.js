import premAjax from '../../../../Static/js/depend/datas/premAjax.js';
import {
	consultServie
} from '../../../../Static/js/common/modal.js';
import npro_support_plan_tab from '../../../../Moudle/npro/npro_support_plan_tab.js';
import selectOne from "../../../../Static/js/depend/tools/selectOne";
import dataValData from "../ntri/dataValData";
import dateUnit from "../../../../Static/js/depend/tools/dateUnit";
import selectDate from "../../../../Static/js/depend/tools/selectDate";
import {dateModal} from "../../../../Static/js/common/modal";

const serviceLogic = function(a) {
  console.log(a);
	var renderData = a[0],
		rrbxSetObj = a[1];
	// 初始化 保費參數值(由投保页回退回来) (多层级 对象 深拷贝)
	var parsObj = JSON.parse(JSON.stringify(rrbxSetObj.insuredPars.parsInit));



  // 逻辑: 切换方案
  // 条件:
  $("#pt-sp-nav").on('click', 'a', function(event) {
    event.preventDefault();

    let that = $(this),
        [productSeriesId, insureId, tag, periodPremium] =
            ['data-id', 'data-insureid', 'data-tag', 'data-price'].map(function(value, index) {
              return that.attr(value);
            });
    if (!that.hasClass("active")) {
      that.closest('ul').find('a').removeClass('active');
      that.addClass("active");

      parsObj.rrbx.periodPremium = periodPremium;
      parsObj.rrbx.productSeriesId = productSeriesId;
      parsObj.extraParams.insureId = insureId;

      tabLogic(tag);
      getPrem();
    }
  });
	// 客服咨询
	new consultServie("consultService", "#service", "#service-pop").init();
	// =============================
	// 业务逻辑
	// =============================
  //格式化显示日期
  function formatDate(date){
    var allDateData=date.split("-");
    //将个位数补充为两位数
    function replenishNumber(num){
      if( num < 10 ) return "0"+num;
      else return num;
    }
    return allDateData[0]+"-"+replenishNumber(allDateData[1])+"-"+replenishNumber(allDateData[2]);
  }
  parsObj.extraParams.birthday=formatDate(dateUnit.getBirthdayFromAge(60));
	getPrem();




  // 逻辑:根据出生日期变化重新计算保费
  // 条件:被保人年龄区间 --大于50周岁,小于90周岁
  new selectDate($("#birthday"), "birthday", formatDate(dateUnit.getBirthdayFromAge(60)), 71, -51, birthday).init();

  function birthday(value) {
    var flag = dateUnit.getAgeRangeState(value, {
      "age": 51
    }, {
      "age": 70
    });

    if (!flag) {
      new dateModal(null, "stateIndform", "被保人年龄最小51周岁，最大70周岁").init().show();
      return false;
    } else {
      parsObj.extraParams.birthday = value;
      getPrem();
      return true;
    };
  }

  // 逻辑:选择保障期限
  // 条件:...
  new selectOne($("#dataVal"), "保障期限", dataValData, dataVal).init();

  function dataVal(content, value){
  	console.log(content, value);
    parsObj.extraParams.dataVal = value;
    getPrem();
    return true;
  }

	const tabLogic = (tag) => {
		$("#pt-sp-content").empty().append(npro_support_plan_tab(renderData.insurancePlan[tag]));
	}

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