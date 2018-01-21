import ejs from '../../Static/ejs/nbuy/nbuy_holder_group.ejs';
require("../../Static/scss/component/nbuy/nbuy_holder.scss");

const nbuy_holder_group = function(par) {
	return ejs(par);
};

export default nbuy_holder_group;