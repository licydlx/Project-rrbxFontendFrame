require("../Scss/Common/nbuy_sub.scss");
import ejs from '../../Static/Common/ejs/nbuySub.ejs';
var nbuy_sub = function(par) {
	return ejs(par);
};

export default nbuy_sub;