import env from '../../../../Config/env.js';
import {
	commonJs,
	alertError
} from '../common.js';
// 
const buyAjax = function(ajaxData,rrbxSetObj) {
	var url = env + '/mobile/norder/create?access_token=' + GV.nbuy_accessToken + '&productId=' + GV.nbuy_rrbxProductId + '';
	$.ajax({
		type: "POST",
		url: url,
		data: "data=" + ajaxData,
		timeout: 60000,
		dataType: "JSON",
		beforeSend: function() {
			commonJs.loadAnimation();
		},
		success: function(data) {
			if (data.code == 10000) {
				window.location.href = data.response.payUrl;
			} else {
				commonJs.loadClose();
				alertError(data.info);
			}
		},
		error: function(xhr, type) {
			commonJs.loadClose();
			alertError("请求超时，请稍后再试！");
		},
		complete: function(xhr, status) {
			if (status == 'timeout') {
				xhr.abort();
				$.alert("网络超时，请刷新", function() {
					location.reload();
				})
			}
		}
	})
};


export default buyAjax;