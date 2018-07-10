// 常见问题模块
require("../Scss/Common/npro_faq.scss");
import ejs from '../../Static/Common/ejs/faq.ejs';

const npro_faq = (par) => ejs(par);
export default npro_faq;