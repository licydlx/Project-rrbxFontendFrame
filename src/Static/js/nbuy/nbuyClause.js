const nbuyClause = function(insurePolicyArray) {
	var clause = insurePolicyArray.map(function(value, index) {
		return `<a href=${value.link}>《${value.title}》</a>`;
	}).join('');
	$('#clause').append(clause);
}

export default nbuyClause;