import ejs from '../../Static/ejs/nbuy/nbuy_clause.ejs';
require("../../Static/scss/component/nbuy/nbuy_clause.scss");
var nbuy_clause = function(par) {
	return ejs(par);
};

export default nbuy_clause;