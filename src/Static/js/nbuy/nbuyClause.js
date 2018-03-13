const nbuyClause = function(rrbxSet) {
	var clause = '';
	if (rrbxSet.renderDate.insurePolicy) {
		rrbxSet.renderDate.insurePolicy.forEach(function(value, index) {
			clause += `<a href=${value.link}>《${value.title}》</a>`;
		});
		$('#clause').append(clause);
	};
}
export default nbuyClause;