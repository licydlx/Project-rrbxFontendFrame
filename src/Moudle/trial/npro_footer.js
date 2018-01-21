require("../../Static/scss/component/trial/npro_footer.scss");
require("../../Static/scss/component/trial/npro_consult.scss");
import ejs from '../../Static/ejs/trial/npro_footer.ejs';
import e_npro_footer from '../../Static/js/trial/npro_footer.js';
import e_npro_consult from '../../Static/js/trial/npro_consult.js';

const npro_footer = (par) => ejs(par);
export default npro_footer;