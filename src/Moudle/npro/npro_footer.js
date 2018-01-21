require("../../Static/scss/component/npro/npro_footer.scss");
require("../../Static/scss/component/npro/npro_consult.scss");
import ejs from '../../Static/ejs/npro/npro_footer.ejs';
import e_npro_footer from '../../Static/js/npro/npro_footer.js';
import e_npro_consult from '../../Static/js/npro/npro_consult.js';

const npro_footer = (par) => ejs(par);
export default npro_footer;