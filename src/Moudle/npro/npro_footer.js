require("../../Static/scss/component/npro/npro_footer.scss");
require("../../Static/scss/component/npro/npro_consult.scss");
import ejs from '../../Static/ejs/npro/npro_footer.ejs';

const npro_footer = (par) => ejs(par);
export default npro_footer;