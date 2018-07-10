import Modal from '../../Depend/Modal/Modal.js';

if (!Modal) {
	alert("获取手机短信模块引入Modal模块失败");
};
// 描述: 获取手机短信 (投保页)
var getCode = function() {
	$("#getCode").on("click", function() {
		var _this = $(this),
			phoneNo = $("#supple-info-tel").val(),
			timer = null;
		if (phoneNo) {
			$.ajax({
				type: "post",
				url: "/sms/get/captcha",
				dataType: "json",
				beforeSend: function(request) {
					request.setRequestHeader("rrbx-app", "RRBXW");
					request.setRequestHeader("rrbx-app-v", "2.1.0");
					request.setRequestHeader("rrbx-app-m", "Prod");
				},
				complete: function() {},
				data: {
					"phone": phoneNo,
					"signature": "rrbx2222appkey"
				},
				success: function(data) {
					if (data.code == 10000) {
						$('#getCode').addClass("disabled").html('<i style="font-style:normal; color:#fff" id="timeb2">60</i>秒后重发');
						//倒计时
						timer = self.setInterval(function() {
							var t = $("#timeb2").html();
							if (t > 0) {
								$('#timeb2').html(t - 1);
							} else {
								window.clearInterval(timer);
								$('#getCode').removeClass("disabled").html('<span id="timeb2"></span>重新获取');
							}
						}, 1000);
					} else {
						new Modal('defaultConfig', {
							text: data.info
						}).init();
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					new Modal('defaultConfig', {
						text: errorThrown
					}).init();
				}
			});
		} else {
			new Modal('defaultConfig', {
				text: '手机号码有误！'
			}).init();
		}
	});

};

export default getCode;