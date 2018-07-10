require("../Scss/Common/nbuy_main.scss");
import ejs from '../../Static/Common/ejs/nbuyMain.ejs';

const nbuy_main = function(par) {
	return ejs(par);
};

export default nbuy_main;