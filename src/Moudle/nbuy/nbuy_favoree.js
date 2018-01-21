import ejs from '../../Static/ejs/nbuy/nbuy_favoree.ejs';
require("../../Static/scss/component/nbuy/nbuy_favoree.scss");
var nbuy_favoree = function(par) {
	return ejs(par);
};

export default nbuy_favoree;