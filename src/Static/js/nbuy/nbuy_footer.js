const productConfig = require('../../../Config/config.json');
const e_nbuy_footer = () => {
	var DataSet = JSON.parse(localStorage.getItem(productConfig.productId));
	console.log(DataSet);
	if (DataSet) $("#price").text(DataSet.trialSet.result.prem + "元");
}
export default e_nbuy_footer;