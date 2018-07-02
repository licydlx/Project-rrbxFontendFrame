const insuredTemplate = {
	ebaojia: function() {
		return  `<section class="box">
			<a class="header">
				<i class="tag"></i>
				<i class="arrows"></i>
				被保人
			</a>

			<div class="itemBox">
				<section class="item choose">
					<label class="title">为谁投保</label>
					<input class="content" id="relaId" value="本人" data-id="00" unselectable="no" onfocus="this.blur()" readonly="readonly">
					<i class="icon">
						<img class="iconImg" src="https://m1.renrenbx.com/rrbxcdn/rrbx/arrows.png">
					</i>
				</section>

				<section class="item input">
					<label class="title">姓名</label>
					<input class="content" id="insured_userName" minlength="2" maxlength="32" placeholder="请输入姓名" data-belong="insuredUser" data-type="userName" data-verify="userName">
				</section>
			
				<section class="item inputDefault">
					<label class="title">证件类型</label>
					<input class="content" id="insured_certiType" data-value="00" value="身份证" placeholder="身份证" unselectable="no" onfocus="this.blur()" readonly="readonly" data-belong="insuredUser" data-type="certiType">
				</section>
			
				<section class="item input">
					<label class="title">证件号码</label>
					<input class="content" id="insured_certiNo" placeholder="请输入证件号码" oninput="if(value.length>18)value=value.slice(0,18)" data-belong="insuredUser" data-type="certiNo" data-verify="certiNo">
				</section>
			</div>
		</section>`;
	}
}

export default insuredTemplate;