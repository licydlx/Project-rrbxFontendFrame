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
						alertError(data.info);
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alertError(errorThrown);
				}
			});
		} else {
			alertError("手机号码有误！");
		}
	});

	function alertError(data) {
		var html = `<div class="alert-bg"><div class="alert"><p class="alert-content">
		${data}</p><div class="alert-btns"><a class="alert1-btn">确定</a></div></div></div>`;
		$("body").append(html);
	}

	$(document).on("click", ".alert1-btn", function() {
		$('.alert-bg').css("display", "none");
	});
};

export default getCode;