// 描述: 事件绑定(投保页 条款)
const nbuyClause = function(config) {
	if (config.renderData.insurePolicy) {
		var clause = config.renderData.insurePolicy.map(function(value, index) {
			return `<a href=${value.link}>《${value.title}》</a>`;
		}).join('');
		$('#clause').append(clause);
	} else {
		console.log("insurePolicy 为 null");
	};
}

export default nbuyClause;