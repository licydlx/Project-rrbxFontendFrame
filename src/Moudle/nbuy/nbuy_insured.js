import ejs from '../../Static/ejs/nbuy/nbuy_insured.ejs';
require("../../Static/scss/component/nbuy/nbuy_insured.scss");
var nbuy_insured = function(par) {
	return ejs(par);
};

export default nbuy_insured;