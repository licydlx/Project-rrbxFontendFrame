import dateUnit from '../../../../Static/js/depend/tools/dateUnit.js';
import premAjax from '../../../../Static/js/depend/datas/premAjax.js';
import {
	consultServie
} from '../../../../Static/js/common/modal.js';
import selectTwo from "../../../../Static/js/depend/tools/selectTwo";
import selectOne from "../../../../Static/js/depend/tools/selectOne";

import areaData from './areaData.js';

const serviceLogic = function(a) {
  console.log(a);
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
  //今天天数
  var nowDate=new Date();
  var nowYear=nowDate.getFullYear();
  var nowMonth=nowDate.getMonth()+1;
  var nowDay=nowDate.getDate();
  parsObj.extraParams.month =nowYear+""+ (nowMonth < 10 ? "0"+nowMonth : nowMonth );

	//动态刷新购买时间数据
  //每月天数
  function mouthDate(year,month){
    switch(parseInt(month)+""){
      case "1":
      case "3":
      case "5":
      case "7":
      case "8":
      case "10":
      case "12":
        return 31;
        break;
      case "4":
      case "6":
      case "9":
      case "11":
        return 30;
        break;
      case "2":
        if( year % 4 == 0 && year % 100 != 0  || year % 400 == 0 ) return 29;
        else return 28;
        break;
    }
  }

  function returnData(year,month,day,period){
    var startMonth=month+1;
    if( mouthDate(year,month) - day <= 10 ) startMonth=month+2;
    var dataArr=[],crId=1;
    //输出所限制的月份
    function exportFunc(year,startMonth,period){
      var mothDvalue=period+startMonth;//月份的和
      if( mothDvalue <= 12 ){
        for( var i=startMonth ; i<=mothDvalue-1; i++ ){
          var obj={};
          obj.id=year+""+(i<10 ? ("0"+i) : i);
          obj.value=year+"年"+i+"月";
          dataArr.push(obj);
        }
      }else{
        for( var j=startMonth; j<=12; j++ ){
          var obj={};
          obj.id=year+""+(j<10 ? ("0"+j) : j);
          obj.value=year+"年"+j+"月";
          dataArr.push(obj);
        }
        exportFunc(year+1,1,12-(12-startMonth)-1);
      }
    }
    exportFunc(year,startMonth,period);
    return dataArr;
  }
  var myDateData=returnData(nowYear,nowMonth,nowDay,12);
  renderData.data.myTime=myDateData;

  //格式化显示日期
  function formatDate(date){
    var currentdate=date.getFullYear()+"-"+(date.getMonth()+2)+"-"+date.getDate();
    var allDateData=currentdate.split("-");
    //将个位数补充为两位数
    function replenishNumber(num){
      if( num < 10 ) return "0"+num;
      else return num;
    }
    return allDateData[0]+"-"+replenishNumber(allDateData[1])+"-"+replenishNumber(allDateData[2]);
  }
  var currentDay=formatDate(new Date());
	var excumArr=currentDay.split("-");
  parsObj.extraParams.month=excumArr[0]+""+excumArr[1];
  parsObj.rrbx.policyBeginDate=excumArr[0]+"-"+excumArr[1]+"-01";
  console.log(parsObj);
  console.log(currentDay);
  // 逻辑:
  // 条件:点击下拉选择,即可
  new selectTwo($("#holderArea"), "省市选择", areaData, holderArea).init();

  function holderArea(value) {
    console.log(value);
    parsObj.extraParams.city=value.selectTwoObj.id;
    console.log(parsObj);
    getPrem();
    return true;
  };

  // 逻辑:动态设置时间默认值
  // 条件:...

  $("#myTime").attr("value",myDateData[0].value);


  //购买时间
  new selectOne($("#myTime"), "购买时间", renderData.data.myTime, myTime).init();

  function myTime(content, value) {
    console.log(value);

    parsObj.extraParams.month = value;

    parsObj.rrbx.policyBeginDate=value.substr(0,4)+"-"+value.substr(-2,2)+"-01" ;
    getPrem();
    return true;
  }
	//购买的份数
  new selectOne($("#amnt"), "购买份数", renderData.data.amnt, amnt).init();

  function amnt(content, value) {
  	console.log(value);
    parsObj.rrbx.buyNum = value;
    parsObj.rrbx.periodPremium=value*20;
    getPrem();
    return true;
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