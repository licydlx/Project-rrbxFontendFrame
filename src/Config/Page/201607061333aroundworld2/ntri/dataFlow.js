const dataFlow = function(data) {
	console.log("dataFlow");
	localStorage.setItem('channel', 'RRBXW');
	localStorage.setItem('series_id', data.insurancePlan[0].id);
}
export default dataFlow;