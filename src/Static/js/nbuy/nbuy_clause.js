const productConfig = require('../../../Config/config.json');
const e_nbuy_clause = function(pars) {
	var clause = '',
		DataSet = JSON.parse(localStorage.getItem(productConfig.productId));
	if (DataSet) {
		DataSet.insurePolicy.forEach(function(value, index) {
			clause += `<a href=${value.link}>《${value.title}》</a>`;
		});
		$('#clause').append(clause);
	};
}
export default e_nbuy_clause;