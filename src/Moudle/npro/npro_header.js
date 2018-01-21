require("../../Static/scss/component/npro/npro_banner.scss");
import ejs from '../../Static/ejs/npro/npro_banner.ejs';
import e_npro_header from '../../Static/js/npro/npro_header.js';

const npro_header = (par) => ejs(par);
export default npro_header;