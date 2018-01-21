const e_nbuy_footer = (par) => {
	var rrbxProductId = par.insureParams[0].value,
	buyPrice = JSON.parse(localStorage.getItem(rrbxProductId)).buyPrice;
	$("footer > div").text(buyPrice + "元");
}
export default e_nbuy_footer;