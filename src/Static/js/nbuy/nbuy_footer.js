const productConfig = require('../../../Config/config.json');
const e_nbuy_footer = () => {
	var DataSet = JSON.parse(localStorage.getItem(productConfig.productId));
	if (DataSet) $("#price").text(DataSet.trialResult.prem + "元");
}
export default e_nbuy_footer;