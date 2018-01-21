var e_npro_date_format = function() {
	var obj = $(".comment-list").find(".cli-date");
	obj.each(function(index,value){
		var that = $(value),
		date = formatDate(that.text());
		that.text(date.day);
	});
	// 格式化时间
	function formatDate(par) {
		var par = parseInt(par);
		var now = new Date(par * 1000),
			year = now.getFullYear(),
			　　month = now.getMonth() + 1,
			　　date = now.getDate(),
			　　hour = now.getHours(),
			　　minute = now.getMinutes(),
			　　second = now.getSeconds();
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