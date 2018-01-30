const e_nbuy_footer = (par) => {
	let rrbxProductId = par.insureParams[0].value,
	prem = JSON.parse(localStorage.getItem(rrbxProductId)).prem;
	$("footer > div").text(prem + "元");
}
export default e_nbuy_footer;