import {
	getProductId
} from '../depend/common.js';
const e_nbuy_footer = (par) => {
	let productId = getProductId(),
	DataSet = JSON.parse(localStorage.getItem(productId)),
	prem = DataSet.trialResult.prem;
	$("footer > div").text(prem + "元");
	// 暂时
	// ydlx
	// 2018-2-27
	var clause = '';
	DataSet.insurePolicy.forEach(function(value,index){
		clause += `<a href=${value.link}>《${value.title}》</a>`;
	});
	$('#clause').append(clause);
}
export default e_nbuy_footer;