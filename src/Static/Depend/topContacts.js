// 常用联系人
// 参数:bindDom:Dom对象;title:标题;data:选择选项;func:回调函数
// 例子:
// 作者: ydlx
// 日期: 2018-4-26

import env from '../../../Config/env.js';
import {
	commonJs,
	alertError
} from '../depend/common.js';

class topContacts {

	constructor(data) {
		this.data = data || {};
		this.getData();
	}

	show() {
		console.log(this);
	}

	getData() {
		console.log(this);
		var curDataHandl = this.dataHandl;
		const promise = new Promise(function(resolve, reject) {
			$.ajax({
				type: "GET",
				url: `${env}/user/find/contacts?1=1&access_token=${GV.nbuy_accessToken}`,
				beforeSend: function() {
					commonJs.loadAnimation();
				},
				success: function(data) {
					if (data.code == 10000) {
						resolve(data.response);
					};
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
					} else {
						commonJs.loadClose();
					}
				}
			});
		});
		promise.then(function(value) {
			// curDataHandl(value).call(getData());
		}, function(error) {
			alertError(error);
		});
	}

	dataHandl(value) {
		console.log(this);
		// console.log(this);
		// console.log(value);
		// this.data = value.map(function(x,y,z) {
		// 	return x.value = `${x.realname}(${x.phone})`;
		// })
	}
}

export default topContacts;