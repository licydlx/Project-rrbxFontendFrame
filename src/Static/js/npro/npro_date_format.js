const e_npro_date_format = function() {
	$(".comment-list").find(".cli-date").each(function(index, value) {
		let that = $(value),
			date = formatDate(that.text());
		that.text(date.day);
	});
	// 格式化时间
	const formatDate = (par) => {
		let intPar = parseInt(par),
		now = new Date(intPar * 1000);

		let [year, month, date, hour, minute, second] =
		[now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()];
		
		if (hour < 10) {
			hour = "0" + hour;
		};
		if (minute < 10) {
			minute = "0" + minute;
		};
		if (second < 10) {
			second = "0" + second;
		};
		return {
			"day": year + "-" + month + "-" + date,
			"hour": hour + ":" + minute + ":" + second
		}
	};
};
export default e_npro_date_format;