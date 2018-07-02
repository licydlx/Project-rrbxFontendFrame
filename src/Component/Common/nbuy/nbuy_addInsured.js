import ejs from '../../Static/ejs/nbuy/nbuy_addInsured.ejs';
require("../../Static/scss/component/nbuy/nbuy_addInsured.scss");
var nbuy_addInsured = function(par) {
	return ejs(par);
};

export default nbuy_addInsured;