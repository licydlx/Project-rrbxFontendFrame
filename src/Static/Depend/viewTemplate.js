const tpl = {
	jobInform: function(par) {
		var partDom;
		if (par) {
			partDom = '<footer class="none">';
		} else {
			partDom = '<footer>';
		}
		return `<div id="modal" class="modal">
					<article class="modalArea">
						<header>职业告知</header>
						<section class="content">
							被保人是否从事5-6类职业或拒保职业？
							本保险仅承保1-4类职业，不在职业类别中不能购买本保险，否则不予理赔。
							<a href="https://m1.renrenbx.com/pdf/view/web/viewer.html?pdf=20180126yianaxywx&title=职业告知" target="_blank">查看职业详情</a>
						</section>
						${partDom}
							<a id="modalFalse">是</a>
							<a id="modalTrue">否</a>
						</footer>
					</article>
				</div>`;
	},
	stateIndform: function(par) {
		return `<div id="stateIndform" class="modal">
					<article class="modalArea">
						<section class="content">
							${par}
						</section>
						<footer>
							<a>确定</a>
						</footer>
					</article>
				</div>`;
	},
	consultService:function (par) {
		return `<section id="service-pop" class="app-fix">
					<div class="order">
						<ul>
							<li><a href="tel:400-772-2928">客服电话 400-772-2928</a></li>
						</ul>
						<aside cancel="">取消</aside>
					</div>
					<div class="shadow" cancel=""></div>
				</section>`;
	},
	previewImg:function(src){
		return `<div id="previewImg" class="modal">
					<article class="modalArea">
						<section class="content">
							<img src=${src} />
						</section>
						<footer>
							<a id="piSure">确定</a><a id="piDelete">删除</a>
						</footer>
					</article>
				</div>`;
	},
	stateIndforms: function(par) {
		return `<div id="stateIndforms" class="modal">
					<article class="modalArea">
						<header>${par.title}</header>
						<section class="content">
							${par.content}
						</section>
						<footer>
							<a>确定</a>
						</footer>
					</article>
				</div>`;
	},
	previewImgs:function(src){
		return `<div id="previewImgs" class="modal">
					<article class="modalArea">
						<section class="content">
							<img src=${src} />
						</section>
					</article>
				</div>`;
	},
}

export {
	tpl
};