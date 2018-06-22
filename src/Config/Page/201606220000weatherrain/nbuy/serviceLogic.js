import dateUnit from '../../../../Static/js/depend/tools/dateUnit.js';
import premAjax from '../../../../Static/js/depend/datas/premAjax.js';
import selectThree from '../../../../Static/js/depend/tools/selectThree.js';
import selectOne from '../../../../Static/js/depend/tools/selectOne.js';
import selectArea from '../../../../Static/js/depend/tools/selectArea.js';
import selectDate from '../../../../Static/js/depend/tools/selectDate.js';

import selectTwo from '../../../../Static/js/depend/tools/selectTwo.js';

import nbuyClause from '../../../../Static/js/nbuy/nbuyClause.js';
import {
  alertError
} from '../../../../Static/js/depend/common.js';
import {
  dateModal
} from '../../../../Static/js/common/modal.js';
import buyAjax from '../../../../Static/js/depend/datas/buyAjax.js';
import getInsuredPars from '../../../../Static/js/nbuy/getInsuredPars.js';

import areaData from './areaData.js';
import occupationData from './occupationData.js';

const serviceLogic = function(a) {
  console.log(a);
  var renderData = a[0],
      rrbxSetObj = a[1];
  // 试算对象
  var trialObj = rrbxSetObj.insuredPars.pars.rrbx;
  // 已阅读文案
  if (rrbxSetObj.renderDate.insurePolicy) nbuyClause(rrbxSetObj.renderDate.insurePolicy);
  // 显示保费
  $("#prem").text(rrbxSetObj.insuredPars.pars.extraParams.prem + "元");
  // 平台识别
  if (rrbxSetObj.GV && Object.is(rrbxSetObj.GV.sceneType, '3')) $(".mg-b-footer").css("margin-bottom", "1rem");

  // =============================
  // 业务逻辑
  // =============================
  // 本人:defaultRela
  // 实际关系:relaTag
  var defaultRela = rrbxSetObj.defaultPars.rela,
      relaTag = $("#relaId").attr("data-id");

  // 逻辑:获取投保人的关系
  // 条件:点击下拉选择,即可
  var relaObj = $("#relaId").closest(".item"),
      relaNextCloneObj = relaObj.nextAll().clone();
  relaObj.nextAll().remove();

  // 逻辑:根据被保人身份证重新计算保费
  // 条件:在被保人选项输入正确身份证,并移走光标,即可
  $("#container").on("blur", "input[data-type='certiNo']", function(event) {
    var $that = $(this),
        cardObj = dateUnit.parseIdCard($that.val()),
        certiNoId = $that.attr("id"),
        relaTag = $("#relaId").attr("data-id"),
        relaState = Object.is(relaTag, defaultRela);
    if (relaState && Object.is("holder_certiNo", certiNoId)) {
      var curAge = dateUnit.getAgeFromBirthday(cardObj.birthday).age;
      if (curAge < 18) {
        new dateModal(null, "stateIndform", "投保人年龄最小20周岁,最大60周岁").init().show();
        return;
      };

      var flag = dateUnit.getAgeRangeState(cardObj.birthday, {
        "age": 20
      }, {
        "age": 60
      });

      if (!flag) {
        new dateModal(null, "stateIndform", "被保人年龄最小20周岁,最大60周岁").init().show();
        $("#holder_certiNo").val('').closest('.item').attr('data-state', '');
      }
    } else if (Object.is("insured_certiNo", certiNoId)) {
      var flag = dateUnit.getAgeRangeState(cardObj.birthday, {
        "age": 20
      }, {
        "age": 60
      });

      if (!flag) {
        new dateModal(null, "stateIndform", "被保人年龄最小20周岁,最大60周岁").init().show();
        $("#insured_certiNo").val('').closest('.item').attr('data-state', '');
      }
    } else {
      var holderObj = $("#holder_certiNo").val();
      if (holderObj && holderObj != "") {
        var holderAgeFlag = dateUnit.getAgeRangeState(dateUnit.parseIdCard(holderObj).birthday, {
          "age": 20
        }, {
          "age": 60
        });
        if (!holderAgeFlag) {
          new dateModal(null, "stateIndform", "投保人年龄最小18周岁").init().show();
          $("#holder_certiNo").val('').closest('.item').attr('data-state', '');
          return;
        }
      };
    };
  })

  // 逻辑: 根据算参数获取保费,并存储公共数据对象
  // 条件: 试算参数对象:ntriObj;公共数据对象:rrbxSetObj
  function getPrem() {
    premAjax(trialObj, function(value) {
      $("#prem").text(value + "元");

      trialObj.extraParams.prem = value;
      rrbxSetObj.insuredPars.pars.rrbx = trialObj;
      localStorage.setItem(rrbxSetObj.insuredPars.parsInit.rrbx.rrbxProductId, JSON.stringify(rrbxSetObj));
    });
  }
  // =============================
  // 业务逻辑
  // =============================

  // 购买
  //
  $("#container").on("click", "#buyNow", function(event) {
    event.preventDefault();

    var doneState = true,
        errName;
    if (!$(".agreed input").is(":checked")) {
      alertError("请先同意以下条款！");
      return;
    };
    $(".itemBox").find(".item").each(function(index, val) {
      if ($(val).hasClass('input') && $(val).attr("data-state") !== "right") {
        doneState = false;
        if (!doneState && !errName) {
          errName = $(this).find('.title')[0].innerText.replace(/\s+/g,"");
        };
      }
      if ($(val).hasClass('choose')) {
        if (!$(val).find("input").attr("data-id")) {
          doneState = false;
          if (!doneState && !errName) {
            errName = $(this).find('.title')[0].innerText.replace(/\s+/g,"");
          };
        };
      };
    });

    if (doneState) {
      buyAjax(getInsuredPars(rrbxSetObj), rrbxSetObj);
    } else {
      alertError("请输入" + errName + "！");
      return;
    };
  });
}
export default serviceLogic;